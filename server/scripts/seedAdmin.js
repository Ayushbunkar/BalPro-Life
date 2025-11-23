import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';

dotenv.config();

const run = async () => {
  try {
    await connectDB();

    const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@balpro.test';
    const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'Admin123!';

    const existing = await User.findOne({ email: adminEmail });
    if (existing) {
      console.log(`Admin user already exists: ${adminEmail}`);
      process.exit(0);
    }

    const admin = await User.create({
      name: 'Seed Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
      emailVerified: true
    });

    console.log('Created admin user:');
    console.log({ email: admin.email, password: adminPassword });
    process.exit(0);
  } catch (err) {
    console.error('Seed admin error:', err);
    process.exit(1);
  }
};

run();
