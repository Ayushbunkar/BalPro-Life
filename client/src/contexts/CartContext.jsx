import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { cartAPI } from '../utils/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

const normalizeCartItem = (item) => {
  const product = item?.product || {};
  const image = product?.images?.[0]?.url || '';
  const details = product?.description || '';

  return {
    id: product?._id || item?.product,
    name: product?.name || 'Product',
    image,
    details,
    price: typeof item?.price === 'number' ? item.price : (product?.price || 0),
    qty: item?.quantity || 0,
  };
};

const normalizeCart = (cartData) => {
  const items = Array.isArray(cartData?.items) ? cartData.items.map(normalizeCartItem).filter((item) => item.id) : [];
  const total = typeof cartData?.totalPrice === 'number'
    ? cartData.totalPrice
    : items.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return { items, total };
};

export const CartProvider = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mutating, setMutating] = useState(false);
  const [error, setError] = useState('');

  const applyServerCart = useCallback((cartData) => {
    const normalized = normalizeCart(cartData);
    setItems(normalized.items);
    setTotal(normalized.total);
  }, []);

  const refreshCart = useCallback(async () => {
    if (!isAuthenticated) {
      setItems([]);
      setTotal(0);
      setError('');
      return null;
    }

    setLoading(true);
    setError('');

    try {
      const response = await cartAPI.getCart();
      applyServerCart(response?.data);
      return response?.data;
    } catch (err) {
      setError(err?.message || 'Failed to load cart');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [applyServerCart, isAuthenticated]);

  const ensureAuthenticated = useCallback(() => {
    if (!isAuthenticated) {
      throw new Error('Please sign in to manage your cart.');
    }
  }, [isAuthenticated]);

  const addToCart = useCallback(async (product, quantity = 1) => {
    ensureAuthenticated();

    const productId = product?._id || product?.id;
    if (!productId) {
      throw new Error('This product is unavailable right now.');
    }

    setMutating(true);
    setError('');

    try {
      const response = await cartAPI.addToCart(productId, quantity);
      applyServerCart(response?.data);
      return response?.data;
    } catch (err) {
      setError(err?.message || 'Failed to add item to cart');
      throw err;
    } finally {
      setMutating(false);
    }
  }, [applyServerCart, ensureAuthenticated]);

  const updateItemQuantity = useCallback(async (productId, quantity) => {
    ensureAuthenticated();

    setMutating(true);
    setError('');

    try {
      const response = await cartAPI.updateCartItemQuantity(productId, quantity);
      applyServerCart(response?.data);
      return response?.data;
    } catch (err) {
      setError(err?.message || 'Failed to update cart item');
      throw err;
    } finally {
      setMutating(false);
    }
  }, [applyServerCart, ensureAuthenticated]);

  const updateItemQuantityByDelta = useCallback(async (productId, delta) => {
    const current = items.find((item) => item.id === productId);
    if (!current) return null;

    const nextQuantity = current.qty + delta;
    if (nextQuantity <= 0) {
      return updateItemQuantity(productId, 0);
    }

    return updateItemQuantity(productId, nextQuantity);
  }, [items, updateItemQuantity]);

  const removeItem = useCallback(async (productId) => {
    ensureAuthenticated();

    setMutating(true);
    setError('');

    try {
      const response = await cartAPI.removeCartItem(productId);
      applyServerCart(response?.data);
      return response?.data;
    } catch (err) {
      setError(err?.message || 'Failed to remove cart item');
      throw err;
    } finally {
      setMutating(false);
    }
  }, [applyServerCart, ensureAuthenticated]);

  const clearCart = useCallback(async () => {
    ensureAuthenticated();

    setMutating(true);
    setError('');

    try {
      const response = await cartAPI.clearCart();
      applyServerCart(response?.data);
      return response?.data;
    } catch (err) {
      setError(err?.message || 'Failed to clear cart');
      throw err;
    } finally {
      setMutating(false);
    }
  }, [applyServerCart, ensureAuthenticated]);

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      setItems([]);
      setTotal(0);
      setError('');
      return;
    }

    refreshCart().catch(() => {});
  }, [authLoading, isAuthenticated, refreshCart]);

  const itemCount = useMemo(() => items.reduce((count, item) => count + item.qty, 0), [items]);

  const value = useMemo(() => ({
    items,
    total,
    itemCount,
    loading,
    mutating,
    error,
    isAuthenticated,
    refreshCart,
    addToCart,
    updateItemQuantity,
    updateItemQuantityByDelta,
    removeItem,
    clearCart,
  }), [
    items,
    total,
    itemCount,
    loading,
    mutating,
    error,
    isAuthenticated,
    refreshCart,
    addToCart,
    updateItemQuantity,
    updateItemQuantityByDelta,
    removeItem,
    clearCart,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
