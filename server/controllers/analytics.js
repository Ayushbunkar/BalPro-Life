import asyncHandler from '../middleware/asyncHandler.js';
import {
  getConversionAnalyticsService,
  getRevenueAnalyticsService,
  getUserAnalyticsService
} from '../services/analyticsService.js';

export const getRevenueAnalytics = asyncHandler(async (req, res) => {
  const data = await getRevenueAnalyticsService();
  res.status(200).json({ success: true, data });
});

export const getUsersAnalytics = asyncHandler(async (req, res) => {
  const data = await getUserAnalyticsService();
  res.status(200).json({ success: true, data });
});

export const getConversionAnalytics = asyncHandler(async (req, res) => {
  const data = await getConversionAnalyticsService();
  res.status(200).json({ success: true, data });
});
