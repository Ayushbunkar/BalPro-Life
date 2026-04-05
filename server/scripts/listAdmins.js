import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';

dotenv.config();

const run = async () => {
  try {
    await connectDB();
    const admins = await User.find({ role: 'admin' }).lean();
    if (!admins || admins.length === 0) {
      console.log('No admin users found');
      process.exit(0);
    }
    console.log('Admin users:');
    admins.forEach(a => {
      console.log({ email: a.email, name: a.name, isActive: a.isActive, emailVerified: a.emailVerified, _id: a._id });
    });
    process.exit(0);
  } catch (err) {
    console.error('Error listing admins:', err);
    process.exit(1);
  }
};

run();
