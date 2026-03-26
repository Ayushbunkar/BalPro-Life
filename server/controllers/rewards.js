import Reward from '../models/Reward.js';
import Code from '../models/Code.js';
import { calculateExpiryTime } from '../utils/codeGenerator.js';

/**
 * @desc    Get reward details
 * @route   GET /api/rewards/:rewardId
 * @access  Public
 */
export const getRewardDetails = async (req, res) => {
  try {
    const { rewardId } = req.params;

    const reward = await Reward.findOne({ rewardId })
      .populate('userId', 'name email')
      .populate('code', 'code');

    if (!reward) {
      return res.status(404).json({
        success: false,
        message: 'Reward not found',
        code: 'REWARD_NOT_FOUND'
      });
    }

    // Check expiry
    if (reward.expiresAt < new Date()) {
      reward.status = 'expired';
      await reward.save();
      return res.status(410).json({
        success: false,
        message: 'This reward has expired',
        code: 'REWARD_EXPIRED'
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        rewardId: reward.rewardId,
        reward: reward.reward,
        isRedeemed: reward.isRedeemed,
        expiresAt: reward.expiresAt,
        qrCode: reward.qrCode,
        status: reward.status
      }
    });
  } catch (error) {
    console.error('Error fetching reward:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving reward'
    });
  }
};

/**
 * @desc    Redeem/claim reward (Store side)
 * @route   POST /api/rewards/redeem
 * @access  Private (Store staff)
 */
export const redeemReward = async (req, res) => {
  try {
    const { rewardId, storeId, storeName, staffName } = req.body;

    // Validate input
    if (!rewardId) {
      return res.status(400).json({
        success: false,
        message: 'Reward ID is required',
        code: 'MISSING_REWARD_ID'
      });
    }

    // Find reward
    const reward = await Reward.findOne({ rewardId });

    if (!reward) {
      return res.status(404).json({
        success: false,
        message: 'Reward not found',
        code: 'REWARD_NOT_FOUND'
      });
    }

    // Check if already redeemed
    if (reward.isRedeemed) {
      return res.status(400).json({
        success: false,
        message: 'This reward has already been redeemed',
        code: 'ALREADY_REDEEMED'
      });
    }

    // Check if expired
    if (new Date() > reward.expiresAt) {
      reward.status = 'expired';
      await reward.save();
      return res.status(410).json({
        success: false,
        message: 'This reward has expired and cannot be redeemed',
        code: 'REWARD_EXPIRED'
      });
    }

    // Mark as redeemed (atomic operation to prevent duplicate redemption)
    const updatedReward = await Reward.findByIdAndUpdate(
      reward._id,
      {
        $set: {
          isRedeemed: true,
          redeemedAt: new Date(),
          status: 'redeemed',
          redeemedByStore: {
            storeId: storeId || 'unknown',
            storeName: storeName || 'unknown',
            staffName: staffName || 'unknown'
          }
        }
      },
      { new: true, runValidators: true }
    ).populate('userId', 'name email');

    return res.status(200).json({
      success: true,
      message: '✅ Reward Redeemed Successfully!',
      code: 'REWARD_REDEEMED',
      data: {
        rewardId: updatedReward.rewardId,
        reward: updatedReward.reward,
        userName: updatedReward.userId?.name || 'Guest',
        redeemedAt: updatedReward.redeemedAt,
        redeemedByStore: updatedReward.redeemedByStore
      }
    });
  } catch (error) {
    console.error('Error redeeming reward:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing reward redemption'
    });
  }
};

/**
 * @desc    Get user's rewards
 * @route   GET /api/rewards/user/my-rewards
 * @access  Private
 */
export const getUserRewards = async (req, res) => {
  try {
    const userId = req.user._id;
    const { filter = 'all' } = req.query;

    let query = { userId };

    if (filter === 'active') {
      query.isRedeemed = false;
      query.expiresAt = { $gt: new Date() };
    } else if (filter === 'redeemed') {
      query.isRedeemed = true;
    } else if (filter === 'expired') {
      query.expiresAt = { $lte: new Date() };
    }

    const rewards = await Reward.find(query)
      .sort({ createdAt: -1 })
      .select('rewardId reward isRedeemed expiresAt status qrCode');

    return res.status(200).json({
      success: true,
      data: rewards
    });
  } catch (error) {
    console.error('Error fetching user rewards:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving your rewards'
    });
  }
};

/**
 * @desc    Get all rewards (Admin)
 * @route   GET /api/rewards/admin/all
 * @access  Private/Admin
 */
