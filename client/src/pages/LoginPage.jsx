import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { authAPI } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logo.png';

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

      // Redirect to home page
      navigate('/');
    } catch (error) {
      setError(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

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