import express from 'express';
import { getMetrics, updateAdminPassword, updateAdminProfile } from '../controllers/admin.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate, validators } from '../middleware/validate.js';

const router = express.Router();

// Metrics route - admin only
router.get('/metrics', protect, authorize('admin'), getMetrics);
router.put('/profile', protect, authorize('admin'), validate(validators.adminProfile), updateAdminProfile);

router.put('/password', protect, authorize('admin'), validate(validators.adminPassword), updateAdminPassword);

export default router;
