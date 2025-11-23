import React from 'react';
import { Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-24 pb-12">
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-4">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-black flex items-center justify-center">
                  <Zap size={18} className="text-white fill-current" />
                </div>
                <span className="font-black text-xl text-slate-900 tracking-tighter">BALPRO</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Premium nutrition for those who demand excellence. Designed in California, tested globally.
              </p>
            </div>

            <div className="md:col-span-2 md:col-start-7">
              <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Shop</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li><a href="#" className="hover:text-orange-600 transition-colors">Proteins</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Pre-Workout</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Apparel</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Accessories</a></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Company</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li><a href="#" className="hover:text-orange-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Lab Results</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Social</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-slate-100 flex items-center justify-center hover:bg-black hover:text-white transition-all">IG</a>
                <a href="#" className="w-10 h-10 bg-slate-100 flex items-center justify-center hover:bg-black hover:text-white transition-all">X</a>
              </div>
            </div>
        </div>
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-400 text-xs font-medium">
            © 2024 BalPro Life Nutrition. All rights reserved.
          </div>
          <div className="flex gap-6 text-slate-400 text-xs font-medium">
             <a href="#">Privacy Policy</a>
             <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;