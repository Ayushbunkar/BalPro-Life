import express from 'express';
import { protect, authorize, optionalAuth } from '../middleware/auth.js';
import { codeVerificationLimiter, codeGenerationLimiter } from '../middleware/rateLimiters.js';
import {
  verifyCode,
  getCodeStats,
  getAllCodes,
  generateCodes,
  getCodeById,
  deleteCodeBatch
} from '../controllers/codes.js';

const router = express.Router();

/**
 * Public Routes
 */

// Verify code (guest or logged-in user)
router.post('/verify', optionalAuth, codeVerificationLimiter, verifyCode);

/**
 * Private Routes (Users)
 */
router.use(protect);

/**
 * Admin Routes
 */
router.use(authorize('admin'));

// Get code statistics
router.get('/stats', getCodeStats);

// Get all codes with filters
router.get('/', getAllCodes);

// Get single code details
router.get('/:id', getCodeById);

// Generate bulk codes
router.post('/generate', codeGenerationLimiter, generateCodes);

// Delete batch of codes
router.delete('/batch/:batchId', deleteCodeBatch);

export default router;
