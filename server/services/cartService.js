import mongoose from 'mongoose';
import ApiError from '../utils/ApiError.js';
import Cart from '../models/cartModel.js';
import Product from '../models/Product.js';

const VANILLA_IMAGE_URL = process.env.VANILLA_PRODUCT_IMAGE_URL || '/assets/vanillachoclate.jpg';

const isVanillaProduct = (product) => {
  const text = [
    product?.name || '',
    product?.description || '',
    ...(Array.isArray(product?.tags) ? product.tags : [])
  ].join(' ').toLowerCase();

  return text.includes('vanilla');
};

const hasUsableImage = (product) => {
  const firstImage = product?.images?.[0];
  return !!(firstImage && typeof firstImage.url === 'string' && firstImage.url.trim());
};

const normalizeCartImages = (cart) => {
  if (!cart?.items?.length) return cart;

  cart.items.forEach((item) => {
    if (item?.product && isVanillaProduct(item.product) && !hasUsableImage(item.product)) {
      item.product.images = [
        {
          url: VANILLA_IMAGE_URL,
          alt: item.product?.name || 'BalPro Vanilla'
        }
      ];
    }
  });

  return cart;
};

const recalculateTotal = (items = []) => items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

const ensureObjectId = (id, label) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, `Invalid ${label}`);
  }
};

const withTransaction = async (work) => {
  const session = await mongoose.startSession();
  try {
    let result;
    await session.withTransaction(async () => {
      result = await work(session);
    });
    return result;
  } finally {
    await session.endSession();
  }
};

const findOrCreateCart = async (userId, session) => {
  let cart = await Cart.findOne({ user: userId }).session(session);
  if (!cart) {
    cart = await Cart.create([{ user: userId, items: [], totalPrice: 0 }], { session }).then((docs) => docs[0]);
  }
  return cart;
};

export const addToCartService = async (userId, productId, quantity) => {
  ensureObjectId(userId, 'user id');
  ensureObjectId(productId, 'product id');

  return withTransaction(async (session) => {
    const product = await Product.findById(productId).session(session);
    if (!product || !product.isActive) {
      throw new ApiError(404, 'Product not found');
    }

    const cart = await findOrCreateCart(userId, session);
    const existing = cart.items.find((item) => item.product.toString() === productId);

    if (existing) {
      existing.quantity += quantity;
      existing.price = product.price;
    } else {
      cart.items.push({ product: product._id, quantity, price: product.price });
    }

    cart.totalPrice = recalculateTotal(cart.items);
    await cart.save({ session });

    const populatedCart = await Cart.findById(cart._id).populate('items.product').session(session);
    return normalizeCartImages(populatedCart);
  });
};

export const getCartService = async (userId) => {
  ensureObjectId(userId, 'user id');

  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [], totalPrice: 0 });
    cart = await Cart.findById(cart._id).populate('items.product');
  }

  return normalizeCartImages(cart);
};

export const updateCartItemQuantityService = async (userId, productId, quantity) => {
  ensureObjectId(userId, 'user id');
  ensureObjectId(productId, 'product id');

  return withTransaction(async (session) => {
    const cart = await findOrCreateCart(userId, session);
    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

    if (itemIndex === -1) {
      throw new ApiError(404, 'Product not found in cart');
    }

    if (quantity === 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      if (quantity < 0) {
        throw new ApiError(400, 'Quantity cannot be negative');
      }
      const product = await Product.findById(productId).session(session);
      if (!product || !product.isActive) {
        throw new ApiError(404, 'Product not found');
      }
      cart.items[itemIndex].quantity = quantity;
      cart.items[itemIndex].price = product.price;
    }

    cart.totalPrice = recalculateTotal(cart.items);
    await cart.save({ session });

    const populatedCart = await Cart.findById(cart._id).populate('items.product').session(session);
    return normalizeCartImages(populatedCart);
  });
};

export const removeCartItemService = async (userId, productId) => {
  ensureObjectId(userId, 'user id');
  ensureObjectId(productId, 'product id');

  return withTransaction(async (session) => {
    const cart = await findOrCreateCart(userId, session);
    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    cart.totalPrice = recalculateTotal(cart.items);
    await cart.save({ session });

    const populatedCart = await Cart.findById(cart._id).populate('items.product').session(session);
    return normalizeCartImages(populatedCart);
  });
};

export const clearCartService = async (userId) => {
  ensureObjectId(userId, 'user id');

  return withTransaction(async (session) => {
    const cart = await findOrCreateCart(userId, session);
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save({ session });

    const populatedCart = await Cart.findById(cart._id).populate('items.product').session(session);
    return normalizeCartImages(populatedCart);
  });
};
