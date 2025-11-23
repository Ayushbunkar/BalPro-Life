import express from 'express';
import { getMetrics } from '../controllers/admin.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Metrics route - admin only
router.get('/metrics', protect, authorize('admin'), getMetrics);

export default router;
