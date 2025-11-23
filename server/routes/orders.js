import express from 'express';
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  cancelOrder,
  getUserOrders
} from '../controllers/orders.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All order routes require authentication
router.use(protect);

// User routes
router.get('/my-orders', getUserOrders);
router.post('/', createOrder);
router.get('/:id', getOrder);
router.put('/:id/cancel', cancelOrder);

// Admin only routes
router.use(authorize('admin'));
router.get('/', getOrders);
router.put('/:id/status', updateOrderStatus);

export default router;