import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, PackageCheck, FileText, Settings } from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  const items = [
    { name: 'Overview', path: '/admin', icon: Home },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Products', path: '/admin/products', icon: PackageCheck },
    { name: 'Orders', path: '/admin/orders', icon: FileText },
    { name: 'Settings', path: '/admin/settings', icon: Settings }
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

export default AdminSidebar;
