import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  createOrder,
  verifyPayment,
  handleWebhook,
} from '../controllers/payments.js';

const router = express.Router();

router.post('/payments/webhook', handleWebhook);
router.post('/create-order', protect, createOrder);
router.post('/verify-payment', protect, verifyPayment);

export default router;
