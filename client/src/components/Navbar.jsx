import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = ({ cartCount, onCartClick, mobileMenuOpen, setMobileMenuOpen }) => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const navItems = [
    { name: 'Collections', href: '#collections' },
    { name: 'Our Story', href: '#story' },
    { name: 'Wellness', href: '#wellness' },
    { name: 'Journal', href: '#journal' }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl transition-all" style={{backgroundColor: 'rgba(10, 8, 7, 0.6)', boxShadow: '0 0 40px rgba(0, 0, 0, 0.5)'}}>
      <div className="flex justify-between items-center px-10 py-6 w-full max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link to="/" className="text-2xl font-black tracking-tighter text-[#efbf70] italic" style={{fontFamily: 'Epilogue'}}>
          BALPRO LIFE
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="font-bold uppercase text-xs tracking-[-0.02em] text-[#e8e1de] opacity-80 hover:opacity-100 hover:text-[#efbf70] transition-all duration-400 ease-out"
              style={{fontFamily: 'Epilogue'}}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Right Side Icons & Buttons */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-[#efbf70]">
            <ShoppingCart
              size={20}
              className="cursor-pointer hover:scale-95 duration-300"
              onClick={onCartClick}
            />
            {cartCount > 0 && (
              <span className="absolute ml-3 -mt-6 h-5 w-5 text-white text-[10px] font-bold flex items-center justify-center rounded-full" style={{backgroundColor: '#efbf70', color: '#432c00'}}>
                {cartCount}
              </span>
            )}
            <User size={20} className="cursor-pointer hover:scale-95 duration-300" />
          </div>
          
          <button
            className="bg-[#efbf70] text-[#432c00] font-bold text-[10px] tracking-widest uppercase py-3 px-8 rounded-xl hover:scale-95 duration-300 active:scale-90"
            style={{fontFamily: 'Epilogue'}}
            onClick={() => {
              if (isAuthenticated) {
                window.location.href = user?.role === 'admin' ? '/admin' : '/dashboard';
              } else {
                window.location.href = '/login';
              }
            }}
          >
            {isAuthenticated ? 'Dashboard' : 'Shop Now'}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#efbf70]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 z-40 p-8 flex flex-col space-y-6 backdrop-blur-md" style={{backgroundColor: 'rgba(10, 8, 7, 0.95)'}}>
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-bold uppercase text-lg tracking-tighter text-[#efbf70]"
              style={{fontFamily: 'Epilogue'}}
            >
              {item.name}
            </a>
          ))}
          <div className="pt-6 border-t border-[#efbf70]/20 flex flex-col gap-4">
            <Link
              to="/login"
              className="font-bold uppercase text-sm text-[#efbf70]"
              style={{fontFamily: 'Epilogue'}}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="font-bold uppercase text-sm px-6 py-3 rounded-lg text-center"
              style={{backgroundColor: '#efbf70', color: '#432c00', fontFamily: 'Epilogue'}}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;