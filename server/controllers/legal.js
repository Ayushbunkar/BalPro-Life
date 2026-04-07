import NewsletterSubscriber from '../models/NewsletterSubscriber.js';
import TermsAgreement from '../models/TermsAgreement.js';

export const getPrivacyPolicy = async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      title: 'Privacy Policy',
      subtitle: 'Your Privacy is our Ritual',
      legalEmail: 'privacy@balpro.life',
      lastUpdated: '2026-04-08',
    },
  });
};

export const getTermsOfService = async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      title: 'Terms of Service',
      subtitle: 'The Terms of the Ritual',
      legalEmail: 'legal@balpro.life',
      governingJurisdiction: 'Maharashtra, India',
      termsVersion: '2026.04',
      lastUpdated: '2026-04-08',
    },
  });
};

export const confirmTermsAgreement = async (req, res) => {
  const source = String(req.body?.source || 'terms-of-service').trim();
  const termsVersion = String(req.body?.termsVersion || '2026.04').trim();

  const forwardedFor = req.headers['x-forwarded-for'];
  const ipAddress = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : String(forwardedFor || req.ip || '').split(',')[0].trim();
  const userAgent = String(req.headers['user-agent'] || '').trim();

  const agreement = await TermsAgreement.create({
    source,
    termsVersion,
    ipAddress: ipAddress || undefined,
    userAgent: userAgent || undefined,
  });

  return res.status(201).json({
    success: true,
    message: 'Agreement confirmed successfully.',
    data: {
      id: agreement._id,
      agreedAt: agreement.createdAt,
      termsVersion: agreement.termsVersion,
    },
  });
};

export const subscribeNewsletter = async (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase();
  const source = String(req.body?.source || 'privacy-policy').trim();

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.',
    });
  }

  const existing = await NewsletterSubscriber.findOne({ email });
  if (existing) {
    return res.status(200).json({
      success: true,
      message: 'You are already subscribed.',
      data: { email },
    });
  }

  await NewsletterSubscriber.create({ email, source });

  return res.status(201).json({
    success: true,
    message: 'Subscribed successfully.',
    data: { email },
  });
};
