import mongoose from 'mongoose';

const loyaltyRedemptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  redemptionCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
  },
  rewardType: {
    type: String,
    required: true,
    enum: ['FREE_DRINK'],
    default: 'FREE_DRINK',
  },
  rewardItem: {
    type: String,
    required: true,
    enum: ['CHOCOLATE_SINGLE', 'VANILLA_SINGLE'],
    default: 'CHOCOLATE_SINGLE',
  },
  pointsUsed: {
    type: Number,
    required: true,
    default: 100,
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'redeemed', 'expired'],
    default: 'active',
    index: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: true,
  },
  redeemedAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

export default mongoose.model('LoyaltyRedemption', loyaltyRedemptionSchema);
