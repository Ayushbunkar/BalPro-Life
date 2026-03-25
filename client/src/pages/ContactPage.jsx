import React from 'react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Inquiry submitted');
  };

  return (
    <div className="bg-background text-on-surface font-body selection:bg-tertiary selection:text-on-tertiary pb-28 md:pb-0">
      <main className="pt-32 pb-24">
        <section className="max-w-[1440px] mx-auto px-8 mb-24">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-tertiary uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">Connect With Us</span>
              <h1 className="text-5xl md:text-7xl font-headline font-bold text-on-surface leading-[1.1] tracking-tighter">
                Let us start a <br />conversation.
              </h1>
            </div>
            <p className="text-primary-fixed-dim text-lg max-w-sm mb-2 leading-relaxed">
              Our curators are available to assist with ingredient inquiries, wholesale partnerships, or personal
              ritual guidance.
            </p>
          </div>
        </section>

        <section className="max-w-[1440px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-surface-container-low rounded-xl p-8 md:p-12 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-headline font-semibold mb-10 text-on-surface">Send a Message</h2>
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Julian Vane"
                      className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface placeholder:text-outline focus:ring-1 focus:ring-tertiary transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="julian@lifestyle.com"
                      className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface placeholder:text-outline focus:ring-1 focus:ring-tertiary transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Subject</label>
                  <select className="w-auto min-w-[200px] bg-surface-container-highest border-none rounded-lg p-4 text-on-surface focus:ring-1 focus:ring-tertiary appearance-none cursor-pointer">
                    <option>Product Inquiry</option>
                    <option>Wholesale/Press</option>
                    <option>Order Status</option>
                    <option>General Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Your Message</label>
                  <textarea
                    rows={5}
                    placeholder="How can we help you today?"
                    className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface placeholder:text-outline focus:ring-1 focus:ring-tertiary transition-all duration-300 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-linear-to-br from-[#efbf70] to-[#a77e36] text-on-tertiary-fixed font-semibold px-10 py-4 rounded-full hover:scale-105 active:scale-95 transition-transform duration-300 flex items-center gap-3"
                >
                  Submit Inquiry
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            <div className="bg-surface-container-high rounded-xl p-8 flex flex-col justify-between group hover:bg-surface-container-highest transition-colors duration-500">
              <div>
                <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center mb-6 text-tertiary">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <h3 className="text-xl font-headline font-semibold text-on-surface mb-2">Global Headquarters</h3>
                <address className="not-italic text-primary-fixed-dim leading-relaxed">
                  742 Indulgence Avenue, <br />
                  Luxury District, Zurich <br />
                  8001, Switzerland
                </address>
              </div>
              <div className="mt-8 pt-8 border-t border-outline-variant/20 flex gap-12">
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Call Us</span>
                  <p className="text-on-surface font-medium">+41 44 211 4000</p>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Email Us</span>
                  <p className="text-on-surface font-medium">concierge@balpro.life</p>
                </div>
              </div>
            </div>

            <div className="bg-surface-container rounded-xl p-8">
              <h3 className="text-xl font-headline font-semibold text-on-surface mb-6">Quick Resources</h3>
              <div className="space-y-4">
                <Link to="/contact" className="flex items-center justify-between group p-4 rounded-lg hover:bg-surface-container-highest transition-all">
                  <span className="text-primary-fixed-dim">Shipping &amp; Returns</span>
                  <span className="material-symbols-outlined text-tertiary transform group-hover:translate-x-1 transition-transform">chevron_right</span>
                </Link>
                <Link to="/ingredients" className="flex items-center justify-between group p-4 rounded-lg hover:bg-surface-container-highest transition-all">
                  <span className="text-primary-fixed-dim">Ingredient Sourcing</span>
                  <span className="material-symbols-outlined text-tertiary transform group-hover:translate-x-1 transition-transform">chevron_right</span>
                </Link>
                <Link to="/dashboard" className="flex items-center justify-between group p-4 rounded-lg hover:bg-surface-container-highest transition-all">
                  <span className="text-primary-fixed-dim">Wholesale Dashboard</span>
                  <span className="material-symbols-outlined text-tertiary transform group-hover:translate-x-1 transition-transform">chevron_right</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[1440px] mx-auto px-8 mt-24">
          <div className="w-full h-[500px] rounded-xl overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGRBZev9yqa3j1qxFvssK67-ZUmyg8Siaa-r4O6B0stUDTjZARmhHrE8IdYNdftsg3dGZ57FcScmyYBzJuM1ju2RY1wwRordQtbbLApx-U6fL16hgPTm-k_fGmG50WMiZfWSG13mFUwIrBsKiyOeEL_ZlhKUVFN1L-F2_fO595xImzCJhOMaw5ZVUscUsClDdiQn0Vrcu8_KX7HQGBINLB31VP0umbDZaquLT3euqrUxxr5UEm92oOaD6f-v5T15Q857kN1xSPwA"
              alt="Dark stylized luxury map showing headquarters location"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute bottom-12 left-12 backdrop-blur-[20px] bg-[rgba(34,26,23,0.7)] p-6 rounded-lg max-w-xs border border-outline-variant/10">
              <h4 className="text-tertiary font-headline font-bold mb-2">Visit the Atelier</h4>
              <p className="text-on-surface text-sm leading-relaxed">Experience our curation process in person. By appointment only.</p>
            </div>
          </div>
        </section>
      </main>

      <div className="fixed bottom-0 w-full z-50 rounded-t-3xl md:hidden bg-[#19120f]/90 backdrop-blur-2xl border-t border-[#4f4440]/20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex justify-around items-center h-20 pb-safe px-6">
          <Link to="/products" className="flex flex-col items-center justify-center text-[#e2bfb2]/50 py-2 px-4 transition-transform active:scale-90">
            <span className="material-symbols-outlined">local_mall</span>
            <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Shop</span>
          </Link>
          <Link to="/why-choose" className="flex flex-col items-center justify-center text-[#e2bfb2]/50 py-2 px-4 transition-transform active:scale-90">
            <span className="material-symbols-outlined">auto_awesome</span>
            <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Benefits</span>
          </Link>
          <Link to="/products" className="flex flex-col items-center justify-center text-[#e2bfb2]/50 py-2 px-4 transition-transform active:scale-90">
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Cart</span>
          </Link>
          <Link to="/login" className="flex flex-col items-center justify-center text-[#efbf70] bg-[#3c332f] rounded-full py-2 px-4 transition-transform active:scale-90">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
            <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Account</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;