import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = ({ cartCount, onCartClick, mobileMenuOpen, setMobileMenuOpen }) => {
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-xl dark:bg-[#19120f]/80 transition-all duration-500 ease-in-out">
      <div className="flex justify-between items-center px-8 py-6 max-w-[1440px] mx-auto w-full">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tighter text-[#efbf70] font-['Epilogue'] cursor-pointer transition-transform active:scale-95">
          BALPRO LIFE
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-12 items-center">
          <a href="#shop" className="text-[#efbf70] font-semibold border-b border-[#efbf70]/30 font-['Epilogue'] tracking-tight hover:scale-105 duration-300">Shop</a>
          <a href="#ingredients" className="text-[#e2bfb2] hover:text-[#efbf70] transition-colors font-['Epilogue'] tracking-tight hover:scale-105 duration-300">Ingredients</a>
          <a href="#benefits" className="text-[#e2bfb2] hover:text-[#efbf70] transition-colors font-['Epilogue'] tracking-tight hover:scale-105 duration-300">Benefits</a>
          <a href="#journal" className="text-[#e2bfb2] hover:text-[#efbf70] transition-colors font-['Epilogue'] tracking-tight hover:scale-105 duration-300">Journal</a>
          <a href="#story" className="text-[#e2bfb2] hover:text-[#efbf70] transition-colors font-['Epilogue'] tracking-tight hover:scale-105 duration-300">Our Story</a>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-6 text-[#efbf70]">
          <div className="relative">
            <ShoppingCart
              size={20}
              className="cursor-pointer transition-transform active:scale-95 hover:scale-105"
              onClick={onCartClick}
            />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#efbf70] text-[#432c00] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <User
            size={20}
            className="cursor-pointer transition-transform active:scale-95 hover:scale-105"
            onClick={() => {
              if (!isAuthenticated) {
                window.location.href = '/login';
              }
            }}
          />
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
          <a href="#shop" className="block text-[#efbf70] font-['Epilogue']">Shop</a>
          <a href="#ingredients" className="block text-[#e2bfb2] hover:text-[#efbf70]">Ingredients</a>
          <a href="#benefits" className="block text-[#e2bfb2] hover:text-[#efbf70]">Benefits</a>
          <a href="#journal" className="block text-[#e2bfb2] hover:text-[#efbf70]">Journal</a>
          <a href="#story" className="block text-[#e2bfb2] hover:text-[#efbf70]">Our Story</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;