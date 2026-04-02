import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import ConfirmModal from '../../../components/ConfirmModal';

const navClass = ({ isActive }) =>
  `flex items-center px-4 py-3 rounded-full transition-all group ${
    isActive
      ? 'bg-gradient-to-r from-[#efbf70] to-[#a77e36] text-[#19120f] visited:text-[#19120f] active:text-[#19120f] font-bold shadow-lg shadow-tertiary/10'
      : 'text-[#e2bfb2] visited:text-[#e2bfb2] hover:bg-[#3c332f] active:text-[#efbf70] focus-visible:text-[#efbf70]'
  }`;

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const items = [
    { name: 'Overview', path: '/admin', icon: 'space_dashboard', end: true },
    { name: 'Users', path: '/admin/users', icon: 'group' },
    { name: 'Products', path: '/admin/products', icon: 'inventory_2' },
    { name: 'Orders', path: '/admin/orders', icon: 'receipt_long' },
    { name: 'Analytics', path: '/admin/analytics', icon: 'analytics' },
    { name: 'Settings', path: '/admin/settings', icon: 'settings' }
  ];

  return (
    <nav className="bg-[#221a17] p-4 rounded-2xl shadow-2xl shadow-black/20 text-[#efdfd9]">
      <div className="px-2 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-tertiary to-on-tertiary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-surface" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
          </div>
          <div>
            <h3 className="font-headline font-black text-base tracking-tight text-[#efbf70]">Admin Panel</h3>
            <p className="text-[10px] uppercase tracking-widest text-primary-fixed-dim/60 font-bold">Control Center</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <NavLink key={item.path} to={item.path} end={item.end} className={navClass}>
            <span className="material-symbols-outlined mr-3 group-hover:text-tertiary">{item.icon}</span>
            <span className="font-headline text-xs uppercase tracking-widest">{item.name}</span>
          </NavLink>
        ))}
      </div>

      <div className="pt-4 border-t mt-6" style={{ borderColor: '#4f4440' }}>
        <button
          onClick={() => setConfirmOpen(true)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-full text-[#e2bfb2] hover:bg-[#3c332f] transition-all"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="font-headline text-xs uppercase tracking-widest">Logout</span>
        </button>
      </div>

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
    </nav>
  );
};

export default AdminSidebar;
