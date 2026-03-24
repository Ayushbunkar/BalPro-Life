import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#221a17] dark:bg-[#221a17] w-full rounded-t-[3rem] mt-24 shadow-[0_-20px_50px_rgba(0,0,0,0.2)]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-12 py-20 max-w-7xl mx-auto font-['Plus_Jakarta_Sans'] leading-relaxed">
        <div className="md:col-span-1">
          <div className="text-3xl font-bold text-[#efbf70] mb-6">BALPRO LIFE</div>
          <p className="text-[#e2bfb2]/70 text-sm">CRAFTED FOR THE INDULGENT. Optimized for the human experience.</p>
        </div>
        
        <div>
          <h4 className="text-[#efbf70] font-bold mb-6">Experience</h4>
          <ul className="space-y-4">
            <li><a href="#shop" className="text-[#e2bfb2]/70 hover:text-[#efbf70] transition-all duration-300 hover:translate-x-1 inline-block">Shop All</a></li>
            <li><a href="#ingredients" className="text-[#e2bfb2]/70 hover:text-[#efbf70] transition-all duration-300 hover:translate-x-1 inline-block">Ingredients</a></li>
            <li><a href="#" className="text-[#e2bfb2]/70 hover:text-[#efbf70] transition-all duration-300 hover:translate-x-1 inline-block">Subscriptions</a></li>
            <li><a href="#" className="text-[#e2bfb2]/70 hover:text-[#efbf70] transition-all duration-300 hover:translate-x-1 inline-block">Wholesale</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-[#efbf70] font-bold mb-6">Company</h4>
          <ul className="space-y-4">
            <li><a href="#story" className="text-[#e2bfb2]/70 hover:text-[#efbf70] transition-all duration-300 hover:translate-x-1 inline-block">Our Story</a></li>
            <li><Link to="/reviews" className="text-[#e2bfb2]/70 hover:text-[#efbf70] transition-all duration-300 hover:translate-x-1 inline-block">Reviews & Testimonials</Link></li>
            <li><a href="#" className="text-[#e2bfb2]/70 hover:text-[#efbf70] transition-all duration-300 hover:translate-x-1 inline-block">Journal</a></li>
            <li><a href="#" className="text-[#e2bfb2]/70 hover:text-[#efbf70] transition-all duration-300 hover:translate-x-1 inline-block">Contact</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-[#efbf70] font-bold mb-6">Support</h4>
          <ul className="space-y-4">
            <li><a href="#" className="text-[#e2bfb2]/70 hover:text-[#efbf70] transition-all duration-300 hover:translate-x-1 inline-block">Shipping & Returns</a></li>
            <li><a href="#" className="text-[#e2bfb2]/70 hover:text-[#efbf70] transition-all duration-300 hover:translate-x-1 inline-block">Privacy Policy</a></li>
            <li><a href="#" className="text-[#e2bfb2]/70 hover:text-[#efbf70] transition-all duration-300 hover:translate-x-1 inline-block">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      
      <div className="px-12 py-8 border-t border-[#4f4440]/20 text-center">
        <p className="text-[#e2bfb2]/50 text-xs tracking-widest uppercase">© 2024 BALPRO LIFE. CRAFTED FOR THE INDULGENT.</p>
      </div>
    </footer>
  );
};

export default Footer;