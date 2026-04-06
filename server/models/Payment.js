import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: [true, 'orderId is required'],
    trim: true,
  },
  paymentId: {
    type: String,
    required: [true, 'paymentId is required'],
    trim: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: [true, 'amount is required'],
    min: [0, 'amount cannot be negative'],
  },
  status: {
    type: String,
    required: [true, 'status is required'],
    enum: ['created', 'pending', 'captured', 'failed', 'authorized', 'success'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Payment', paymentSchema);
