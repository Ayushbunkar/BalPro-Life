import Code from '../models/Code.js';
import Reward from '../models/Reward.js';
import { 
  generateRewardId, 
  calculateExpiryTime, 
  generateQRCode,
  selectReward
} from '../utils/codeGenerator.js';

/**
 * @desc    Play the lucky number game
 * @route   POST /api/game/play
 * @access  Public (optionalAuth)
 * 
 * Game Logic:
 * - User selects a number (1-100)
 * - Backend generates a random number (1-100)
 * - If match: User wins and reward is created
 * - If no match: User loses, no reward created
 * - Code is marked as used after attempt
 */
export const playGame = async (req, res) => {
  try {
    const { code, userNumber } = req.body;
    const userId = req.user?._id || null;

    // Validate input
    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Code is required',
        code: 'MISSING_CODE'
      });
    }

    if (userNumber === undefined || userNumber === null) {
      return res.status(400).json({
        success: false,
        message: 'User number is required',
        code: 'MISSING_NUMBER'
      });
    }

    // Validate number is between 1-100
    if (userNumber < 1 || userNumber > 100 || !Number.isInteger(userNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Please select a number between 1 and 100',
        code: 'INVALID_NUMBER'
      });
    }

    // Find the code
    const foundCode = await Code.findOne({ code: code.toUpperCase() });

    if (!foundCode) {
      return res.status(404).json({
        success: false,
        message: 'Invalid Code. This code does not exist.',
        code: 'CODE_NOT_FOUND'
      });
    }

    // Check if code is expired
    if (foundCode.expiresAt && foundCode.expiresAt < new Date()) {
      return res.status(410).json({
        success: false,
        message: 'This code has expired.',
        code: 'CODE_EXPIRED'
      });
    }

    // Check if code already used
    if (foundCode.isUsed) {
      return res.status(400).json({
        success: false,
        message: 'This code has already been used. One game per code only!',
        code: 'CODE_ALREADY_USED'
      });
    }

    // Check if game was already attempted with this code
    if (foundCode.gameAttempted) {
      return res.status(400).json({
        success: false,
        message: 'Game already played with this code. One attempt per code!',
        code: 'GAME_ALREADY_PLAYED'
      });
    }

    // ========================================
    // GENERATE WINNING NUMBER ON BACKEND ONLY
    // ========================================
    const winningNumber = Math.floor(Math.random() * 100) + 1; // 1-100

    // ========================================
    // DETERMINE IF USER WON
    // ========================================
    const userWasWon = userNumber === winningNumber;

    // Store game attempt in Code
    foundCode.userNumber = userNumber;
    foundCode.winningNumber = winningNumber;
    foundCode.gameAttempted = true;
    foundCode.gameResult = userWasWon ? 'won' : 'lost';
    foundCode.usedBy = userId;
    foundCode.usedAt = new Date();
    foundCode.isUsed = true; // Mark as used after game attempt

    await foundCode.save();

    // ========================================
    // IF WON: CREATE REWARD
    // ========================================
    if (userWasWon) {
      try {
        // Select reward type
        const selectedReward = selectReward();
        foundCode.reward = selectedReward;
        await foundCode.save();

        // Generate unique reward
        const rewardId = generateRewardId();
        const expiryTime = calculateExpiryTime(48); // 48 hours to redeem
        const qrCode = await generateQRCode(rewardId);

        // Create reward record
        const reward = await Reward.create({
          rewardId,
          code: foundCode._id,
          ...(userId ? { userId } : {}),
          userNumber,
          winningNumber,
          reward: selectedReward,
          expiresAt: expiryTime,
          qrCode,
          status: 'active'
        });

        return res.status(200).json({
          success: true,
          message: '🎉 Congratulations! You Won!',
          code: 'WIN',
          data: {
            gameResult: 'won',
            userNumber,
            winningNumber,
            rewardId: reward.rewardId,
            reward: reward.reward,
            message: `You won a ${reward.reward}!`,
            expiresAt: reward.expiresAt,
            qrCode: reward.qrCode,
            instructions: 'Visit any authorized store and show this reward or QR code to claim your prize.',
            claimUrl: `/result?rewardId=${reward.rewardId}`
          }
        });
      } catch (error) {
        console.error('Error creating reward:', error);
        return res.status(500).json({
          success: false,
          message: 'Error processing your reward',
          code: 'REWARD_ERROR'
        });
      }
    } else {
      // USER LOST
      return res.status(200).json({
        success: true,
        message: 'Better luck next time!',
        code: 'LOSE',
        data: {
          gameResult: 'lost',
          userNumber,
          winningNumber,
          message: 'Thank you for participating. Please try another code.',
          nextSteps: 'Check another bottle or visit our store for more chances to win!'
        }
      });
    }
  } catch (error) {
    console.error('Error playing game:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing your game. Please try again.',
      code: 'SERVER_ERROR'
    });
  }
};

/**
 * @desc    Get game stats (Admin)
 * @route   GET /api/game/stats
 * @access  Private/Admin
 */
export const getGameStats = async (req, res) => {
  try {
    const totalGames = await Code.countDocuments({ gameAttempted: true });
    const gamesWon = await Code.countDocuments({ gameResult: 'won' });
    const gamesLost = await Code.countDocuments({ gameResult: 'lost' });
    const winRate = totalGames > 0 ? ((gamesWon / totalGames) * 100).toFixed(2) : '0';

    const rewardStats = await Reward.aggregate([
      {
        $group: {
          _id: '$reward',
          count: { $sum: 1 }
        }
      }
    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalGames,
        gamesWon,
        gamesLost,
        winRate: winRate + '%',
        rewardDistribution: rewardStats
      }
    });
  } catch (error) {
    console.error('Error getting game stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving statistics'
    });
  }
};

/**
 * @desc    Get game history (Admin)
 * @route   GET /api/game/history
 * @access  Private/Admin
 */
export const getGameHistory = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const games = await Code.find({ gameAttempted: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('code userNumber winningNumber gameResult reward createdAt');

    const total = await Code.countDocuments({ gameAttempted: true });

    return res.status(200).json({
      success: true,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      },
      data: games
    });
  } catch (error) {
    console.error('Error fetching game history:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving game history'
    });
  }
};
