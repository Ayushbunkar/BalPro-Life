import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const loc = useLocation();

  useEffect(() => {
    // With cookie-based flow the server sets an HttpOnly cookie and redirects here without a token
    // We fetch /api/auth/me with credentials to get the current user and finalize login
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:4500'}/api/auth/me`, {
          credentials: 'include'
        });
        const data = await res.json();
        if (res.ok && data.data) {
          // login without storing a token (cookie is HttpOnly)
          login(data.data);
          if (data.data.role === 'admin') navigate('/admin'); else navigate('/dashboard');
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
