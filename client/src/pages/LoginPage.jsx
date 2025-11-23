import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { authAPI } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logo.png';
import { useEffect } from 'react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await authAPI.login(formData);

      // Use auth context to login
      login(data.data.user, data.data.token);

      // Redirect to dashboard (admin -> /admin, user -> /dashboard)
      if (data.data.user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In callback
  const handleGoogleCredential = async (response) => {
    try {
      const res = await authAPI.oauth({ provider: 'google', idToken: response.credential });
      login(res.data.user, res.data.token);
      if (res.data.user?.role === 'admin') navigate('/admin'); else navigate('/dashboard');
    } catch (err) {
      console.error('Google sign-in failed', err);
      setError(err.message || 'Google sign-in failed');
    }
  };

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) return;
    const existing = document.getElementById('google-client-script');
    if (!existing) {
      const s = document.createElement('script');
      s.src = 'https://accounts.google.com/gsi/client';
      s.async = true;
      s.id = 'google-client-script';
      s.onload = () => {
        if (window.google && window.google.accounts && window.google.accounts.id) {
          window.google.accounts.id.initialize({ client_id: clientId, callback: handleGoogleCredential });
          window.google.accounts.id.renderButton(document.getElementById('gsi-button'), { theme: 'outline', size: 'large' });
        }
      };
      document.body.appendChild(s);
    } else {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.initialize({ client_id: clientId, callback: handleGoogleCredential });
        window.google.accounts.id.renderButton(document.getElementById('gsi-button'), { theme: 'outline', size: 'large' });
      }
    }
  }, []);

  return (
    <div className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div className="text-center">
         
          <h2 className="text-3xl font-black text-slate-900">Welcome back</h2>
          <p className="mt-2 text-slate-600">Sign in to your account</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <InputField
              label="Email address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              icon={Mail}
              placeholder="Enter your email"
            />

            <div className="relative">
              <InputField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                icon={Lock}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-slate-400 hover:text-slate-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="text-orange-600 hover:text-orange-500 font-medium">
                Forgot your password?
              </a>
            </div>
          </div>

          <div className="mt-4 text-center">
            <div id="gsi-button" className="inline-block"></div>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <div className="inline-flex rounded-md shadow-sm" role="group" aria-label="OAuth providers">
              <a href={`${import.meta.env.VITE_API_BASE || 'http://localhost:4500'}/api/auth/google`} className="inline-flex items-center gap-3 px-4 py-2 rounded-md border border-gray-200 bg-white text-sm text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-orange-400">
                <svg className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path fill="#EA4335" d="M24 9.5c3.9 0 7 1.5 9.2 3.5l6.8-6.8C35.6 2.6 30.1 0 24 0 14.7 0 6.9 5.6 3 13.6l7.9 6.2C12.9 14.2 18 9.5 24 9.5z"/>
                  <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-2.6-.5-3.8H24v7.2h12.9c-.6 3.2-2.8 5.6-6.1 7.3l9.3 7.2C44.6 37.5 46.5 31.5 46.5 24.5z"/>
                  <path fill="#4A90E2" d="M10.9 29.8A14.9 14.9 0 0 1 9 24.5c0-1.9.3-3.7.9-5.3L3.9 13C1.3 17 0 20.5 0 24.5s1.3 7.5 3.9 11l7-5.7z"/>
                  <path fill="#FBBC05" d="M24 48c6.1 0 11.6-2 15.6-5.4l-7.4-5.8c-2 1.4-4.6 2.3-8.3 2.3-6 0-11.1-4.7-12.2-10.9l-7.9 6.2C6.9 42.4 14.7 48 24 48z"/>
                </svg>
                <span>Continue with Google</span>
              </a>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>

          <div className="text-center">
            <span className="text-slate-600">Don't have an account? </span>
            <Link to="/register" className="text-orange-600 hover:text-orange-500 font-medium">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;