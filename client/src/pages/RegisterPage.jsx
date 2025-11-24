import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { authAPI } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear password mismatch error when passwords match
    if ((name === 'password' || name === 'confirmPassword') && error === 'Passwords do not match') {
      if (name === 'password' && value === formData.confirmPassword) {
        setError('');
      } else if (name === 'confirmPassword' && value === formData.password) {
        setError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Client-side validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    const email = formData.email ? formData.email.trim().toLowerCase() : '';
    if (!emailRegex.test(email)) {
      setError('Please provide a valid email address');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const data = await authAPI.register({
        name: formData.name.trim(),
        email,
        password: formData.password,
        phone: formData.phone ? formData.phone.trim() : ''
      });
      // Auto-login after successful registration
      try {
        const loginRes = await authAPI.login({ email, password: formData.password });
        login(loginRes.data.user, loginRes.data.token);
        // Navigate to the appropriate dashboard
        if (loginRes.data.user?.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } catch (err) {
        // If auto-login fails, fall back to showing success and redirecting to login
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setError(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto space-y-8 text-center">
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
            <h3 className="text-lg font-medium mb-2">Registration Successful!</h3>
            <p className="text-sm">Your account has been created. Redirecting to login page...</p>
          </div>
          <Link to="/" className="inline-flex items-center gap-2">
            <img src="/logo.png" alt="BalPro Life" className="w-8 h-8" />
            <span className="text-2xl font-black text-slate-900">BalPro Life</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div className="text-center">
         
          <h2 className="text-3xl font-black text-slate-900">Create your account</h2>
          <p className="mt-2 text-slate-600">Join the BalPro Life community</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <InputField
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              icon={User}
              placeholder="Enter your full name"
            />

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

            <InputField
              label="Phone Number (Optional)"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              icon={Phone}
              placeholder="Enter your phone number"
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
                placeholder="Create a password"
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-slate-400 hover:text-slate-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative">
              <InputField
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                icon={Lock}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-slate-400 hover:text-slate-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </Button>

          <div className="text-center">
            <span className="text-slate-600">Already have an account? </span>
            <Link to="/login" className="text-orange-600 hover:text-orange-500 font-medium">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;