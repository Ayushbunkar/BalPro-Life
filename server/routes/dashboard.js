import express from 'express';
import { getDashboardAnalytics, getDashboardStats } from '../controllers/dashboard.js';
import { authorize, protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect, authorize('admin'));
router.get('/stats', getDashboardStats);
router.get('/analytics', getDashboardAnalytics);

export default router;
