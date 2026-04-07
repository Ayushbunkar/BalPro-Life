// API utility functions for BalPro Life app
// On localhost always call local backend to avoid CORS issues during development.
const getApiBaseUrl = () => {
  if (typeof window === 'undefined') return '/api';

  const isLocalHost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  if (isLocalHost) return 'http://localhost:5000/api';

  const envApiBase = import.meta.env.VITE_API_BASE;
  if (envApiBase) return envApiBase.replace(/\/$/, '') + (envApiBase.endsWith('/api') ? '' : '/api');

  return '/api';
};
const API_BASE_URL = getApiBaseUrl();
let authErrorHandler = null;

export const setAuthErrorHandler = (handler) => {
  authErrorHandler = typeof handler === 'function' ? handler : null;
};

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to create headers with auth token
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const { suppressErrorLog = false, ...requestOptions } = options;
  const config = {
    headers: getAuthHeaders(),
    credentials: 'include', // send cookies for cookie-based auth
    ...requestOptions,
  };

  try {
    const response = await fetch(url, config);

    // Attempt to parse JSON, but fall back to text if body is not JSON
    const contentType = response.headers.get('content-type') || '';
    let data;
    if (contentType.includes('application/json')) {
      try {
        data = await response.json();
      } catch (e) {
        // invalid JSON
        const txt = await response.text();
        throw new Error(txt || 'Invalid JSON response from server');
      }
    } else {
      // non-json response (e.g., rate limiter plain text) - read as text
      const txt = await response.text();
      data = { message: txt };
    }

    if (!response.ok) {
      if (response.status === 401 && (data?.code === 'TOKEN_EXPIRED' || data?.code === 'INVALID_TOKEN')) {
        if (authErrorHandler) {
          authErrorHandler(data);
        }
      }

      // Handle validation errors specifically
      if (data.errors && Array.isArray(data.errors)) {
        const errorMessages = data.errors.map(err => err.msg || err.message).join(', ');
        throw new Error(`${data.message}: ${errorMessages}`);
      }
      if (data.details) {
        throw new Error(`${data.message}: ${data.details}`);
      }
      throw new Error(data.message || response.statusText || 'API request failed');
    }

    return data;
  } catch (error) {
    if (!suppressErrorLog) {
      console.error('API request error:', error);
    }
    throw error;
  }
};

// Auth API functions
export const authAPI = {
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),

  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  getMe: () => apiRequest('/auth/me', { suppressErrorLog: true }),

  getPointsSummary: () => apiRequest('/auth/points-summary', { suppressErrorLog: true }),

  getLoyaltyDashboard: () => apiRequest('/auth/loyalty-dashboard', { suppressErrorLog: true }),

  getRedemptions: () => apiRequest('/auth/redemptions', { suppressErrorLog: true }),

  redeemFreeDrink: (payload = {}) => apiRequest('/auth/redeem-free-drink', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),

  oauth: (payload) => apiRequest('/auth/oauth', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),

  updateProfile: (userData) => apiRequest('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(userData),
  }),

  // Form version for avatar uploads
  updateProfileForm: (formData) => {
    const url = `${API_BASE_URL}/auth/profile`;
    const token = getAuthToken();
    const config = {
      method: 'PUT',
      body: formData,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      },
      credentials: 'include'
    };

    return fetch(url, config).then(async (res) => {
      const contentType = res.headers.get('content-type') || '';
      const data = contentType.includes('application/json') ? await res.json() : { message: await res.text() };
      if (!res.ok) throw new Error(data.message || 'API request failed');
      return data;
    }).catch(err => { console.error('API request error:', err); throw err; });
  },

  changePassword: (passwordData) => apiRequest('/auth/change-password', {
    method: 'PUT',
    body: JSON.stringify(passwordData),
  }),

  logout: () => apiRequest('/auth/logout', {
    method: 'POST',
  }),
};

