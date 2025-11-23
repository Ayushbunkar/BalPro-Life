import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, FileText, MapPin, Settings } from 'lucide-react';

const UserSidebar = () => {
  const location = useLocation();
  const items = [
    { name: 'Profile', path: '/dashboard', icon: User },
    { name: 'My Orders', path: '/dashboard/orders', icon: FileText },
    { name: 'Addresses', path: '/dashboard/addresses', icon: MapPin },
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
    </nav>
  );
};

export default UserSidebar;
