import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const parseAndValidatePrice = (value, fieldName) => {
  const parsed = Number(value ?? 0);
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(`${fieldName} must be a non-negative number`);
  }
  return Number(parsed.toFixed(2));
};

export const normalizeShippingAddress = (shippingAddress = {}, user = {}) => {
  const nestedAddress = shippingAddress?.address || {};

  const name = (shippingAddress?.name || user?.name || '').trim();
  const phone = (shippingAddress?.phone || user?.phone || '').trim();

  const street = (shippingAddress?.street || shippingAddress?.address || nestedAddress?.street || '').trim();
  const city = (shippingAddress?.city || nestedAddress?.city || '').trim();
  const state = (shippingAddress?.state || nestedAddress?.state || city || '').trim();
  const zipCode = (shippingAddress?.postalCode || shippingAddress?.zipCode || nestedAddress?.zipCode || '').trim();
  const country = (shippingAddress?.country || nestedAddress?.country || 'India').trim();

  if (!name) {
    throw new Error('Recipient name is required');
  }
  if (!phone) {
    throw new Error('Phone number is required');
  }
  if (!street || !city || !state || !zipCode || !country) {
    throw new Error('Complete shipping address is required');
  }

  return {
    name,
    phone,
    address: {
      street,
      city,
      state,
      zipCode,
      country,
    },
  };
};

export const createOrderFromCheckoutPayload = async ({
  userId,
  orderItems,
  shippingAddress,
  paymentMethod,
  taxPrice,
  shippingPrice,
  paymentResult,
  isPaid = false,
  paidAt,
  status,
}) => {
  if (!orderItems || orderItems.length === 0) {
    throw new Error('No order items');
  }

  for (const item of orderItems) {
    const product = await Product.findById(item.product);

    if (!product) {
      throw new Error(`Product not found: ${item.product}`);
    }

    if (!product.isActive) {
      throw new Error(`Product ${product.name} is not available`);
    }

    if (product.inventory.trackInventory && product.inventory.quantity < item.quantity) {
      throw new Error(`Insufficient inventory for ${product.name}`);
    }

    item.name = product.name;
    item.price = product.price;
    item.image = product.images[0]?.url || '';
  }

  const itemsPrice = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const computedTotalPrice = Number((itemsPrice + taxPrice + shippingPrice).toFixed(2));

  const order = await Order.create({
    user: userId,
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice: computedTotalPrice,
    paymentResult,
    isPaid,
    paidAt,
    ...(status ? { status } : {}),
  });

  for (const item of orderItems) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { 'inventory.quantity': -item.quantity },
    });
  }

  return order;
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const orders = await Order.find()
      .populate('user', 'name email')
      .sort('-createdAt')
      .limit(limit)
      .skip(startIndex);

    const total = await Order.countDocuments();

    res.status(200).json({
      success: true,
      count: orders.length,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      data: orders
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('orderItems.product', 'name images');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order or is admin
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user orders
// @route   GET /api/orders/my-orders
// @access  Private
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('orderItems.product', 'name images')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice
    } = req.body;

    const normalizedShippingAddress = normalizeShippingAddress(shippingAddress, req.user);
    const safeTaxPrice = parseAndValidatePrice(taxPrice, 'taxPrice');
    const safeShippingPrice = parseAndValidatePrice(shippingPrice, 'shippingPrice');

    const order = await createOrderFromCheckoutPayload({
      userId: req.user.id,
      orderItems,
      shippingAddress: normalizedShippingAddress,
      paymentMethod,
      taxPrice: safeTaxPrice,
      shippingPrice: safeShippingPrice,
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    console.error('Create order error:', error);
    if (error.message && (
      error.message.includes('required') ||
      error.message.includes('No order items') ||
      error.message.includes('Insufficient inventory') ||
      error.message.includes('not available') ||
      error.message.includes('not found')
    )) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, trackingNumber } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.status = status;
    if (trackingNumber) order.trackingNumber = trackingNumber;

    if (status === 'delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this order'
      });
    }

    // Only allow cancellation if order is pending or processing
    if (!['pending', 'processing'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled at this stage'
      });
    }

    order.status = 'cancelled';

    // Restore inventory
    for (const item of order.orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { 'inventory.quantity': item.quantity }
      });
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      data: order
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};