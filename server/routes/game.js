import express from 'express';
import { protect, authorize, optionalAuth } from '../middleware/auth.js';
import { gamePlayLimiter } from '../middleware/rateLimiters.js';
import {
  playGame,
  getGameStats,
  getGameHistory
} from '../controllers/game.js';

const router = express.Router();

/**
 * Public Routes - Game Play
 */

// User plays the lucky number game
// POST /api/game/play
// Body: { code: "XXXX-XXXX-XXXX", userNumber: 45 }
router.post('/play', optionalAuth, gamePlayLimiter, playGame);

/**
 * Admin Routes
 */
router.use(protect);
router.use(authorize('admin'));

// Get game statistics
router.get('/stats', getGameStats);

// Get game history with pagination
router.get('/history', getGameHistory);

export default router;
