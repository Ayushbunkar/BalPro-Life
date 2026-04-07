import mongoose from 'mongoose';

const newsletterSubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    source: {
      type: String,
      default: 'privacy-policy',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('NewsletterSubscriber', newsletterSubscriberSchema);
