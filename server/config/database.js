import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Ensure environment variables are loaded when this module is imported
dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/balpro-life';

  // Mask credentials for logging
  const maskedUri = uri.includes('@') ? uri.replace(/:\/\/.*@/, '://****:****@') : uri;
  if (process.env.QUIET_STARTUP !== 'true') {
    console.log(`🔗 Attempting MongoDB connection to: ${maskedUri}`);
  }

  try {
    // Newer MongoDB Node drivers don't need `useNewUrlParser` or `useUnifiedTopology`.
    // Pass no deprecated options to avoid driver warnings.
    const conn = await mongoose.connect(uri);

    if (process.env.QUIET_STARTUP !== 'true') {
      console.log(`📦 MongoDB Connected: ${conn.connection.host}`);
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    console.error('Tried URI (masked):', maskedUri);
    console.error('Ensure MongoDB is running, the connection string is correct in server/.env, or update MONGODB_URI to a valid MongoDB Atlas URI.');
    process.exit(1);
  }
};

export default connectDB;