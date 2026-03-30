import User from '../models/User.js';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import crypto from 'crypto';
import { validationResult } from 'express-validator';
import fs from 'fs';
import path from 'path';
import cloudinary from '../config/cloudinary.js';
const usingCloudinary = !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);

// Initialize Google OAuth client if client ID is provided
const normalizeGoogleClientId = (value) => {
  return String(value || '').trim().replace(/^"|"$/g, '');
};

const GOOGLE_CLIENT_ID = normalizeGoogleClientId(process.env.GOOGLE_CLIENT_ID);
const googleClient = GOOGLE_CLIENT_ID ? new OAuth2Client(GOOGLE_CLIENT_ID) : null;

const getRequestBaseUrl = (req) => {
  if (process.env.SERVER_ROOT_URL) {
    return process.env.SERVER_ROOT_URL.replace(/\/+$/, '');
  }

  const forwardedProto = req.headers['x-forwarded-proto'];
  const forwardedHost = req.headers['x-forwarded-host'];
  if (forwardedProto && forwardedHost) {
    return `${String(forwardedProto).split(',')[0]}://${String(forwardedHost).split(',')[0]}`;
  }

  if (req.get('host')) {
    return `${req.protocol}://${req.get('host')}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return `http://localhost:${process.env.PORT || 5000}`;
};

const getGoogleRedirectUri = (req) => {
  const explicit = String(process.env.GOOGLE_REDIRECT_URI || '').trim();
  if (explicit) {
    return explicit;
  }
  return `${getRequestBaseUrl(req)}/api/auth/google/callback`;
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, password } = req.body;
    const normalizedEmail = String(email || '').toLowerCase().trim();

    // Check if user exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email: normalizedEmail,
      password
    });

    // Generate token
    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: user.toJSON(),
        token
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    const normalizedEmail = String(email || '').toLowerCase().trim();

    // Check for user
    const user = await User.findOne({ email: normalizedEmail }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = user.getSignedJwtToken();

    // For cookie-based flows we can set an HttpOnly cookie when desired (callbacks will set it).
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: user.toJSON(),
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
  try {
    // Clear cookie if present
    res.clearCookie('token', { path: '/' });
    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
      data: {}
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during logout'
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    };

    // allow profession and professional flag to be updated from settings
    if (typeof req.body.profession !== 'undefined') fieldsToUpdate.profession = req.body.profession;
    if (typeof req.body.isProfessional !== 'undefined') fieldsToUpdate.isProfessional = req.body.isProfessional === 'true' || req.body.isProfessional === true;

    // If an avatar was uploaded via middleware, attach it and remove previous avatar if present
    if (req.uploaded) {
      // remove old avatar if exists
      try {
        const existing = await User.findById(req.user.id);
        if (existing && existing.avatar) {
          if (existing.avatarPublicId && usingCloudinary) {
            await cloudinary.uploader.destroy(existing.avatarPublicId).catch(err => console.warn('Cloudinary destroy warning:', err.message || err));
          } else if (existing.avatar && existing.avatar.startsWith('/uploads')) {
            const filePath = path.join(process.cwd(), existing.avatar.replace(/^\//, ''));
            fs.unlink(filePath, (err) => { if (err) console.warn('Failed to remove old avatar', filePath, err.message); });
          }
        }
      } catch (err) {
        console.warn('Error removing old avatar:', err.message || err);
      }

      fieldsToUpdate.avatar = req.uploaded.url;
      if (req.uploaded.public_id) fieldsToUpdate.avatarPublicId = req.uploaded.public_id;
    } else if (req.body.avatar) {
      fieldsToUpdate.avatar = req.body.avatar;
    }

    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(key => {
      if (fieldsToUpdate[key] === undefined) {
        delete fieldsToUpdate[key];
      }
    });

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    user.password = req.body.newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
  try {
    const normalizedEmail = String(req.body.email || '').toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // In production, send email with reset token
    console.log(`Password reset token for ${user.email}: ${resetToken}`);

    res.status(200).json({
      success: true,
      message: 'Password reset email sent'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:token
// @access  Public
export const resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    OAuth login (Google)
// @route   POST /api/auth/oauth
// @access  Public
export const oauthLogin = async (req, res) => {
  try {
    const { provider, idToken } = req.body;
    if (!provider || !idToken) {
      return res.status(400).json({ success: false, message: 'Provider and idToken are required' });
    }

    let profile = null;

    if (provider === 'google') {
      if (!googleClient) return res.status(500).json({ success: false, message: 'Google client not configured on server' });
      // Verify Google ID token
      const ticket = await googleClient.verifyIdToken({ idToken, audience: GOOGLE_CLIENT_ID });
      const payload = ticket.getPayload();
      profile = {
        email: payload.email,
        name: payload.name || payload.given_name || payload.email.split('@')[0],
        avatar: payload.picture || ''
      };
    } else {
      return res.status(400).json({ success: false, message: 'Unsupported provider' });
    }

    if (!profile || !profile.email) {
      return res.status(400).json({ success: false, message: 'Failed to obtain email from provider' });
    }

    // Find or create user
    let user = await User.findOne({ email: profile.email });
    if (!user) {
      // create user with random password
      const randomPassword = Math.random().toString(36).slice(2, 12);
      user = await User.create({ name: profile.name, email: profile.email, password: randomPassword, avatar: profile.avatar });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const token = user.getSignedJwtToken();

    // Set HttpOnly cookie for browsers (will be used by protect middleware)
    try {
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        // Allow overriding SameSite via env (use 'none' for cross-site cookies in production)
        sameSite: process.env.COOKIE_SAMESITE || (process.env.NODE_ENV === 'production' ? 'none' : 'lax'),
        path: '/',
        maxAge: (process.env.JWT_COOKIE_EXPIRE_DAYS ? parseInt(process.env.JWT_COOKIE_EXPIRE_DAYS, 10) : 30) * 24 * 60 * 60 * 1000
      };
      res.cookie('token', token, cookieOptions);
    } catch (cookieErr) {
      console.warn('Failed to set auth cookie:', cookieErr);
    }

    // Return token in body for backward compatibility but browser will also have cookie set
    res.status(200).json({ success: true, message: 'OAuth login successful', data: { user, token } });
  } catch (error) {
    console.error('OAuth login error:', error);
    res.status(500).json({
      success: false,
      message: 'OAuth login failed',
      details: error?.message || 'Unknown OAuth error'
    });
  }
};

// Google redirect -> /api/auth/google
export const googleAuthRedirect = (req, res) => {
  const clientId = GOOGLE_CLIENT_ID;
  if (!clientId) return res.status(500).json({ success: false, message: 'Google OAuth not configured on server' });
  const redirectUri = getGoogleRedirectUri(req);
  console.log('Google redirect URI:', redirectUri);
  const scope = 'openid email profile';
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}&access_type=offline&prompt=consent`;
  return res.redirect(url);
};

// Google callback -> exchange code for tokens and issue app JWT
export const googleCallback = async (req, res) => {
  try {
    if (!googleClient) return res.status(500).send('Google client not configured on server');
    const code = req.query.code;
    if (!code) return res.status(400).json({ success: false, message: 'Missing authorization code from Google' });
    const redirectUri = getGoogleRedirectUri(req);
    const tokenRes = await axios.post('https://oauth2.googleapis.com/token', new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri
    }).toString(), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
    console.log('Token response status:', tokenRes.status);
    console.log('Token response data:', tokenRes.data);

    const idToken = tokenRes.data.id_token;
    if (!idToken) return res.status(400).send('No id_token from Google');
    const ticket = await googleClient.verifyIdToken({ idToken, audience: GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    if (!payload || !payload.email) return res.status(400).send('Invalid id_token payload');
    const profile = { email: payload.email, name: payload.name || payload.email.split('@')[0], avatar: payload.picture || '' };
    console.log('Profile from token:', profile);

    let user = await User.findOne({ email: profile.email });
    if (!user) {
      const randomPassword = Math.random().toString(36).slice(2, 12);
      user = await User.create({ name: profile.name, email: profile.email, password: randomPassword, avatar: profile.avatar });
      console.log('User created:', user.email);
    } else {
      console.log('User found:', user.email);
    }
    user.lastLogin = new Date();
    await user.save();
    const appToken = user.getSignedJwtToken();
    console.log('Token generated for user:', user.email);

    // Set cookie instead of returning token in URL
    try {
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.COOKIE_SAMESITE || (process.env.NODE_ENV === 'production' ? 'none' : 'lax'),
        path: '/',
        maxAge: (process.env.JWT_COOKIE_EXPIRE_DAYS ? parseInt(process.env.JWT_COOKIE_EXPIRE_DAYS, 10) : 30) * 24 * 60 * 60 * 1000
      };
      res.cookie('token', appToken, cookieOptions);
      console.log('Cookie set for user:', user.email);
    } catch (cookieErr) {
      console.warn('Failed to set auth cookie on Google callback:', cookieErr);
    }

    // Redirect back to client without token in URL
    const clientUrl = process.env.NODE_ENV === 'production'
      ? (process.env.CLIENT_URL || getRequestBaseUrl(req))
      : 'http://localhost:5173';
    console.log('Redirecting to:', clientUrl + '/auth/callback');
    return res.redirect(`${clientUrl}/auth/callback`);
  } catch (err) {
    console.error('Google callback error:', err.response?.data || err.message || err);
    return res.status(500).json({
      success: false,
      message: 'Google authentication failed',
      details: err.response?.data?.error_description || err.response?.data?.error || err.message
    });
  }
};
