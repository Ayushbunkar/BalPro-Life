import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { rewardRedemptionLimiter } from '../middleware/rateLimiters.js';
import {
  getRewardDetails,
  redeemReward,
  getUserRewards,
  getAllRewards,
  getRewardStats,
  verifyRewardQR,
  adminRedeemReward
} from '../controllers/rewards.js';

const router = express.Router();

/**
 * Public Routes
 */

// Get reward details (public access)
router.get('/:rewardId', getRewardDetails);

// Verify reward QR code
router.post('/verify-qr', verifyRewardQR);

/**
 * Private Routes (Users & Store Staff)
 */
router.use(protect);

// Get user's rewards
router.get('/user/my-rewards', getUserRewards);

// Redeem/claim reward (Store redemption)
router.post('/redeem', rewardRedemptionLimiter, redeemReward);

/**
 * Admin Routes
 */
router.use(authorize('admin'));

// Get all rewards
router.get('/admin/all', getAllRewards);

// Get reward statistics
router.get('/stats/dashboard', getRewardStats);

// Admin manual redemption
router.put('/:rewardId/admin-redeem', adminRedeemReward);

export default router;
