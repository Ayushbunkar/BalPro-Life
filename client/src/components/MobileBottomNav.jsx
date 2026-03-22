import React from 'react';

const MobileBottomNav = () => {
  return (
    <nav className="fixed bottom-0 w-full z-50 rounded-t-3xl md:hidden bg-[#19120f]/90 backdrop-blur-2xl border-t border-[#4f4440]/20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <div className="flex justify-around items-center h-20 pb-safe px-6">
        <div className="flex flex-col items-center justify-center text-[#efbf70] bg-[#3c332f] rounded-full py-2 px-4 transition-transform active:scale-90">
          <span className="material-symbols-outlined">local_mall</span>
          <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Shop</span>
        </div>
        <div className="flex flex-col items-center justify-center text-[#e2bfb2]/50 py-2 px-4 transition-transform active:scale-90">
          <span className="material-symbols-outlined">auto_awesome</span>
          <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Benefits</span>
        </div>
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
