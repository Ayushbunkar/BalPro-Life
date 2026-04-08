import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import Product from '../models/Product.js';

dotenv.config();

const run = async () => {
  try {
    await connectDB();

    const defaultQty = Number(process.env.SEED_PRODUCT_QTY || 100);
    const productsToSeed = [
      {
        name: 'BalPro Chocolate',
        description: 'Single bottle. Rich Belgian chocolate with adaptogenic support for daily wellness.',
        price: 40,
        originalPrice: 49.99,
        imageUrl: process.env.SEED_CHOCOLATE_SINGLE_IMAGE_URL || '/assets/bottleechoclate.jpg',
        sku: 'BALPRO-CHOC-001',
        tags: ['functional', 'chocolate', 'single', 'adaptogen']
      },
      {
        name: 'BalPro Vanilla',
        description: 'Single bottle. Smooth vanilla wellness formula for clean daily nutrition.',
        price: 40,
        originalPrice: 49.99,
        imageUrl: process.env.SEED_VANILLA_SINGLE_IMAGE_URL || '/assets/vanillachoclate.jpg',
        sku: 'BALPRO-VANI-001',
        tags: ['functional', 'vanilla', 'single', 'adaptogen']
      },
      {
        name: 'BalPro Chocolate Pack of 6',
        description: 'Pack of 6 bottles. Chocolate wellness box for weekly stock and better value.',
        price: 240,
        originalPrice: 299,
        imageUrl: process.env.SEED_CHOCOLATE_PACK6_IMAGE_URL || '/assets/bottleechoclate.jpg',
        sku: 'BALPRO-CHOC-006',
        tags: ['functional', 'chocolate', 'pack of 6', 'pack6']
      },
      {
        name: 'BalPro Vanilla Pack of 6',
        description: 'Pack of 6 bottles. Vanilla wellness box for weekly stock and better value.',
        price: 240,
        originalPrice: 299,
        imageUrl: process.env.SEED_VANILLA_PACK6_IMAGE_URL || '/assets/vanillachoclate.jpg',
        sku: 'BALPRO-VANI-006',
        tags: ['functional', 'vanilla', 'pack of 6', 'pack6']
      }
    ];

    for (const item of productsToSeed) {
      const productData = {
        name: item.name,
        description: item.description,
        price: item.price,
        originalPrice: item.originalPrice,
        category: 'supplements',
        brand: 'BalPro Life',
        images: [
          {
            url: item.imageUrl,
            alt: item.name
          }
        ],
        inventory: {
          quantity: defaultQty,
          sku: item.sku,
          trackInventory: true
        },
        isActive: true,
        isFeatured: true,
        tags: item.tags
      };

      const existing = await Product.findOne({ 'inventory.sku': item.sku });

      if (existing) {
        await Product.findByIdAndUpdate(existing._id, productData, { new: true, runValidators: true });
        console.log(`Updated existing product: ${item.name}`);
      } else {
        await Product.create(productData);
        console.log(`Created product: ${item.name}`);
      }
    }

    process.exit(0);
  } catch (err) {
    console.error('Seed product error:', err);
    process.exit(1);
  }
};

run();
