import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import {
	confirmTermsAgreement,
	getPrivacyPolicy,
	getTermsOfService,
	subscribeNewsletter,
} from '../controllers/legal.js';

const router = express.Router();

router.get('/privacy', asyncHandler(getPrivacyPolicy));
router.get('/terms', asyncHandler(getTermsOfService));
router.post('/terms/confirm', asyncHandler(confirmTermsAgreement));
router.post('/newsletter', asyncHandler(subscribeNewsletter));

export default router;
