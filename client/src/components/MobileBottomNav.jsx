import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const MobileBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [accountSheetOpen, setAccountSheetOpen] = useState(false);

  const dashboardPath = user?.role === 'admin' ? '/admin' : '/dashboard';

  useEffect(() => {
    setAccountSheetOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setAccountSheetOpen(false);
    navigate('/');
  };

  return (
    <>
    {accountSheetOpen && (
      <div className="fixed inset-0 z-45 md:hidden" onClick={() => setAccountSheetOpen(false)}>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
    )}

    {accountSheetOpen && (
      <div className="fixed bottom-24 left-4 right-4 z-55 md:hidden rounded-2xl border border-[#4f4440]/30 bg-[#19120f]/95 backdrop-blur-xl p-3 shadow-xl">
        {!isAuthenticated ? (
          <>
            <button
              type="button"
              className="w-full text-left px-4 py-3 rounded-xl text-[#efbf70] font-semibold hover:bg-[#3c332f]/70"
              onClick={() => {
                setAccountSheetOpen(false);
                navigate('/register');
              }}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="w-full text-left px-4 py-3 rounded-xl text-[#e2bfb2] hover:bg-[#3c332f]/70"
              onClick={() => {
                setAccountSheetOpen(false);
                navigate('/login');
              }}
            >
              Login
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="w-full text-left px-4 py-3 rounded-xl text-[#efbf70] font-semibold hover:bg-[#3c332f]/70"
              onClick={() => {
                setAccountSheetOpen(false);
                navigate(dashboardPath);
              }}
            >
              Dashboard
            </button>
            <button
              type="button"
              className="w-full text-left px-4 py-3 rounded-xl text-[#e2bfb2] hover:bg-[#3c332f]/70"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    )}

    <nav className="fixed bottom-0 w-full z-50 rounded-t-3xl md:hidden bg-[#19120f]/90 backdrop-blur-2xl border-t border-[#4f4440]/20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <div className="flex justify-around items-center h-20 pb-safe px-6">
        <Link to="/" className={`flex flex-col items-center justify-center py-2 px-4 transition-transform active:scale-90 ${location.pathname === '/' ? 'text-[#efbf70] bg-[#3c332f] rounded-full' : 'text-[#e2bfb2]/50'}`}>
          <span className="material-symbols-outlined">local_mall</span>
          <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Shop</span>
        </Link>
        <Link to="/about" className={`flex flex-col items-center justify-center py-2 px-4 transition-transform active:scale-90 ${location.pathname === '/about' ? 'text-[#efbf70] bg-[#3c332f] rounded-full' : 'text-[#e2bfb2]/50'}`}>
          <span className="material-symbols-outlined">auto_awesome</span>
          <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">About</span>
        </Link>
        <Link to="/enter-code" className={`flex flex-col items-center justify-center py-2 px-4 transition-transform active:scale-90 ${location.pathname === '/enter-code' || location.pathname === '/play-game' ? 'text-[#efbf70] bg-[#3c332f] rounded-full' : 'text-[#e2bfb2]/50'}`}>
          <span className="material-symbols-outlined">casino</span>
          <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Play</span>
        </Link>
        <button
          type="button"
          className={`flex flex-col items-center justify-center py-2 px-4 transition-transform active:scale-90 ${accountSheetOpen || location.pathname === '/login' || location.pathname === '/register' || location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin') ? 'text-[#efbf70] bg-[#3c332f] rounded-full' : 'text-[#e2bfb2]/50'}`}
          onClick={() => setAccountSheetOpen((prev) => !prev)}
        >
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Account</span>
        </button>
      </div>
    </nav>
    </>
  );
};

export default MobileBottomNav;
