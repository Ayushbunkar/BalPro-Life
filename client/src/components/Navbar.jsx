import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/logo.png";

const Navbar = ({ cartCount, onCartClick, mobileMenuOpen, setMobileMenuOpen }) => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav
        className="
          fixed top-0 w-full z-50
          backdrop-blur-xl 
          bg-[#f8f2e9]/95 
          border-b border-[#EAD8C0]
          shadow-sm
        "
      >
        <div className="content-container">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link className="flex items-center gap-3" to="/">
              <img src={logo} className="w-14 h-14 object-contain" alt="" />
              <span className="font-black text-2xl tracking-tight text-[#7B4A22]">
                BalPro Life
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-12">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-[13px] font-bold uppercase tracking-widest relative group ${
                    location.pathname === item.path
                      ? "text-[#1D6B3A]"
                      : "text-[#7B4A22]/80"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-2 left-0 h-0.5 bg-[#1D6B3A] transition-all ${
                      location.pathname === item.path
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6">
              {/* Auth (Desktop) */}
              <div className="hidden md:flex gap-4 items-center">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-2 text-[#7B4A22] font-medium">
                      <User size={16} />
                      Hi, {user?.name?.split(" ")[0]}
                    </div>
                    <Link
                      to={"/dashboard"}
                      className="text-xs uppercase tracking-widest px-3 py-2 border rounded-md"
                      style={{ borderColor: "#EAD8C0", color: "#7B4A22" }}
                    >
                      Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-xs uppercase tracking-widest px-3 py-2 border rounded-md"
                      style={{ borderColor: "#EAD8C0", color: "#7B4A22" }}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="text-xs uppercase tracking-widest px-3 py-2 rounded-md text-white"
                      style={{ backgroundColor: "#1D6B3A" }}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>

              {/* Cart */}
              <button className="relative" onClick={onCartClick}>
                <ShoppingCart size={24} className="text-[#7B4A22]" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full flex items-center justify-center text-[10px] text-white font-bold border-2 border-white bg-[#1D6B3A]">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Toggle */}
              <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE FULLSCREEN MENU */}
      {mobileMenuOpen && (
        <div
          className="
            fixed inset-0 z-[999]
            backdrop-blur-2xl 
            bg-[#f8f2e9]/98
            flex flex-col p-10 pt-24 
            space-y-8 
            animate-slideIn
          "
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-black uppercase tracking-tight"
              style={{ color: location.pathname === item.path ? "#1D6B3A" : "#7B4A22" }}
            >
              {item.name}
            </Link>
          ))}

          <div className="w-full border-t pt-8 border-[#EAD8C0]">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 pb-4 border-b border-[#EAD8C0]">
                  <User size={22} className="text-[#7B4A22]" />
                  <div>
                    <p className="text-lg font-bold">{user?.name}</p>
                    <p className="text-xs opacity-70">{user?.email}</p>
                  </div>
                </div>

                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-6 bg-[#1D6B3A] text-white px-6 py-3 rounded-lg text-lg font-black uppercase"
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-black uppercase tracking-tight text-[#7B4A22]"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 bg-[#1D6B3A] text-white px-6 py-3 rounded-lg text-xl font-black uppercase"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
