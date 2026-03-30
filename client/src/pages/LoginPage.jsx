import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { authAPI } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import { getGoogleSignInPreflightWarning, requestGoogleIdToken } from '../utils/googleIdentity';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const googlePreflightWarning = getGoogleSignInPreflightWarning({
    clientId: googleClientId,
    allowedOriginsCsv: import.meta.env.VITE_GOOGLE_ALLOWED_ORIGINS,
  });

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

  const handleGoogleSignIn = async () => {
    setError('');
    setGoogleLoading(true);

    try {
      const idToken = await requestGoogleIdToken(googleClientId);
      const response = await authAPI.oauth({ provider: 'google', idToken });
      login(response.data.user, response.data.token);

      if (response.data.user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (googleError) {
      setError(googleError.message || 'Google sign-in failed');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-surface font-body text-on-surface selection:bg-tertiary/30">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-r from-surface via-surface/80 to-transparent z-10"></div>
        <img
          className="w-full h-full object-cover object-[center_72%] opacity-40 scale-100"
          alt="Cinematic dark chocolate backdrop"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0swvhU1L7zYH3rqw-SCEFpjXIjj7iZSWFfdbrvJZ53KCriAraohYZskbn2UcBW9GKcQtZnnUx-e223JUftL5aY5MhWOXMVOr9rGvQOzpyhiBd66Aa2QwPpvurMCFwz_5kP_BWM9WbcUUpeeCKq6mgKFIYGi9MJ_7wAOKv7csezbmvoJo4IFWCXIEc4VwkyI1bnW2sBQAW9WcaAM5HtPfHlJseyEGF57O0bia3a9XuKoP4PhYgExoh17WUq5IJmN_d4lc8uuZn1Q"
        />
      </div>

      <section className="relative z-20 w-full max-w-[1200px] px-6 py-12 flex flex-col md:flex-row items-center gap-16">
        <div className="hidden md:block flex-1 space-y-8">
          <div className="inline-block px-4 py-1 rounded-full bg-tertiary-container border border-tertiary/20 text-tertiary text-xs font-bold tracking-widest uppercase">
            The Liquid Curator
          </div>

          <h1 className="font-headline text-6xl lg:text-7xl font-extrabold text-on-surface leading-[1.1] tracking-tighter">
            Indulgence <br />
            <span className="text-tertiary [text-shadow:0_0_20px_rgba(239,191,112,0.3)]">Refined.</span>
          </h1>

          <p className="text-primary-fixed-dim text-lg max-w-md leading-relaxed">
            Access your personalized wellness journey and track your functional cacao rituals. Elevate every sip.
          </p>

          <div className="flex gap-6 items-center pt-4">
            <div className="flex -space-x-4">
              <img
                className="w-12 h-12 rounded-full border-2 border-surface object-cover"
                alt="Member avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuABzpmjCpYOc2BsaVOaYfzSGtmIkCwdzCmNNMI37Q1jMznPG-p74Z6LjCDy_cG58-HIfUkZu6jq-WNOLVeV8Hm9v6cpFzeWOXVlvFAPtbet1xCsIPbqMXIfshydeml-CIK5ktExPlYotRh_drLqqSa7xcH-esjJutcDoR-889rd-VDRjIaY8Rce8wsUDXDosSk75VA1C8mPE8P0FbZWPLybNhY8Q72uTRt7e5fNvieY5Lvs6znTpjrw6cVr6vebsEOqWrUjOpRlGg"
              />
              <img
                className="w-12 h-12 rounded-full border-2 border-surface object-cover"
                alt="Member avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyaTDbFAReWp8vs1e1A2PGwu0c31C7umWAdAUBxx9VrJSIosM7xdPFc_Mmw19DA8dQ-f2fJlxZzhUslfNrwxfhKY8BkXlwP9J9qM6zilsCpbLhZ7vgUALfwyMrYraHLBVO4C3s3iO0bvxzm4Ax8p1IT3Zj7YgaYSrLQSTGxPn1Uz5KGoaSw9kmvLJvQuvi8CakDYSi8zv33uKZvp2yGqAU5qV3vyVUqSAnmYnHuZAtxAko7H36-aE8AQD0b7AznvOhMmhvJTGPkw"
              />
              <div className="w-12 h-12 rounded-full border-2 border-surface bg-surface-container-highest flex items-center justify-center text-[10px] font-bold text-tertiary">
                12K+
              </div>
            </div>

            <span className="text-sm text-on-surface-variant font-medium">Joined the Cacao Revolution</span>
          </div>
        </div>

        <div className="w-full max-w-md">
          <div className="bg-[rgba(34,26,23,0.7)] backdrop-blur-3xl p-10 md:p-12 rounded-xl shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-outline-variant/10">
            <header className="mb-10 text-center md:text-left">
              <h2 className="font-headline text-3xl font-bold text-on-surface mb-2">Welcome Back</h2>
              <p className="text-on-surface-variant">Enter your credentials to continue.</p>
            </header>

            {error && (
              <div className="mb-6 rounded-lg border border-error/40 bg-error/10 px-4 py-3 text-sm text-error">
                {error}
              </div>
            )}

            {googlePreflightWarning && (
              <div className="mb-6 rounded-lg border border-yellow-400/40 bg-yellow-400/10 px-4 py-3 text-sm text-yellow-100">
                {googlePreflightWarning}
              </div>
            )}

            <div className="mb-8">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-full border border-outline-variant/30 hover:bg-surface-container-highest transition-all duration-300 group disabled:opacity-70"
              >
                <img
                  src="https://www.gstatic.com/images/branding/product/1x/googleg_32dp.png"
                  alt="Google"
                  className="w-5 h-5 object-contain"
                />
                <span className="text-sm font-semibold">{googleLoading ? 'Connecting Google...' : 'Continue with Google'}</span>
              </button>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-tertiary/80 ml-1" htmlFor="email">
                  Email Address
                </label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-4 flex items-center material-symbols-outlined text-outline group-focus-within:text-tertiary transition-colors pointer-events-none">
                    mail
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="curator@balpro.life"
                    className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-tertiary/50 rounded-lg py-4 pl-12 pr-4 text-on-surface placeholder:text-outline/70 transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="block text-xs font-bold uppercase tracking-widest text-tertiary/80" htmlFor="password">
                    Password
                  </label>
                  <a className="text-xs font-semibold text-primary hover:text-tertiary transition-colors" href="#">
                    Forgot Password?
                  </a>
                </div>

                <div className="relative group">
                  <span className="absolute inset-y-0 left-4 flex items-center material-symbols-outlined text-outline group-focus-within:text-tertiary transition-colors pointer-events-none">
                    lock
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="........"
                    className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-tertiary/50 rounded-lg py-4 pl-12 pr-12 text-on-surface placeholder:text-outline/70 transition-all outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-outline hover:text-on-surface transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center px-1">
                <label className="flex items-center cursor-pointer group">
                  <div className="relative">
                    <input
                      className="peer sr-only"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <div className="w-5 h-5 bg-surface-container-lowest border border-outline-variant/30 rounded-md peer-checked:bg-tertiary peer-checked:border-tertiary transition-all"></div>
                    <span
                      className="material-symbols-outlined absolute inset-0 text-on-tertiary text-[14px] flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity"
                      style={{ fontVariationSettings: "'wght' 700" }}
                    >
                      check
                    </span>
                  </div>
                  <span className="ml-3 text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Remember Me</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] hover:scale-[1.02] active:scale-95 py-5 rounded-full text-on-tertiary font-bold tracking-widest uppercase text-sm shadow-[0_20px_40px_rgba(239,191,112,0.2)] transition-all duration-300 overflow-hidden relative group disabled:opacity-70 disabled:hover:scale-100"
              >
                <span className="relative z-10">{loading ? 'Signing in...' : 'Login'}</span>
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
              </button>

              <div className="pt-6 text-center">
                <p className="text-on-surface-variant text-sm">
                  Don&apos;t have an account?
                  <Link className="text-tertiary font-bold hover:underline underline-offset-4 ml-1" to="/register">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>

        </div>
      </section>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-tertiary/5 blur-[120px] rounded-full -mb-64 -mr-32 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-primary/5 blur-[100px] rounded-full -mt-32 -ml-16 pointer-events-none"></div>
    </main>
  );
};

export default LoginPage;
