import rateLimit from 'express-rate-limit';

const rateLimitEnabledEnv = (process.env.RATE_LIMIT_ENABLED || '').toLowerCase();
const rateLimitEnabled = rateLimitEnabledEnv
  ? rateLimitEnabledEnv === 'true'
  : process.env.NODE_ENV === 'production';

const getRequestKey = (req) => {
  if (req.user?._id) {
    return req.user._id.toString();
  }
  return req.ip;
};

const passthroughLimiter = (req, res, next) => next();

const createLimiter = (config) => {
  if (!rateLimitEnabled) {
    return passthroughLimiter;
  }
  return rateLimit(config);
};

/**
 * Rate limiter for code verification endpoint
 * Prevents brute force attacks on code submission
 * Limit: 5 attempts per 15 minutes per user
 */
export const codeVerificationLimiter = createLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: {
    success: false,
    message: 'Too many code verification attempts. Please try again later.',
    code: 'RATE_LIMITED'
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Use user ID if authenticated, otherwise use IP
  keyGenerator: (req) => getRequestKey(req),
  skip: (req) => {
    // Skip rate limiting for admin users
    return req.user && req.user.role === 'admin';
  }
});

/**
 * Rate limiter for reward redemption endpoint
 * Prevents rapid redemption attempts
 * Limit: 10 attempts per 5 minutes per user
 */
export const rewardRedemptionLimiter = createLimiter({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // 10 attempts per window
  message: {
    success: false,
    message: 'Too many redemption attempts. Please try again later.',
    code: 'RATE_LIMITED'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => getRequestKey(req),
  skip: (req) => {
    return req.user && req.user.role === 'admin';
  }
});

/**
 * Rate limiter for code generation (admin only)
 * Prevents accidental bulk generation
 * Limit: 5 generations per hour
 */
export const codeGenerationLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 generations per hour
  message: {
    success: false,
    message: 'Code generation limit reached. Please try again later.',
    code: 'RATE_LIMITED'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => getRequestKey(req)
});

  /**
   * Rate limiter for lucky number game
   * Prevents rapid game attempts
   * Limit: 20 game plays per 10 minutes per user
   */
  export const gamePlayLimiter = createLimiter({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 20, // 20 games per window
    message: {
      success: false,
      message: 'Too many game attempts. Please try again later.',
      code: 'RATE_LIMITED'
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => getRequestKey(req),
    skip: (req) => {
      return req.user && req.user.role === 'admin';
    }
  });

/**
 * Rate limiter for cart mutation endpoints
 * Prevents abuse on add/update/remove/clear actions
 * Limit: 10 mutations per 1 minute per user/IP
 */
export const cartMutationLimiter = createLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: {
    success: false,
    message: 'Too many cart updates. Please try again in a minute.',
    code: 'RATE_LIMITED'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => getRequestKey(req),
  skip: (req) => {
    return req.user && req.user.role === 'admin';
  }
});

export default {
  codeVerificationLimiter,
  rewardRedemptionLimiter,
  codeGenerationLimiter,
  gamePlayLimiter,
  cartMutationLimiter
};
