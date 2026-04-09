import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { readPendingCartAction } from '../utils/pendingCartAction';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const loc = useLocation();

  useEffect(() => {
    // With cookie-based flow the server sets an HttpOnly cookie and redirects here without a token
    // We fetch /api/auth/me with credentials to get the current user and finalize login
    (async () => {
      try {
        const isLocalHost = typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname);
        const envApiBase = import.meta.env.VITE_API_BASE;
        const apiBase = isLocalHost
          ? 'http://localhost:5000'
          : (envApiBase ? envApiBase.replace(/\/$/, '').replace(/\/api$/, '') : '');
        const res = await fetch(`${apiBase.replace(/\/$/, '')}/api/auth/me`, {
          credentials: 'include'
        });
        const data = await res.json();
        if (res.ok && data.data) {
          // login without storing a token (cookie is HttpOnly)
          login(data.data);
          const pendingCartAction = readPendingCartAction();
          if (pendingCartAction?.returnTo) {
            navigate(pendingCartAction.returnTo, { replace: true });
          } else if (data.data.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
        } else {
          navigate('/login');
        }
      } catch (err) {
        console.error('OAuth callback error', err);
        navigate('/login');
      }
    })();
  }, [loc.search]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">Signing you in...</div>
    </div>
  );
};

export default OAuthCallback;
