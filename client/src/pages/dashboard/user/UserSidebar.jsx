import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, FileText, MapPin, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import ConfirmModal from '../../../components/ConfirmModal';

const UserSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const items = [
    { name: 'Profile', path: '/dashboard', icon: User },
    { name: 'My Orders', path: '/dashboard/orders', icon: FileText },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings }
  ];

  return (
    <nav className="bg-white p-4 rounded-lg shadow">
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.name}>
            <Link to={it.path} className={`flex items-center gap-3 p-3 rounded-md ${location.pathname === it.path ? 'bg-green-50 text-green-700 font-bold' : 'text-slate-700 hover:bg-slate-50'}`}>
              <it.icon size={16} />
              <span className="text-sm">{it.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="pt-4 border-t mt-4" style={{borderColor: '#EAD8C0'}}>
        <button
          onClick={() => setConfirmOpen(true)}
          className="w-full flex items-center gap-3 p-3 rounded-md text-slate-700 hover:bg-slate-50"
        >
          <LogOut size={16} />
          <span className="text-sm">Logout</span>
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

export default UserSidebar;
