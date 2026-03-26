import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Code from './models/Code.js';

dotenv.config();

const getTestCode = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Get a winning code
    const winningCode = await Code.findOne({ isWinning: true });
    console.log('✅ TEST CODE (WINNING):', winningCode.code);
    
    // Get a non-winning code
    const losingCode = await Code.findOne({ isWinning: false });
    console.log('❌ TEST CODE (NON-WINNING):', losingCode.code);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

getTestCode();
