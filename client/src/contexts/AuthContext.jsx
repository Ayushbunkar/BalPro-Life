import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { authAPI, setAuthErrorHandler } from '../utils/api';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on app start
  useEffect(() => {
    const hydrateSession = async () => {
      const userData = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      // Only trust cached user when a token exists; otherwise treat it as stale.
      if (userData && token) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('user');
        }
      } else if (userData && !token) {
        localStorage.removeItem('user');
      }

      try {
        // Validate/restore session from backend using token/cookie.
        const me = await authAPI.getMe();
        if (me?.data) {
          setUser(me.data);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(me.data));
        }
      } catch (_error) {
        // If backend session is invalid, clear local auth cache.
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    hydrateSession();
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
  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch (_error) {
      // Always clear local state even if server logout request fails.
    }
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  useEffect(() => {
    setAuthErrorHandler(() => {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    });

    return () => setAuthErrorHandler(null);
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