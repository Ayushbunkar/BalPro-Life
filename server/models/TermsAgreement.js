import mongoose from 'mongoose';

const termsAgreementSchema = new mongoose.Schema(
  {
    termsVersion: {
      type: String,
      required: true,
      trim: true,
      default: '2026.04',
    },
    source: {
      type: String,
      default: 'terms-of-service',
      trim: true,
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    userAgent: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('TermsAgreement', termsAgreementSchema);
