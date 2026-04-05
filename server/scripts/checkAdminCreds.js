import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';

dotenv.config();

const run = async () => {
  try {
    await connectDB();

    const email = process.argv[2] || process.env.SEED_ADMIN_EMAIL || 'admin@balpro.test';
    const password = process.argv[3] || process.env.SEED_ADMIN_PASSWORD || 'Admin123!';

    const user = await User.findOne({ email: String(email).toLowerCase().trim() }).select('+password');
    if (!user) {
      console.log(`No user found for email: ${email}`);
      process.exit(0);
    }

    const match = await user.matchPassword(password);
    console.log(`User found: ${user.email}`);
    console.log(`Role: ${user.role}, isActive: ${user.isActive}, emailVerified: ${user.emailVerified}`);
    console.log(`Password match for provided password: ${match}`);
    process.exit(0);
  } catch (err) {
    console.error('Error checking admin creds:', err);
    process.exit(1);
  }
};

run();
