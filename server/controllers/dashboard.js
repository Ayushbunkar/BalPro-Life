import asyncHandler from '../middleware/asyncHandler.js';
import { getDashboardAnalyticsService, getDashboardStatsService } from '../services/dashboardService.js';

export const getDashboardStats = asyncHandler(async (req, res) => {
  const data = await getDashboardStatsService();
  res.status(200).json({ success: true, data });
});

export const getDashboardAnalytics = asyncHandler(async (req, res) => {
  const data = await getDashboardAnalyticsService();
  res.status(200).json({ success: true, data });
});
