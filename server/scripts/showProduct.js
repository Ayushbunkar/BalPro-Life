import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import Product from '../models/Product.js';

dotenv.config();

const run = async () => {
  try {
    await connectDB();
    const prod = await Product.findOne({ name: process.env.SEED_PRODUCT_NAME || 'BalPro Chocolate' }).lean();
    if (!prod) {
      console.log('Product not found');
      process.exit(0);
    }
    console.log('Product images:', JSON.stringify(prod.images, null, 2));
    console.log('Product full:', JSON.stringify({ _id: prod._id, name: prod.name, price: prod.price, isActive: prod.isActive }, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Error fetching product:', err);
    process.exit(1);
  }
};

run();
