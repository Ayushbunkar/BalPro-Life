import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

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
            <div>
              <p className="text-tertiary text-[10px] font-bold uppercase tracking-[0.22em] mb-3">Follow Us</p>
              <div className="flex flex-wrap gap-2.5">
                <a
                  className="w-9 h-9 rounded-full border border-outline-variant/30 text-primary-fixed-dim hover:text-tertiary hover:border-tertiary/50 transition-colors inline-flex items-center justify-center"
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
                <a
                  className="w-9 h-9 rounded-full border border-outline-variant/30 text-primary-fixed-dim hover:text-tertiary hover:border-tertiary/50 transition-colors inline-flex items-center justify-center"
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook size={16} />
                </a>
                <a
                  className="w-9 h-9 rounded-full border border-outline-variant/30 text-primary-fixed-dim hover:text-tertiary hover:border-tertiary/50 transition-colors inline-flex items-center justify-center"
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                >
                  <Youtube size={16} />
                </a>
                <a
                  className="w-9 h-9 rounded-full border border-outline-variant/30 text-primary-fixed-dim hover:text-tertiary hover:border-tertiary/50 transition-colors inline-flex items-center justify-center"
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X"
                >
                  <Twitter size={16} />
                </a>
              </div>
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
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/faq">FAQ</Link></li>
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/shipping-returns">Shipping &amp; Returns</Link></li>
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/contact">Contact Us</Link></li>
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/contact">Wholesale Inquiry</Link></li>
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/dashboard/orders">Track Order</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-headline text-tertiary text-sm font-bold uppercase tracking-[0.2em]">Legal</h4>
            <ul className="space-y-2.5 flex flex-col">
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/terms-of-service">Terms of Service</Link></li>
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/contact">Cookie Policy</Link></li>
              <li><Link className="text-primary-fixed-dim hover:text-tertiary transition-colors footer-link-hover" to="/contact">Accessibility</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center md:justify-start items-center pt-6 border-t border-outline-variant/10 gap-3">
          <p className="text-on-surface-variant text-sm font-medium tracking-wide">
            © 2024 BALPRO LIFE. CRAFTED FOR THE INDULGENT.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;