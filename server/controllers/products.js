import Product from '../models/Product.js';
import fs from 'fs';
import path from 'path';
import cloudinary from '../config/cloudinary.js';
const usingCloudinary = !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const startIndex = (page - 1) * limit;

    // Build query
    let query = { isActive: true };

    // Filtering
    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = parseFloat(req.query.maxPrice);
    }

    // Sorting
    let sortOptions = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      sortOptions = sortBy;
    } else {
      sortOptions = '-createdAt';
    }

    // If a text query is present, use text search and sort by score
    let productsQuery;
    if (req.query.q) {
      query.$text = { $search: req.query.q };
      productsQuery = Product.find(query, { score: { $meta: 'textScore' } })
        .sort({ score: { $meta: 'textScore' }, createdAt: -1 });
    } else {
      productsQuery = Product.find(query).sort(sortOptions);
    }

    const products = await productsQuery
      .limit(limit)
      .skip(startIndex);

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      count: products.length,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      data: products
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    // Build product data from body; multer will populate req.file when an image is uploaded
    const data = { ...req.body };
    if (data.price) data.price = parseFloat(data.price);
    if (data.originalPrice) data.originalPrice = parseFloat(data.originalPrice);

    // If upload middleware set `req.uploaded`, use it (cloudinary or local)
    if (req.uploaded) {
      const img = { url: req.uploaded.url, alt: data.name || '' };
      if (req.uploaded.public_id) img.public_id = req.uploaded.public_id;
      data.images = [img];
    }

    const product = await Product.create(data);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.price) updateData.price = parseFloat(updateData.price);
    if (updateData.originalPrice) updateData.originalPrice = parseFloat(updateData.originalPrice);

    // If uploading a new image, remove previous local file or cloud image when possible
    if (req.uploaded) {
      // remove old image if exists
      try {
        const existing = await Product.findById(req.params.id);
        if (existing && existing.images && existing.images.length > 0) {
          const old = existing.images[0];
          if (old.public_id && usingCloudinary) {
            // attempt to remove from cloudinary
            await cloudinary.uploader.destroy(old.public_id).catch(err => console.warn('Cloudinary destroy warning:', err.message || err));
          } else if (old.url && old.url.startsWith('/uploads')) {
            const filePath = path.join(process.cwd(), old.url.replace(/^\//, ''));
            fs.unlink(filePath, (err) => { if (err) console.warn('Failed to remove old file', filePath, err.message); });
          }
        }
      } catch (err) {
        console.warn('Error removing old image:', err.message || err);
      }

      const img = { url: req.uploaded.url, alt: updateData.name || '' };
      if (req.uploaded.public_id) img.public_id = req.uploaded.public_id;
      updateData.images = [img];
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Remove associated images from disk or cloud
    try {
      if (product.images && product.images.length > 0) {
        const img = product.images[0];
        if (img.public_id && usingCloudinary) {
          await cloudinary.uploader.destroy(img.public_id).catch(err => console.warn('Cloudinary destroy warning:', err.message || err));
        } else if (img.url && img.url.startsWith('/uploads')) {
          const filePath = path.join(process.cwd(), img.url.replace(/^\//, ''));
          fs.unlink(filePath, (err) => { if (err) console.warn('Failed to remove file', filePath, err.message); });
        }
      }
    } catch (err) {
      console.warn('Error removing product images on delete:', err.message || err);
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: {}
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
export const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.category,
      isActive: true
    }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Get products by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Search products
// @route   GET /api/products/search
// @access  Public
export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const products = await Product.find(
      {
        $text: { $search: q },
        isActive: true
      },
      {
        score: { $meta: 'textScore' }
      }
    )
    .sort({ score: { $meta: 'textScore' } })
    .limit(20);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Search products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isFeatured: true,
      isActive: true
    })
    .sort('-averageRating -createdAt')
    .limit(8);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};