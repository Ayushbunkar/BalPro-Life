// Codes and Rewards API functions
import { authAPI } from './api.js';

const isLocalHost = typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname);
const resolvedApiBase = isLocalHost
  ? 'http://localhost:4500'
  : (import.meta.env.VITE_API_BASE || 'http://localhost:4500');
const API_BASE_URL = resolvedApiBase.replace(/\/$/, '') + '/api';

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: getAuthHeaders(),
    credentials: 'include',
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const contentType = response.headers.get('content-type') || '';
    
    let data;
    if (contentType.includes('application/json')) {
      try {
        data = await response.json();
      } catch (e) {
        const txt = await response.text();
        throw new Error(txt || 'Invalid JSON response from server');
      }
    } else {
      const txt = await response.text();
      data = { message: txt };
    }

    if (!response.ok) {
      if (data.errors && Array.isArray(data.errors)) {
        const errorMessages = data.errors.map(err => err.msg || err.message).join(', ');
        throw new Error(`${data.message}: ${errorMessages}`);
      }
      throw new Error(data.message || response.statusText || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

/**
 * Codes API - For code verification on drink bottles
 */
export const codesAPI = {
  // Verify code and check if user won
  verifyCode: (code) => apiRequest('/codes/verify', {
    method: 'POST',
    body: JSON.stringify({ code }),
  }),

  // Play the lucky number game
  playGame: (data) => apiRequest('/game/play', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Get code statistics (Admin only)
  getCodeStats: () => apiRequest('/codes/stats'),

  // Get all codes with filters (Admin only)
  getAllCodes: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/codes?${queryString}`);
  },

  // Get single code details (Admin only)
  getCodeById: (id) => apiRequest(`/codes/${id}`),

  // Generate bulk codes (Admin only)
  generateCodes: (data) => apiRequest('/codes/generate', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Delete batch of codes (Admin only)
  deleteCodeBatch: (batchId) => apiRequest(`/codes/batch/${batchId}`, {
    method: 'DELETE',
  }),
};

/**
 * Rewards API - For reward redemption and management
 */
export const rewardsAPI = {
  // Get reward details by reward ID (Public)
  getRewardDetails: (rewardId) => apiRequest(`/rewards/${rewardId}`),

  // Get user's rewards (Private)
  getUserRewards: (filter = 'all') => apiRequest(`/rewards/user/my-rewards?filter=${filter}`),

  // Redeem/claim reward (Store staff side)
  redeemReward: (data) => apiRequest('/rewards/redeem', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Verify reward via QR code (Public)
  verifyRewardQR: (rewardId) => apiRequest('/rewards/verify-qr', {
    method: 'POST',
    body: JSON.stringify({ rewardId }),
  }),

  // Get all rewards (Admin only)
  getAllRewards: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/rewards/admin/all?${queryString}`);
  },

  // Get reward statistics (Admin only)
  getRewardStats: () => apiRequest('/rewards/stats/dashboard'),

  // Admin manual redemption (Admin only)
  adminRedeemReward: (rewardId, data) => apiRequest(`/rewards/${rewardId}/admin-redeem`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

export default {
  codesAPI,
  rewardsAPI,
};
