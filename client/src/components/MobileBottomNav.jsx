import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileBottomNav = () => {
  const location = useLocation();

  return (
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
        <div className="flex flex-col items-center justify-center text-[#e2bfb2]/50 py-2 px-4 transition-transform active:scale-90">
          <span className="material-symbols-outlined">shopping_cart</span>
          <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Cart</span>
        </div>
        <div className="flex flex-col items-center justify-center text-[#e2bfb2]/50 py-2 px-4 transition-transform active:scale-90">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Account</span>
        </div>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
