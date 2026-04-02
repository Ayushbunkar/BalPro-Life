import { analyticsAPI } from '../utils/api';

export const analyticsService = {
  getRevenue: () => analyticsAPI.getRevenue(),
  getUsers: () => analyticsAPI.getUsers(),
  getConversion: () => analyticsAPI.getConversion()
};

export default analyticsService;
