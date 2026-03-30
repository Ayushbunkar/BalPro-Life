import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const extractToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    return req.headers.authorization.split(' ')[1];
  }

  if (req.cookies && req.cookies.token) {
    return req.cookies.token;
  }

  return null;
};

// Protect routes - require authentication
export const protect = async (req, res, next) => {
  try {
    const token = extractToken(req);

    // Make sure token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id);

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'No user found with this token'
        });
      }

      next();
    } catch (err) {
      const isExpired = err?.name === 'TokenExpiredError';
      const isInvalid = err?.name === 'JsonWebTokenError';
      return res.status(401).json({
        success: false,
        message: isExpired
          ? 'Token has expired. Please log in again.'
          : (isInvalid ? 'Invalid token. Please log in again.' : 'Not authorized to access this route'),
        code: isExpired ? 'TOKEN_EXPIRED' : (isInvalid ? 'INVALID_TOKEN' : 'AUTH_ERROR')
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Optional auth - attach user if token is valid, otherwise continue anonymously
export const optionalAuth = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (user) {
        req.user = user;
      }
    } catch (err) {
      // Ignore invalid token for optional auth and continue as guest.
    }

    return next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    return next();
  }
};

// Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};
