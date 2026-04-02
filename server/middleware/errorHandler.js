import ApiError from '../utils/ApiError.js';

export const notFound = (req, res, next) => {
  next(new ApiError(404, 'Route not found'));
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isValidationError = err?.name === 'ValidationError';

  if (isValidationError) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: Object.values(err.errors || {}).map((e) => ({ message: e.message, field: e.path }))
    });
  }

  if (err?.code === 11000) {
    const duplicateField = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(409).json({
      success: false,
      message: `${duplicateField} already exists`
    });
  }

  const payload = {
    success: false,
    message: err.message || 'Internal server error'
  };

  if (err instanceof ApiError && err.details) {
    payload.details = err.details;
  }

  if (process.env.NODE_ENV === 'development') {
    payload.stack = err.stack;
  }

  return res.status(statusCode).json(payload);
};
