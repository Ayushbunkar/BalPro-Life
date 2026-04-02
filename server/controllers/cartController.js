import asyncHandler from '../middleware/asyncHandler.js';
import {
  addToCartService,
  clearCartService,
  getCartService,
  removeCartItemService,
  updateCartItemQuantityService
} from '../services/cartService.js';

export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await addToCartService(req.user.id, productId, quantity);

  res.status(200).json({
    success: true,
    message: 'Item added to cart successfully',
    data: cart
  });
});

export const getCart = asyncHandler(async (req, res) => {
  const cart = await getCartService(req.user.id);

  res.status(200).json({
    success: true,
    data: cart
  });
});

export const updateCartItemQuantity = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const cart = await updateCartItemQuantityService(req.user.id, productId, quantity);

  res.status(200).json({
    success: true,
    message: quantity === 0 ? 'Item removed from cart' : 'Cart item updated successfully',
    data: cart
  });
});

export const removeCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const cart = await removeCartItemService(req.user.id, productId);

  res.status(200).json({
    success: true,
    message: 'Item removed from cart successfully',
    data: cart
  });
});

export const clearCart = asyncHandler(async (req, res) => {
  const cart = await clearCartService(req.user.id);

  res.status(200).json({
    success: true,
    message: 'Cart cleared successfully',
    data: cart
  });
});
