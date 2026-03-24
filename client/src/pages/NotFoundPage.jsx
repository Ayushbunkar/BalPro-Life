import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="bg-surface text-on-surface font-body selection:bg-tertiary/30 pb-28 md:pb-0">
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-tertiary/5 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-1/2 h-1/2 rounded-full bg-secondary-container/10 blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 flex justify-center items-center perspective-[1000px]">
            <div className="relative group">
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-48 h-12 bg-black/40 blur-2xl rounded-full group-hover:scale-110 transition-transform duration-700"></div>
              <div className="relative w-64 h-96 lg:w-80 lg:h-[480px] bg-surface-container rounded-lg shadow-2xl overflow-hidden border border-outline-variant/10 transform-[translateY(0px)_rotate(-5deg)]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDf_iI1cgxHLPw5-asqmjCp24xLXOVYP-uLNLnYuV5WXeRVD8J6SEA1FdSLyKfxZlVB443fzDjIkalGNDGUX7-g1tehUp89OfmVOu38RgiCnwy1e00yRx5wYgAi4ASmOcpcTW52ZeJIMTVEsrnJ6GymU6BYqeUQbZLDxtIMAK2mnRGpJ-iYXlS8inGq84Vk27EdnHTz4iTMhhJtYyB582FsMcgA09yCVs3lNkyhnOrvLNFMw9n_TOXJosp9d6mrBQ-iaCdlnhSNmQ"
                  alt="Luxury chocolate beverage pack"
                  className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8 bg-linear-to-t from-surface-dim to-transparent">
                  <span className="text-tertiary font-bold tracking-widest text-xs mb-2">LIMITED EDITION</span>
                  <div className="h-1 w-12 bg-tertiary rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 text-center lg:text-left">
            <div className="inline-block px-4 py-1.5 rounded-full bg-surface-container-highest/50 border border-outline-variant/20 mb-8 backdrop-blur-sm">
              <span className="text-tertiary text-sm font-semibold tracking-wider font-label">STATUS 404</span>
            </div>
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-on-surface mb-6 tracking-tighter leading-[1.1]">
              Oops, this page <br />
              <span className="text-tertiary italic">slipped away.</span>
            </h1>
            <p className="text-primary-fixed-dim text-lg md:text-xl max-w-lg mx-auto lg:mx-0 mb-12 leading-relaxed">
              It seems our premium cacao infusion found a path of its own. Let&apos;s get you back to the indulgent
              experience you deserve.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Link
                to="/"
                className="bg-linear-to-br from-[#efbf70] to-[#a77e36] px-10 py-5 rounded-full text-on-tertiary-fixed font-bold text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-tertiary/10 flex items-center justify-center group"
              >
                Return Home
                <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
              <Link
                to="/products"
                className="px-10 py-5 rounded-full border border-outline-variant/30 text-on-surface font-semibold text-lg hover:bg-surface-container-highest transition-all duration-300 flex items-center justify-center"
              >
                Explore Shop
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full rounded-t-[3rem] mt-24 bg-[#221a17] shadow-[0_-20px_50px_rgba(0,0,0,0.2)]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-12 py-20 max-w-7xl mx-auto font-['Plus_Jakarta_Sans'] leading-relaxed">
          <div className="col-span-1 md:col-span-2">
            <div className="text-3xl font-bold text-[#efbf70] mb-6">BALPRO LIFE</div>
            <p className="text-[#e2bfb2]/70 max-w-xs mb-8">
              Elevating the daily ritual of consumption into an act of pure indulgence and functional wellness.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-[#efbf70] hover:scale-110 transition-transform cursor-pointer">
                <span className="material-symbols-outlined text-xl">public</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-[#efbf70] hover:scale-110 transition-transform cursor-pointer">
                <span className="material-symbols-outlined text-xl">mood</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-on-surface font-bold mb-6">Explore</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/products" className="text-[#e2bfb2]/70 hover:text-[#efbf70] transition-all duration-300 hover:translate-x-1 block">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/why-choose" className="text-[#e2bfb2]/70 hover:text-[#efbf70] transition-all duration-300 hover:translate-x-1 block">
                  Why Choose
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#e2bfb2]/70 hover:text-[#efbf70] transition-all duration-300 hover:translate-x-1 block">
                  The Journal
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#e2bfb2]/70 hover:text-[#efbf70] transition-all duration-300 hover:translate-x-1 block">
                  Wholesale
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-on-surface font-bold mb-6">Support</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/contact" className="text-[#e2bfb2]/70 hover:text-[#efbf70] transition-all duration-300 hover:translate-x-1 block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#e2bfb2]/70 hover:text-[#efbf70] transition-all duration-300 hover:translate-x-1 block">
                  Shipping &amp; Returns
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#e2bfb2]/70 hover:text-[#efbf70] transition-all duration-300 hover:translate-x-1 block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="px-12 py-8 border-t border-outline-variant/10 text-center">
          <p className="text-[10px] tracking-widest text-[#e2bfb2]/40 font-medium">
            © 2024 BALPRO LIFE. CRAFTED FOR THE INDULGENT.
          </p>
        </div>
      </footer>

      <nav className="fixed bottom-0 w-full z-50 rounded-t-3xl md:hidden bg-[#19120f]/90 backdrop-blur-2xl border-t border-[#4f4440]/20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex justify-around items-center h-20 pb-safe px-6">
          <Link to="/products" className="flex flex-col items-center justify-center text-[#efbf70] bg-[#3c332f] rounded-full py-2 px-4 transition-transform scale-95 active:scale-90">
            <span className="material-symbols-outlined">local_mall</span>
            <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Shop</span>
          </Link>
          <Link to="/ingredients" className="flex flex-col items-center justify-center text-[#e2bfb2]/50 py-2 px-4 transition-transform scale-95 active:scale-90">
            <span className="material-symbols-outlined">auto_awesome</span>
            <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Benefits</span>
          </Link>
          <Link to="/products" className="flex flex-col items-center justify-center text-[#e2bfb2]/50 py-2 px-4 transition-transform scale-95 active:scale-90">
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Cart</span>
          </Link>
          <Link to="/login" className="flex flex-col items-center justify-center text-[#e2bfb2]/50 py-2 px-4 transition-transform scale-95 active:scale-90">
            <span className="material-symbols-outlined">person</span>
            <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Account</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NotFoundPage;
