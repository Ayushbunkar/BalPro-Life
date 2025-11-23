// API utility functions for BalPro Life app
const API_BASE_URL = 'http://localhost:4500/api';

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
  const config = {
    headers: getAuthHeaders(),
    credentials: 'include', // send cookies for cookie-based auth
    ...options,
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
      // Handle validation errors specifically
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

  getMe: () => apiRequest('/auth/me'),

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

  updateOrderStatus: (id, statusData) => apiRequest(`/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify(statusData),
  }),
};

// Users API functions (Admin only)
export const usersAPI = {
  getUsers: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/users?${queryString}`);
  },

  getUser: (id) => apiRequest(`/users/${id}`),

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
  usersAPI,
  healthAPI,
};

// Admin API
export const adminAPI = {
  getMetrics: () => apiRequest('/admin/metrics')
};