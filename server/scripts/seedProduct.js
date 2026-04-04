import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import Product from '../models/Product.js';

dotenv.config();

const run = async () => {
  try {
    await connectDB();

    const name = process.env.SEED_PRODUCT_NAME || 'BalPro Functional Cacao';

    const existing = await Product.findOne({ name });

    const productData = {
      name,
      description:
        'A masterclass in functional indulgence. Rich Belgian chocolate meets adaptogenic mushrooms in a silk-smooth pour.',
      price: 40,
      originalPrice: 49.99,
      category: 'supplements',
      brand: 'BalPro Life',
      images: [
        {
          url: process.env.SEED_PRODUCT_IMAGE_URL || 'https://via.placeholder.com/800x800.png?text=BalPro+Chocolate',
          alt: 'BalPro Functional Cacao'
        }
      ],
      inventory: {
        quantity: Number(process.env.SEED_PRODUCT_QTY || 100),
        sku: process.env.SEED_PRODUCT_SKU || 'BALPRO-CHOC-001',
        trackInventory: true
      },
      isActive: true,
      isFeatured: true,
      tags: ['functional', 'chocolate', 'adaptogen']
    };

    if (existing) {
      await Product.findByIdAndUpdate(existing._id, productData, { new: true, runValidators: true });
      console.log(`Updated existing product: ${name}`);
    } else {
      await Product.create(productData);
      console.log(`Created product: ${name}`);
    }

    process.exit(0);
  } catch (err) {
    console.error('Seed product error:', err);
    process.exit(1);
  }
};

run();
