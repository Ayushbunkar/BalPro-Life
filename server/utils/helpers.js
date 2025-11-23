// Custom Error class
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Success response utility
const successResponse = (res, message, data = null, statusCode = 200) => {
  const response = {
    success: true,
    message
  };

  if (data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

// Error response utility
const errorResponse = (res, message, statusCode = 500, errors = null) => {
  const response = {
    success: false,
    message
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

// Async handler wrapper to catch async errors
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Pagination utility
const paginate = (page, limit, total) => {
  const currentPage = parseInt(page, 10) || 1;
  const currentLimit = parseInt(limit, 10) || 10;
  const totalPages = Math.ceil(total / currentLimit);

  return {
    page: currentPage,
    limit: currentLimit,
    total,
    pages: totalPages,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1
  };
};

// Generate random string
const generateRandomString = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Calculate discount percentage
const calculateDiscount = (originalPrice, currentPrice) => {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

// Format price to 2 decimal places
const formatPrice = (price) => {
  return parseFloat(price).toFixed(2);
};

module.exports = {
  ErrorResponse,
  successResponse,
  errorResponse,
  asyncHandler,
  paginate,
  generateRandomString,
  isValidEmail,
  calculateDiscount,
  formatPrice
};