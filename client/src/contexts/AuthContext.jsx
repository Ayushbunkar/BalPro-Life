import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }

    setLoading(false);
  }, []);

  // Login function
  const login = useCallback((userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    // Only persist token if provided (cookie-based flows won't provide a readable token)
    if (token) {
      localStorage.setItem('token', token);
    }
    try {
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (e) {
      // ignore localStorage errors
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  // Update user function (uses functional setState so it's stable)
  const updateUser = useCallback((userData) => {
    setUser(prev => {
      const updatedUser = { ...(prev || {}), ...userData };
      try {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } catch (e) {
        // ignore localStorage errors
      }
      return updatedUser;
    });
    setIsAuthenticated(true);
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
  }), [user, loading, isAuthenticated, login, logout, updateUser]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;