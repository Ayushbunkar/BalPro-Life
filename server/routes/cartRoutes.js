import express from 'express';
import {
  addToCart,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItemQuantity
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';
import { cartMutationLimiter } from '../middleware/rateLimiters.js';
import { validate, validators } from '../middleware/validate.js';

const router = express.Router();

router.use(protect);

router.post('/add', cartMutationLimiter, validate(validators.addToCart), addToCart);
router.get('/', getCart);
router.put('/update/:productId', cartMutationLimiter, validate(validators.paramsProductId, 'params'), validate(validators.updateCartQuantity), updateCartItemQuantity);
router.delete('/remove/:productId', cartMutationLimiter, validate(validators.paramsProductId, 'params'), removeCartItem);
router.delete('/clear', cartMutationLimiter, clearCart);

export default router;
