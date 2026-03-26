import Code from '../models/Code.js';
import {
  generateUniqueCode,
  validateCodeFormat,
  generateBatchId
} from '../utils/codeGenerator.js';

/**
 * @desc    Verify code only (hybrid game step 1)
 * @route   POST /api/codes/verify
 * @access  Public (optionalAuth)
 */
export const verifyCode = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code || !validateCodeFormat(code)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid code format. Please enter a valid 12-digit code.',
        code: 'INVALID_FORMAT'
      });
    }

    const foundCode = await Code.findOne({ code: code.toUpperCase() });

    if (!foundCode) {
      return res.status(404).json({
        success: false,
        message: 'Invalid Code. This code does not exist.',
        code: 'CODE_NOT_FOUND'
      });
    }

    if (foundCode.expiresAt && foundCode.expiresAt < new Date()) {
      return res.status(410).json({
        success: false,
        message: 'This code has expired. Please check another one.',
        code: 'CODE_EXPIRED'
      });
    }

    if (foundCode.isUsed) {
      return res.status(400).json({
        success: false,
        message: 'This code has already been used. One game per code only!',
        code: 'CODE_ALREADY_USED'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Code verified! Now try your luck.',
      code: 'CODE_VERIFIED',
      data: {
        codeId: foundCode._id,
        message: 'Your code is valid. Select a lucky number between 1 and 100 to play.'
      }
    });
  } catch (error) {
    console.error('Error verifying code:', error);
    return res.status(500).json({
      success: false,
      message: 'Error processing your code. Please try again.',
      code: 'SERVER_ERROR'
    });
  }
};

/**
 * @desc    Get code statistics (Admin)
 * @route   GET /api/codes/stats
 * @access  Private/Admin
 */
export const getCodeStats = async (req, res) => {
  try {
    const totalCodes = await Code.countDocuments();
    const usedCodes = await Code.countDocuments({ isUsed: true });
    const gamesPlayed = await Code.countDocuments({ gameAttempted: true });
    const gamesWon = await Code.countDocuments({ gameResult: 'won' });
    const gamesLost = await Code.countDocuments({ gameResult: 'lost' });

    return res.status(200).json({
      success: true,
      data: {
        totalCodes,
        usedCodes,
        unusedCodes: totalCodes - usedCodes,
        gamesPlayed,
        gamesWon,
        gamesLost,
        winRate: gamesPlayed > 0 ? ((gamesWon / gamesPlayed) * 100).toFixed(2) + '%' : '0%'
      }
    });
  } catch (error) {
    console.error('Error getting code stats:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving statistics'
    });
  }
};

/**
 * @desc    Get all codes with filters (Admin)
 * @route   GET /api/codes?used=true&gameResult=won
 * @access  Private/Admin
 */
export const getAllCodes = async (req, res) => {
  try {
    const { used, gameResult, page = 1, limit = 20, batchId } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const query = {};
    if (used !== undefined) query.isUsed = used === 'true';
    if (gameResult) query.gameResult = gameResult;
    if (batchId) query.batchId = batchId;

    const codes = await Code.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .select('-__v');

    const total = await Code.countDocuments(query);

    return res.status(200).json({
      success: true,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit))
      },
      data: codes
    });
  } catch (error) {
    console.error('Error fetching codes:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving codes'
    });
  }
};

/**
 * @desc    Generate bulk codes (Admin)
 * @route   POST /api/codes/generate
 * @access  Private/Admin
 */
export const generateCodes = async (req, res) => {
  try {
    const { totalCount } = req.body;

    if (!totalCount || totalCount < 1 || totalCount > 100000) {
      return res.status(400).json({
        success: false,
        message: 'Total count must be between 1 and 100000'
      });
    }

    res.status(202).json({
      success: true,
      message: 'Code generation started. This may take a moment...',
      totalCount
    });

    generateCodesInBackground(Number(totalCount)).catch((error) => {
      console.error('Background code generation error:', error);
    });
  } catch (error) {
    console.error('Error initiating code generation:', error);
    return res.status(500).json({
      success: false,
      message: 'Error generating codes'
    });
  }
};

async function generateCodesInBackground(totalCount) {
  try {
    const batchId = generateBatchId();
    const buffer = [];
    const BATCH_SIZE = 1000;

    for (let i = 0; i < totalCount; i += 1) {
      buffer.push({
        code: generateUniqueCode().toUpperCase(),
        batchId,
        gameAttempted: false,
        gameResult: 'pending',
        isUsed: false,
        reward: 'No reward'
      });

      if (buffer.length >= BATCH_SIZE) {
        await Code.insertMany(buffer, { ordered: false });
        buffer.length = 0;
      }
    }

    if (buffer.length > 0) {
      await Code.insertMany(buffer, { ordered: false });
    }

    console.log(`Generated ${totalCount} codes in batch ${batchId}`);
  } catch (error) {
    console.error('Error in background generation:', error);
  }
}

/**
 * @desc    Get single code details (Admin)
 * @route   GET /api/codes/:id
 * @access  Private/Admin
 */
export const getCodeById = async (req, res) => {
  try {
    const code = await Code.findById(req.params.id).populate('usedBy', 'name email');

    if (!code) {
      return res.status(404).json({
        success: false,
        message: 'Code not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: code
    });
  } catch (error) {
    console.error('Error fetching code:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving code'
    });
  }
};

/**
 * @desc    Delete batch of codes (Admin)
 * @route   DELETE /api/codes/batch/:batchId
 * @access  Private/Admin
 */
export const deleteCodeBatch = async (req, res) => {
  try {
    const { batchId } = req.params;
    const result = await Code.deleteMany({ batchId });

    return res.status(200).json({
      success: true,
      message: `Deleted ${result.deletedCount} codes from batch ${batchId}`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error deleting batch:', error);
    return res.status(500).json({
      success: false,
      message: 'Error deleting codes'
    });
  }
};
