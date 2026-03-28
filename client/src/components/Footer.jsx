import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface-container-low rounded-t-[2.5rem] pt-14 pb-8 shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
      <div className="max-w-[1440px] mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-4 space-y-5">
            <h1 className="font-headline text-3xl font-extrabold tracking-tighter text-tertiary">BALPRO LIFE</h1>
            <p className="text-primary-fixed-dim text-base leading-relaxed max-w-sm">
              Crafting the daily ritual through masterfully crafted functional nutrition. We believe wellness should be an indulgence, not a chore.
            </p>
            <div className="flex gap-5">
              <Link className="text-on-surface-variant hover:text-tertiary transition-colors duration-300" to="/login">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
              </Link>
              <Link className="text-on-surface-variant hover:text-tertiary transition-colors duration-300" to="/reviews">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>share</span>
              </Link>
              <Link className="text-on-surface-variant hover:text-tertiary transition-colors duration-300" to="/about">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>public</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-headline text-tertiary text-sm font-bold uppercase tracking-[0.2em]">Shop</h4>
            <ul className="space-y-2.5 flex flex-col">
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/products">All Products</Link></li>
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/products">Subscriptions</Link></li>
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/products">Bundles</Link></li>
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/contact">Wholesale</Link></li>
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/products">Limited Drops</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-headline text-tertiary text-sm font-bold uppercase tracking-[0.2em]">Experience</h4>
            <ul className="space-y-2.5 flex flex-col">
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/about">Our Story</Link></li>
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/ingredients">Ingredients</Link></li>
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/reviews">Reviews</Link></li>
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/about">Wellness Journal</Link></li>
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/why-choose-us">The Ritual</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-headline text-tertiary text-sm font-bold uppercase tracking-[0.2em]">Support</h4>
            <ul className="space-y-2.5 flex flex-col">
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/contact">FAQ</Link></li>
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/contact">Shipping &amp; Returns</Link></li>
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/contact">Contact Us</Link></li>
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/contact">Wholesale Inquiry</Link></li>
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/dashboard/orders">Track Order</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-headline text-tertiary text-sm font-bold uppercase tracking-[0.2em]">Legal</h4>
            <ul className="space-y-2.5 flex flex-col">
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/contact">Privacy Policy</Link></li>
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/contact">Terms of Service</Link></li>
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/contact">Cookie Policy</Link></li>
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/contact">Accessibility</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-outline-variant/10 gap-3">
          <p className="text-on-surface-variant text-sm font-medium tracking-wide">
            © 2024 BALPRO LIFE. CRAFTED FOR THE INDULGENT.
          </p>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
              <span className="material-symbols-outlined text-xl">payments</span>
              <span className="material-symbols-outlined text-xl">credit_card</span>
              <span className="material-symbols-outlined text-xl">wallet</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;