import { dashboardAPI } from '../utils/api';

export const dashboardService = {
  getStats: () => dashboardAPI.getStats(),
  getAnalytics: () => dashboardAPI.getAnalytics()
};

export default dashboardService;
