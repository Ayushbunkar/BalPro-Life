import React from 'react';

const Button = ({ children, variant = 'primary', className = '', onClick, type = "button", icon: Icon, disabled }) => {
  const baseStyle = "inline-flex items-center justify-center px-8 py-4 font-bold tracking-wide transition-all duration-300 rounded-full uppercase text-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl";

  const variants = {
    primary: "bg-[#1D6B3A] hover:bg-[#4FAF5A] text-white border border-transparent hover:shadow-[#1D6B3A]/30",
    secondary: "bg-[#F4E8D3] text-[#7B4A22] border border-[#EAD8C0] hover:border-[#1D6B3A] hover:bg-[#EAD8C0] hover:shadow-[#7B4A22]/20",
    outline: "bg-transparent border border-[#1D6B3A] text-[#1D6B3A] hover:bg-[#1D6B3A] hover:text-white",
    dark: "bg-[#7B4A22] text-white border border-[#5A3417] hover:bg-[#5A3417] hover:shadow-[#7B4A22]/30"
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
      {Icon && <Icon size={18} className="ml-2" />}
    </button>
  );
};

export default Button;