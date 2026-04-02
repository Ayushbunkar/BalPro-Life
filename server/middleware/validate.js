import Joi from 'joi';
import ApiError from '../utils/ApiError.js';

const objectIdPattern = /^[a-fA-F0-9]{24}$/;

export const validators = {
  objectId: Joi.string().trim().pattern(objectIdPattern).required(),
  quantity: Joi.number().integer().min(0).required(),
  positiveQuantity: Joi.number().integer().min(1).required(),
  adminProfile: Joi.object({
    name: Joi.string().trim().min(2).max(50).optional(),
    email: Joi.string().trim().email().optional(),
    phone: Joi.string().trim().max(20).allow('').optional(),
    profession: Joi.string().trim().max(80).allow('').optional(),
    isProfessional: Joi.boolean().optional()
  }),
  adminPassword: Joi.object({
    currentPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required()
  }),
  addToCart: Joi.object({
    productId: Joi.string().trim().pattern(objectIdPattern).required(),
    quantity: Joi.number().integer().min(1).required()
  }),
  updateCartQuantity: Joi.object({
    quantity: Joi.number().integer().min(0).required()
  }),
  paramsProductId: Joi.object({
    productId: Joi.string().trim().pattern(objectIdPattern).required()
  })
};

export const validate = (schema, source = 'body') => (req, res, next) => {
  const payload = req[source] || {};
  const { error, value } = schema.validate(payload, {
    abortEarly: false,
    stripUnknown: true,
    convert: true
  });

  if (error) {
    const details = error.details.map((item) => item.message);
    return next(new ApiError(400, 'Validation failed', details));
  }

  req[source] = value;
  return next();
};
