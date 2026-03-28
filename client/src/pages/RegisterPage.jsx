import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if ((name === 'password' || name === 'confirmPassword') && error === 'Passwords do not match') {
      const nextPassword = name === 'password' ? value : formData.password;
      const nextConfirm = name === 'confirmPassword' ? value : formData.confirmPassword;
      if (nextPassword === nextConfirm) setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    const email = formData.email ? formData.email.trim().toLowerCase() : '';

    if (!formData.name.trim()) {
      setError('Please provide your full name');
      setLoading(false);
      return;
    }

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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!acceptedTerms) {
      setError('Please accept the terms to continue');
      setLoading(false);
      return;
    }

    try {
      await authAPI.register({
        name: formData.name.trim(),
        email,
        password: formData.password,
      });

      try {
        const loginRes = await authAPI.login({ email, password: formData.password });
        login(loginRes.data.user, loginRes.data.token);

        if (loginRes.data.user?.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } catch (autoLoginError) {
        navigate('/login');
      }
    } catch (registerError) {
      setError(registerError.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const googleAuthUrl = `${import.meta.env.VITE_API_BASE || 'http://localhost:4500'}/api/auth/google`;

  return (
    <main className="min-h-screen flex items-center justify-center p-6 md:p-12 bg-surface text-on-surface font-body selection:bg-tertiary selection:text-on-tertiary antialiased relative overflow-hidden bg-[radial-gradient(circle_at_20%_30%,#2b1810_0%,#19120f_100%)]">
      <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-2/5 h-2/5 bg-tertiary/5 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 bg-surface-container-low rounded-xl shadow-2xl overflow-hidden relative z-10 border border-outline-variant/10">
        <div className="hidden lg:flex flex-col justify-between p-16 bg-surface-container relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-tertiary font-headline tracking-[0.2em] text-xs uppercase mb-4 block">Velvet Cocoa Monolith</span>
            <h1 className="font-headline text-5xl font-extrabold text-on-surface leading-tight tracking-tighter">
              Indulgence is <br />
              <span className="text-tertiary">Functional.</span>
            </h1>
            <p className="mt-6 text-on-surface-variant text-lg leading-relaxed max-w-md">
              Join the Inner Circle and gain access to limited batches, artisanal recipes, and a community of the liquid-curated.
            </p>
          </div>

          <div className="relative mt-12 aspect-4/5 w-full max-w-sm mx-auto">
            <img
              alt="Premium chocolate beverage in minimalist designer packaging"
              className="w-full h-full object-cover rounded-lg shadow-2xl"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGoTH25YQTnNz5ruyjPdrGyi1pxJLZGclL4czA8WsCtQdS5suVPUTsuOPpLjXKw6XvP5pJaHJJ6tD_p56jWgsGmudoYjGHWj06PAAnSUcjNgcoAf435Cm2BrzIoh7Lqq-N4_719jFV6i-5MnggdBrKvIGg5pAbNpZQ6_9351C22e1ai5hloP9bFC-lEJ-0664p3wh7hmhtLRlvOUHbUxPgZ73FqJ5hSZ0mtSI30tQ6qBieZCKQeCO9xwNdiauQfqhs9dxpWH8-FQ"
            />

            <div className="absolute -bottom-8 -right-8 bg-[rgba(34,26,23,0.6)] backdrop-blur-3xl p-6 rounded-lg border border-outline-variant/20 max-w-[200px]">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <span className="text-sm font-bold text-on-surface uppercase tracking-wider">Purity</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Single-origin organic cacao infused with ceremonial grade ashwagandha.
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-12">
            <p className="text-on-surface-variant font-headline font-bold text-2xl tracking-tighter opacity-30">BALPRO LIFE</p>
          </div>
        </div>

        <div className="p-8 md:p-16 lg:p-20 flex flex-col justify-center bg-[rgba(34,26,23,0.6)] backdrop-blur-3xl">
          <div className="mb-10">
            <h2 className="font-headline text-3xl font-bold text-on-surface tracking-tight mb-2">Join the Inner Circle</h2>
            <p className="text-on-surface-variant">Step into the realm of liquid luxury.</p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg border border-error/40 bg-error/10 px-4 py-3 text-sm text-error">
              {error}
            </div>
          )}

          <div className="mb-8">
            <a
              href={googleAuthUrl}
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-full border border-outline-variant/30 hover:bg-surface-container-highest transition-all duration-300 group"
            >
              <img
                src="https://www.gstatic.com/images/branding/product/1x/googleg_32dp.png"
                alt="Google"
                className="w-5 h-5 object-contain"
              />
              <span className="text-sm font-semibold">Google</span>
            </a>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-outline-variant/20"></div>
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Or with email</span>
            <div className="h-px flex-1 bg-outline-variant/20"></div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-tertiary ml-1">Full Name</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-4 flex items-center material-symbols-outlined leading-none text-on-surface-variant group-focus-within:text-tertiary transition-colors text-xl pointer-events-none">person</span>
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-12 pr-4 text-[#1a120f] font-semibold placeholder:text-[#756963] placeholder:font-medium focus:ring-2 focus:ring-tertiary/20 transition-all outline-none"
                  placeholder="Julian Vane"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-tertiary ml-1">Email Address</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-4 flex items-center material-symbols-outlined leading-none text-on-surface-variant group-focus-within:text-tertiary transition-colors text-xl pointer-events-none">mail</span>
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-12 pr-4 text-[#1a120f] font-semibold placeholder:text-[#756963] placeholder:font-medium focus:ring-2 focus:ring-tertiary/20 transition-all outline-none"
                  placeholder="julian@luxury.com"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-tertiary ml-1">Password</label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-4 flex items-center material-symbols-outlined leading-none text-on-surface-variant group-focus-within:text-tertiary transition-colors text-xl pointer-events-none">lock</span>
                  <input
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-12 pr-4 text-[#1a120f] font-semibold placeholder:text-[#756963] placeholder:font-medium focus:ring-2 focus:ring-tertiary/20 transition-all outline-none"
                    placeholder="••••••••"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-tertiary ml-1">Confirm</label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-4 flex items-center material-symbols-outlined leading-none text-on-surface-variant group-focus-within:text-tertiary transition-colors text-xl pointer-events-none">verified_user</span>
                  <input
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-12 pr-4 text-[#1a120f] font-semibold placeholder:text-[#756963] placeholder:font-medium focus:ring-2 focus:ring-tertiary/20 transition-all outline-none"
                    placeholder="••••••••"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 py-2">
              <input
                className="mt-1 rounded border-outline-variant/30 bg-surface-container-highest text-tertiary focus:ring-tertiary focus:ring-offset-surface"
                id="terms"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              <label className="text-xs text-on-surface-variant leading-relaxed" htmlFor="terms">
                I agree to the <a className="text-tertiary hover:underline" href="#">Terms of Indulgence</a> and acknowledge the <a className="text-tertiary hover:underline" href="#">Privacy Policy</a>.
              </label>
            </div>

            <button
              className="w-full bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] text-on-tertiary font-bold py-5 rounded-full shadow-lg shadow-tertiary/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group mt-4"
              type="submit"
              disabled={loading}
            >
              <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
              <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-on-surface-variant text-sm">
              Already a member?
              <Link className="text-tertiary font-bold hover:underline transition-all ml-2" to="/login">
                Login instead
              </Link>
            </p>
          </div>
        </div>
      </div>

    </main>
  );
};

export default RegisterPage;
