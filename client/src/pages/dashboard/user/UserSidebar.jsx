import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import ConfirmModal from '../../../components/ConfirmModal';

const navClass = ({ isActive }) =>
  `flex items-center mx-4 my-1 px-6 py-3 rounded-full transition-all group ${
    isActive
      ? 'bg-gradient-to-r from-[#efbf70] to-[#a77e36] text-[#19120f] visited:text-[#19120f] active:text-[#19120f] font-bold shadow-lg shadow-tertiary/10'
      : 'text-[#e2bfb2] visited:text-[#e2bfb2] hover:bg-[#3c332f] active:text-[#efbf70] focus-visible:text-[#efbf70]'
  }`;

const UserSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const items = [
    { name: 'Home', path: '/dashboard', icon: 'home', end: true },
    { name: 'Rewards', path: '/dashboard/rewards', icon: 'workspace_premium' },
    { name: 'Orders', path: '/dashboard/orders', icon: 'inventory_2' },
    { name: 'Rituals', path: '/dashboard/rituals', icon: 'auto_awesome' },
    { name: 'Settings', path: '/dashboard/settings', icon: 'settings' }
  ];

  return (
    <>
      <aside className="hidden md:flex flex-col h-screen py-8 bg-[#221a17] w-72 left-0 top-0 fixed shadow-2xl shadow-black/20 z-50">
        <div className="px-8 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-tertiary to-on-tertiary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-surface" style={{ fontVariationSettings: "'FILL' 1" }}>fluid</span>
            </div>
            <div>
              <h1 className="font-headline font-black text-xl tracking-tighter text-[#efbf70]">Balpro Life</h1>
              <p className="text-[10px] uppercase tracking-widest text-primary-fixed-dim/60 font-bold">The Liquid Curator</p>
            </div>
          </div>
        </div>

        <nav className="grow space-y-1">
          {items.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.end} className={navClass}>
              <span
                className="material-symbols-outlined mr-4 group-hover:text-tertiary"
                style={item.name === 'Rituals' ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="font-headline text-sm uppercase tracking-widest">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-6 mt-auto space-y-4">
          <div className="p-6 rounded-xl bg-surface-container-high relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-tertiary uppercase tracking-tighter mb-2">Current Tier</p>
              <h4 className="font-headline font-bold text-white mb-4">Elite Artisan</h4>
              <Link to="/products" className="w-full inline-flex items-center justify-center gold-shimmer text-surface font-bold py-3 rounded-full text-xs uppercase tracking-widest hover:scale-105 transition-transform active:scale-95">
                Upgrade Ritual
              </Link>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-8xl">cognition</span>
            </div>
          </div>

          <button
            onClick={() => setConfirmOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-full text-[#e2bfb2] hover:bg-[#3c332f] transition-all"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-headline text-sm uppercase tracking-widest">Logout</span>
          </button>
        </div>
      </aside>

      <ConfirmModal
        open={confirmOpen}
        title="Logout"
        message="Are you sure you want to logout?"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          logout();
          navigate('/');
        }}
      />
    </>
  );
};

export default UserSidebar;
