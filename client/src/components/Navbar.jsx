import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = ({ cartCount, mobileMenuOpen, setMobileMenuOpen }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const dashboardPath = user?.role === 'admin' ? '/admin' : '/dashboard';

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-xl dark:bg-[#19120f]/80 transition-all duration-500 ease-in-out">
      <div className="flex justify-between items-center px-8 py-6 max-w-[1440px] mx-auto w-full">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tighter text-[#efbf70] font-['Epilogue'] cursor-pointer transition-transform active:scale-95">
          BALPRO LIFE
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-12 items-center">
          <Link to="/products" className="text-[#efbf70] font-semibold border-b border-[#efbf70]/30 font-['Epilogue'] tracking-tight hover:scale-105 duration-300">Products</Link>
          <Link to="/ingredients" className="text-[#e2bfb2] hover:text-[#efbf70] transition-colors font-['Epilogue'] tracking-tight hover:scale-105 duration-300">Ingredients</Link>
          <Link to="/why-choose-us" className="text-[#e2bfb2] hover:text-[#efbf70] transition-colors font-['Epilogue'] tracking-tight hover:scale-105 duration-300">Why Choose Us</Link>
          <Link to="/about" className="text-[#e2bfb2] hover:text-[#efbf70] transition-colors font-['Epilogue'] tracking-tight hover:scale-105 duration-300">About Us</Link>
          <Link to="/contact" className="text-[#e2bfb2] hover:text-[#efbf70] transition-colors font-['Epilogue'] tracking-tight hover:scale-105 duration-300">Contact Us</Link>
          <Link to="/win-free-drink" className="ml-4 px-6 py-2 gold-shimmer text-[#432c00] font-bold rounded-lg font-['Epilogue'] hover:scale-105 transition-all duration-300 active:scale-95 shadow-lg">
            Win Free Drink
          </Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-6 text-[#efbf70]">
          <div className="relative">
            <Link to="/cart" aria-label="Open cart" className="block transition-transform active:scale-95 hover:scale-105">
              <ShoppingCart size={20} className="cursor-pointer" />
            </Link>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#efbf70] text-[#432c00] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          {!isAuthenticated && (
            <div className="hidden md:flex items-center gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-lg border border-[#efbf70]/40 text-[#efbf70] font-semibold hover:bg-[#3c332f]/70 transition-colors"
                onClick={() => navigate('/register')}
              >
                Sign Up
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-lg border border-[#4f4440]/40 text-[#e2bfb2] hover:bg-[#3c332f]/70 transition-colors"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
            </div>
          )}
          {isAuthenticated && (
            <button
              type="button"
              className="cursor-pointer transition-transform active:scale-95 hover:scale-105"
              onClick={() => navigate(dashboardPath)}
              aria-label="Go to dashboard"
            >
              <User size={20} />
            </button>
          )}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#19120f]/95 backdrop-blur-xl p-6 space-y-4">
          <Link to="/products" className="block text-[#efbf70] font-['Epilogue']" onClick={() => setMobileMenuOpen(false)}>Products</Link>
          <Link to="/ingredients" className="block text-[#e2bfb2] hover:text-[#efbf70]" onClick={() => setMobileMenuOpen(false)}>Ingredients</Link>
          <Link to="/why-choose-us" className="block text-[#e2bfb2] hover:text-[#efbf70]" onClick={() => setMobileMenuOpen(false)}>Why Choose Us</Link>
          <Link to="/about" className="block text-[#e2bfb2] hover:text-[#efbf70]" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
          <Link to="/contact" className="block text-[#e2bfb2] hover:text-[#efbf70]" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
          <Link to="/win-free-drink" className="w-full mt-4 px-6 py-2 gold-shimmer text-[#432c00] font-bold rounded-lg font-['Epilogue'] hover:scale-105 transition-all duration-300 active:scale-95 shadow-lg block text-center" onClick={() => setMobileMenuOpen(false)}>
            Win Free Drink
          </Link>

          {!isAuthenticated ? (
            <>
              <button
                type="button"
                className="block w-full mt-2 px-6 py-2 rounded-lg border border-[#efbf70]/40 text-[#efbf70] text-left"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/register');
                }}
              >
                Sign Up
              </button>
              <button
                type="button"
                className="block w-full px-6 py-2 rounded-lg border border-[#4f4440]/40 text-[#e2bfb2] text-left"
                onClick={() => {
                  setMobileMenuOpen(false);
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
                className="block w-full mt-2 px-6 py-2 rounded-lg border border-[#efbf70]/40 text-[#efbf70] text-left"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate(dashboardPath);
                }}
              >
                Dashboard
              </button>
              <button
                type="button"
                className="block w-full px-6 py-2 rounded-lg border border-[#4f4440]/40 text-[#e2bfb2] text-left"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;