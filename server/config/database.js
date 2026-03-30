import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Ensure environment variables are loaded when this module is imported
dotenv.config();

let connectPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectPromise) {
    return connectPromise;
  }

  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/balpro-life';

  // Mask credentials for logging
  const maskedUri = uri.includes('@') ? uri.replace(/:\/\/.*@/, '://****:****@') : uri;
  if (process.env.QUIET_STARTUP !== 'true') {
    console.log(`🔗 Attempting MongoDB connection to: ${maskedUri}`);
  }

  // Newer MongoDB Node drivers don't need deprecated options.
  connectPromise = mongoose.connect(uri)
    .then((conn) => {
      if (process.env.QUIET_STARTUP !== 'true') {
        console.log(`📦 MongoDB Connected: ${conn.connection.host}`);
      }
      return conn.connection;
    })
    .catch((error) => {
      connectPromise = null;
      console.error('❌ MongoDB connection error:', error);
      console.error('Tried URI (masked):', maskedUri);
      throw error;
    });

  return connectPromise;
};

export default connectDB;
