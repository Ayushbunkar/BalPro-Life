import express from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword
  ,
  oauthLogin
  ,
  googleAuthRedirect,
  googleCallback,
  
} from '../controllers/auth.js';
import { protect } from '../middleware/auth.js';
import { uploadAvatar, handleAvatarUpload } from '../middleware/uploadAvatar.js';

const router = express.Router();

// Validation rules
const registerValidation = [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').exists().withMessage('Password is required')
];

// Public routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
// OAuth login (Google) - expects { provider, idToken }
router.post('/oauth', oauthLogin);

// Redirect flows (server-side)
router.get('/google', googleAuthRedirect);
router.get('/google/callback', googleCallback);
router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email')
], forgotPassword);
router.put('/reset-password/:token', [
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], resetPassword);
router.use(protect); // All routes below require authentication
router.get('/me', getMe);
// Allow avatar upload via multipart/form-data on profile update
router.put('/profile', uploadAvatar.single('avatar'), handleAvatarUpload, updateProfile);
router.put('/change-password', [
  body('currentPassword').exists().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
], changePassword);
router.post('/logout', logout);

export default router;