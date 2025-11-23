import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts,
  getFeaturedProducts
} from '../controllers/products.js';
import { uploadProduct, handleUpload } from '../middleware/upload.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/search', searchProducts);
router.get('/:id', getProduct);

// Admin only routes
router.use(protect);
router.use(authorize('admin'));

// routes with multer middleware below for handling multipart/form-data
router.delete('/:id', deleteProduct);

// Note: create/update accept multipart/form-data with `image` (single) field
router.post('/', uploadProduct.single('image'), handleUpload, createProduct);
router.put('/:id', uploadProduct.single('image'), handleUpload, updateProduct);

export default router;