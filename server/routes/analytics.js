import express from 'express';
import {
  getConversionAnalytics,
  getRevenueAnalytics,
  getUsersAnalytics
} from '../controllers/analytics.js';
import { authorize, protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect, authorize('admin'));
router.get('/revenue', getRevenueAnalytics);
router.get('/users', getUsersAnalytics);
router.get('/conversion', getConversionAnalytics);

export default router;