// Products API functions
export const productsAPI = {
  getProducts: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/products?${queryString}`);
  },

  getProduct: (id) => apiRequest(`/products/${id}`),

  getFeaturedProducts: () => apiRequest('/products/featured'),

  getProductsByCategory: (category) => apiRequest(`/products/category/${category}`),

  searchProducts: (query) => apiRequest(`/products/search?q=${encodeURIComponent(query)}`),

  createProduct: (productData) => apiRequest('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  }),
  // Use FormData for file uploads (images)
  createProductForm: (formData) => {
    const url = `${API_BASE_URL}/products`;
    const token = getAuthToken();
    const config = {
      method: 'POST',
      body: formData,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      },
      credentials: 'include'
    };

    return fetch(url, config).then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'API request failed');
      return data;
    }).catch(err => { console.error('API request error:', err); throw err; });
  },

  updateProduct: (id, productData) => apiRequest(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  }),

  updateProductForm: (id, formData) => {
    const url = `${API_BASE_URL}/products/${id}`;
    const token = getAuthToken();
    const config = {
      method: 'PUT',
      body: formData,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      },
      credentials: 'include'
    };

    return fetch(url, config).then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'API request failed');
      return data;
    }).catch(err => { console.error('API request error:', err); throw err; });
  },

  deleteProduct: (id) => apiRequest(`/products/${id}`, {
    method: 'DELETE',
  }),
};

// Orders API functions
export const ordersAPI = {
  getUserOrders: () => apiRequest('/orders/my-orders'),

  getOrder: (id) => apiRequest(`/orders/${id}`),

  createOrder: (orderData) => apiRequest('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  }),

  cancelOrder: (id) => apiRequest(`/orders/${id}/cancel`, {
    method: 'PUT',
  }),

  // Admin functions
  getAllOrders: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/orders?${queryString}`);
  },

  updateOrderStatus: (id, statusData) => apiRequest(`/orders/${id}`, {
    method: 'PUT',
    body: JSON.stringify(statusData),
  }),
};

// Payments API functions
export const paymentsAPI = {
  createOrder: (amount) => apiRequest('/create-order', {
    method: 'POST',
    body: JSON.stringify({ amount }),
  }),

  verifyPayment: (payload) => apiRequest('/verify-payment', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
};

// Cart API functions
export const cartAPI = {
  getCart: () => apiRequest('/cart'),

  addToCart: (productId, quantity = 1) => apiRequest('/cart/add', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
  }),

  updateCartItemQuantity: (productId, quantity) => apiRequest(`/cart/update/${productId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  }),

  removeCartItem: (productId) => apiRequest(`/cart/remove/${productId}`, {
    method: 'DELETE',
  }),

  clearCart: () => apiRequest('/cart/clear', {
    method: 'DELETE',
  }),
};

// Users API functions (Admin only)
export const usersAPI = {
  getUsers: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/users?${queryString}`);
  },

  getUser: (id) => apiRequest(`/users/${id}`),

  createUser: (userData) => apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  updateUser: (id, userData) => apiRequest(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  }),

  deleteUser: (id) => apiRequest(`/users/${id}`, {
    method: 'DELETE',
  }),
};

// Health check
export const healthAPI = {
  check: () => apiRequest('/health'),
};

export default {
  authAPI,
  productsAPI,
  ordersAPI,
  paymentsAPI,
  cartAPI,
  usersAPI,
  healthAPI,
};

// Admin API
export const adminAPI = {
  getMetrics: () => apiRequest('/admin/metrics'),
  updateProfile: (payload) => apiRequest('/admin/profile', {
    method: 'PUT',
    body: JSON.stringify(payload),
  }),
  updatePassword: (payload) => apiRequest('/admin/password', {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
};

export const dashboardAPI = {
  getStats: () => apiRequest('/dashboard/stats'),
  getAnalytics: () => apiRequest('/dashboard/analytics')
};

export const analyticsAPI = {
  getRevenue: () => apiRequest('/analytics/revenue'),
  getUsers: () => apiRequest('/analytics/users'),
  getConversion: () => apiRequest('/analytics/conversion')
};

export const legalAPI = {
  getPrivacyPolicy: () => apiRequest('/legal/privacy'),
  getTermsOfService: () => apiRequest('/legal/terms'),
  confirmTermsAgreement: (payload) => apiRequest('/legal/terms/confirm', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  subscribeNewsletter: (payload) => apiRequest('/legal/newsletter', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
};
