import crypto from 'crypto';
import Razorpay from 'razorpay';
import Payment from '../models/Payment.js';
import {
  createOrderFromCheckoutPayload,
  normalizeShippingAddress,
  parseAndValidatePrice,
} from './orders.js';
import Order from '../models/Order.js';
import { awardPointsForOrder } from '../services/pointsService.js';

const getRazorpayClient = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error('Razorpay keys are not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.');
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
};

const safeCompare = (first, second) => {
  const firstBuffer = Buffer.from(first);
  const secondBuffer = Buffer.from(second);

  if (firstBuffer.length !== secondBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(firstBuffer, secondBuffer);
};

const verifyRazorpaySignature = ({ orderId, paymentId, signature }) => {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    throw new Error('RAZORPAY_KEY_SECRET is not configured.');
  }

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return safeCompare(expectedSignature, signature);
};

const verifyWebhookSignature = (rawBody, signature) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error('RAZORPAY_WEBHOOK_SECRET is not configured.');
  }

  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(rawBody)
    .digest('hex');

  return safeCompare(expectedSignature, signature);
};

export const createOrder = async (req, res) => {
  try {
    const amount = Number(req.body?.amount);

    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a positive number',
      });
    }

    const razorpay = getRazorpayClient();
    const amountInPaise = Math.round(amount * 100);

    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `bp-${Date.now()}`,
      notes: {
        userId: String(req.user._id),
      },
    });

    await Payment.create({
      orderId: razorpayOrder.id,
      paymentId: `pending_${razorpayOrder.id}`,
      amount,
      status: 'created',
    });

    return res.status(201).json({
      success: true,
      data: {
        order_id: razorpayOrder.id,
        amount: amountInPaise,
        currency: razorpayOrder.currency,
        key_id: process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    console.error('Create Razorpay order error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to create payment order',
      details: error.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
    } = req.body || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing Razorpay verification fields',
      });
    }

    const isValid = verifyRazorpaySignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });

    if (!isValid) {
      await Payment.findOneAndUpdate(
        { orderId: razorpay_order_id },
        {
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          status: 'failed',
        },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );

      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature',
      });
    }

    const normalizedShippingAddress = normalizeShippingAddress(shippingAddress, req.user);
    const safeTaxPrice = parseAndValidatePrice(taxPrice, 'taxPrice');
    const safeShippingPrice = parseAndValidatePrice(shippingPrice, 'shippingPrice');

    const existingOrder = await Order.findOne({ 'paymentResult.id': razorpay_payment_id });
    if (existingOrder) {
      await awardPointsForOrder(existingOrder._id);

      return res.status(200).json({
        success: true,
        message: 'Payment already verified',
        data: {
          paymentId: razorpay_payment_id,
          razorpayOrderId: razorpay_order_id,
          orderId: existingOrder._id,
          status: 'success',
        },
      });
    }

    const order = await createOrderFromCheckoutPayload({
      userId: req.user.id,
      orderItems,
      shippingAddress: normalizedShippingAddress,
      paymentMethod: paymentMethod || 'razorpay',
      taxPrice: safeTaxPrice,
      shippingPrice: safeShippingPrice,
      isPaid: true,
      paidAt: new Date(),
      status: 'processing',
      paymentResult: {
        id: razorpay_payment_id,
        status: 'captured',
        update_time: new Date().toISOString(),
        email_address: req.user?.email || '',
        order_id: razorpay_order_id,
        signature: razorpay_signature,
      },
    });

    await awardPointsForOrder(order._id);

    await Payment.findOneAndUpdate(
      { orderId: razorpay_order_id },
      {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        amount: order.totalPrice,
        status: 'success',
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    return res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        paymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        orderId: order._id,
        status: 'success',
      },
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    return res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      details: error.message,
    });
  }
};

export const handleWebhook = async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];

    if (!signature || !req.rawBody) {
      return res.status(400).json({
        success: false,
        message: 'Missing webhook signature or raw body',
      });
    }

    const isValid = verifyWebhookSignature(req.rawBody, signature);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid webhook signature',
      });
    }

    const event = req.body?.event;
    const paymentEntity = req.body?.payload?.payment?.entity;

    if (!event || !paymentEntity) {
      return res.status(200).json({ success: true, message: 'Webhook ignored' });
    }

    const normalizedStatus =
      event === 'payment.captured'
        ? 'captured'
        : event === 'payment.failed'
          ? 'failed'
          : 'pending';

    const orderId = paymentEntity.order_id || 'unknown';
    const paymentId = paymentEntity.id || `unknown_${Date.now()}`;

    await Payment.findOneAndUpdate(
      { paymentId },
      {
        orderId,
        paymentId,
        amount: Number((paymentEntity.amount || 0) / 100),
        status: normalizedStatus,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    return res.status(200).json({
      success: true,
      message: 'Webhook processed',
    });
  } catch (error) {
    console.error('Razorpay webhook error:', error);
    return res.status(500).json({
      success: false,
      message: 'Webhook processing failed',
      details: error.message,
    });
  }
};
