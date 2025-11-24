import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logo.png';

const Navbar = ({ cartCount, onCartClick, mobileMenuOpen, setMobileMenuOpen }) => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <nav className="fixed w-full z-40 backdrop-blur-lg border-b transition-all" style={{backgroundColor: 'rgba(248, 242, 233, 0.9)', borderColor: '#EAD8C0'}}>
      <div className="content-container">
        <div className="flex justify-between items-center h-24">
          <Link to="/" className="shrink-0 flex items-center gap-3 cursor-pointer">
            <img src={logo} alt="BalPro Life" className="w-20 h-20 object-contain" />
            <div className="flex flex-col leading-none">
              <span className="font-black text-2xl tracking-tighter" style={{color: '#7B4A22'}}>BalPro Life</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-xs font-bold uppercase tracking-widest transition-colors relative group ${
                  location.pathname === item.path ? 'text-[#1D6B3A]' : 'text-[#7B4A22] opacity-70'
                }`}
                onMouseEnter={(e) => e.target.style.color = '#1D6B3A'}
                onMouseLeave={(e) => e.target.style.color = location.pathname === item.path ? '#1D6B3A' : '#7B4A22'}
              >
                {item.name}
                <span className={`absolute -bottom-2 left-0 w-0 h-0.5 transition-all group-hover:w-full ${
                  location.pathname === item.path ? 'w-full' : ''
                }`} style={{backgroundColor: '#1D6B3A'}}></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2" style={{color: '#7B4A22'}}>
                    <User size={16} />
                    <span className="text-sm font-medium">Hi, {user?.name?.split(' ')[0]}</span>
                  </div>
                  <Link
                    to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                    className="text-xs font-bold uppercase tracking-widest px-3 py-2 border rounded-md flex items-center gap-1 transition-colors"
                    style={{color: '#7B4A22', borderColor: '#EAD8C0'}}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#1D6B3A';
                      e.target.style.borderColor = '#1D6B3A';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#7B4A22';
                      e.target.style.borderColor = '#EAD8C0';
                    }}
                  >
                    Dashboard
                  </Link>
                  {/* Logout moved to dashboard sidebar */}
                </div>
              ) : (
                <>
                  <Link to="/login" className="text-xs font-bold uppercase tracking-widest px-3 py-2 border rounded-md transition-colors" style={{color: '#7B4A22', borderColor: '#EAD8C0'}} onMouseEnter={(e) => {e.target.style.color = '#1D6B3A'; e.target.style.borderColor = '#1D6B3A';}} onMouseLeave={(e) => {e.target.style.color = '#7B4A22'; e.target.style.borderColor = '#EAD8C0';}}>
                    Login
                  </Link>
                  <Link to="/register" className="text-xs font-bold uppercase tracking-widest px-3 py-2 rounded-md transition-colors" style={{backgroundColor: '#1D6B3A', color: 'white'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#4FAF5A'} onMouseLeave={(e) => e.target.style.backgroundColor = '#1D6B3A'}>
                    Register
                  </Link>
                </>
              )}
            </div>
            <button
              className="relative group"
              onClick={onCartClick}
            >
              <ShoppingCart size={24} className="transition-colors" style={{color: '#7B4A22'}} onMouseEnter={(e) => e.target.style.color = '#1D6B3A'} onMouseLeave={(e) => e.target.style.color = '#7B4A22'} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white" style={{backgroundColor: '#1D6B3A'}}>
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20" onClick={() => setMobileMenuOpen(false)} />
          <div className="md:hidden fixed inset-0 top-24 z-30 p-8 flex flex-col space-y-8 animate-in slide-in-from-right-10" style={{backgroundColor: '#F8F2E9'}}>
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-3xl font-black uppercase tracking-tight text-left`}
                style={{color: location.pathname === item.path ? '#1D6B3A' : '#7B4A22'}}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-4 pt-8 border-t" style={{borderColor: '#EAD8C0'}}>
              {isAuthenticated ? (
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b" style={{color: '#7B4A22', borderColor: '#EAD8C0'}}>
                    <User size={20} />
                    <div>
                      <p className="text-lg font-bold">{user?.name}</p>
                      <p className="text-sm" style={{color: '#7B4A22', opacity: 0.7}}>{user?.email}</p>
                    </div>
                  </div>
                  <Link
                    to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-black px-6 py-3 rounded-lg uppercase tracking-tight text-left transition-colors flex items-center gap-2"
                    style={{backgroundColor: '#1D6B3A', color: 'white'}}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#4FAF5A'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#1D6B3A'}
                  >
                    <User size={20} />
                    Dashboard
                  </Link>
                  {/* Logout moved to dashboard sidebar */}
                </div>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-black uppercase tracking-tight text-left transition-colors" style={{color: '#7B4A22'}} onMouseEnter={(e) => e.target.style.color = '#1D6B3A'} onMouseLeave={(e) => e.target.style.color = '#7B4A22'}>
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-black px-6 py-3 rounded-lg uppercase tracking-tight text-left transition-colors" style={{backgroundColor: '#1D6B3A', color: 'white'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#4FAF5A'} onMouseLeave={(e) => e.target.style.backgroundColor = '#1D6B3A'}>
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;