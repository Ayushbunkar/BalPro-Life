import mongoose from 'mongoose';

const rewardSchema = new mongoose.Schema({
  rewardId: {
    type: String,
    required: [true, 'Reward ID is required'],
    unique: true,
    uppercase: true,
    trim: true
  },
  code: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Code',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    default: null
  },
  // Game data
  userNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  winningNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  reward: {
    type: String,
    required: true,
    enum: [
      'Free Drink 250ml',
      'Free Drink 500ml',
      '20% Discount',
      '50% Discount',
      'Free Premium Bundle',
      'Buy One Get One'
    ]
  },
  isRedeemed: {
    type: Boolean,
    default: false,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  expiresAt: {
    type: Date,
    required: true,
    index: true,
    // Automatically delete expired records
    expires: 0
  },
  redeemedAt: {
    type: Date,
    default: null
  },
  redeemedByStore: {
    storeId: String,
    storeName: String,
    staffName: String
  },
  qrCode: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['active', 'redeemed', 'expired'],
    default: 'active'
  }
}, { timestamps: true });

// Index for faster queries
rewardSchema.index({ userId: 1, isRedeemed: 1 });
rewardSchema.index({ status: 1 });

export default mongoose.model('Reward', rewardSchema);