export const getAllRewards = async (req, res) => {
  try {
    const { filter = 'all', page = 1, limit = 50 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};

    if (filter === 'active') {
      query.isRedeemed = false;
      query.expiresAt = { $gt: new Date() };
    } else if (filter === 'redeemed') {
      query.isRedeemed = true;
    } else if (filter === 'expired') {
      query.expiresAt = { $lte: new Date() };
    }

    const rewards = await Reward.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('userId', 'name email')
      .select('-qrCode');

    const total = await Reward.countDocuments(query);

    // Calculate statistics
    const stats = {
      totalActive: await Reward.countDocuments({
        isRedeemed: false,
        expiresAt: { $gt: new Date() }
      }),
      totalRedeemed: await Reward.countDocuments({ isRedeemed: true }),
      totalExpired: await Reward.countDocuments({ expiresAt: { $lte: new Date() } })
    };

    return res.status(200).json({
      success: true,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      },
      stats,
      data: rewards
    });
  } catch (error) {
    console.error('Error fetching rewards:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving rewards'
    });
  }
};

/**
 * @desc    Get reward statistics (Admin)
 * @route   GET /api/rewards/stats/dashboard
 * @access  Private/Admin
 */
export const getRewardStats = async (req, res) => {
  try {
    const now = new Date();

    const [total, redeemed, expired, active] = await Promise.all([
      Reward.countDocuments(),
      Reward.countDocuments({ isRedeemed: true }),
      Reward.countDocuments({ expiresAt: { $lte: now } }),
      Reward.countDocuments({
        isRedeemed: false,
        expiresAt: { $gt: now }
      })
    ]);

    // Get breakdown by reward type
    const rewardBreakdown = await Reward.aggregate([
      {
        $group: {
          _id: '$reward',
          count: { $sum: 1 },
          redeemed: {
            $sum: { $cond: ['$isRedeemed', 1, 0] }
          }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Get daily redemption trend (last 30 days)
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const dailyRedemptions = await Reward.aggregate([
      {
        $match: {
          redeemedAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$redeemedAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    return res.status(200).json({
      success: true,
      data: {
        summary: {
          total,
          active,
          redeemed,
          expired,
          redemptionRate: total > 0 ? ((redeemed / total) * 100).toFixed(2) : 0
        },
        rewardBreakdown,
        dailyRedemptions
      }
    });
  } catch (error) {
    console.error('Error getting reward stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving statistics'
    });
  }
};

/**
 * @desc    Verify reward QR code (Scanner)
 * @route   POST /api/rewards/verify-qr
 * @access  Public
 */
export const verifyRewardQR = async (req, res) => {
  try {
    const { rewardId } = req.body;

    const reward = await Reward.findOne({ rewardId })
      .select('rewardId reward isRedeemed expiresAt status');

    if (!reward) {
      return res.status(404).json({
        success: false,
        message: 'Invalid QR Code',
        code: 'INVALID_QR'
      });
    }

    // Check status
    if (reward.isRedeemed) {
      return res.status(400).json({
        success: false,
        message: 'Already Redeemed',
        code: 'ALREADY_REDEEMED'
      });
    }

    if (new Date() > reward.expiresAt) {
      return res.status(410).json({
        success: false,
        message: 'Reward Expired',
        code: 'REWARD_EXPIRED'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Valid Reward',
      data: {
        rewardId: reward.rewardId,
        reward: reward.reward,
        isRedeemed: reward.isRedeemed,
        expiresAt: reward.expiresAt
      }
    });
  } catch (error) {
    console.error('Error verifying reward QR:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying reward'
    });
  }
};

/**
 * @desc    Admin: Mark reward as redeemed
 * @route   PUT /api/rewards/:rewardId/admin-redeem
 * @access  Private/Admin
 */
export const adminRedeemReward = async (req, res) => {
  try {
    const { rewardId } = req.params;
    const { storeId, storeName, staffName } = req.body;

    const reward = await Reward.findOneAndUpdate(
      { rewardId },
      {
        $set: {
          isRedeemed: true,
          redeemedAt: new Date(),
          status: 'redeemed',
          redeemedByStore: {
            storeId,
            storeName,
            staffName
          }
        }
      },
      { new: true }
    );

    if (!reward) {
      return res.status(404).json({
        success: false,
        message: 'Reward not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Reward marked as redeemed',
      data: reward
    });
  } catch (error) {
    console.error('Error redeeming reward:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing redemption'
    });
  }
};
