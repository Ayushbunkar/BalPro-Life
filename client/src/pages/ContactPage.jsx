import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  const [activeQuery, setActiveQuery] = useState('shipping');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Inquiry submitted');
  };

  const quickResources = [
    {
      id: 'shipping',
      title: 'Shipping & Returns',
      answer:
        'Orders are processed within 24-48 hours. Standard delivery takes 3-7 business days. Unopened items can be returned within 14 days for a full refund.',
    },
    {
      id: 'sourcing',
      title: 'Ingredient Sourcing',
      answer:
        'Our cacao and adaptogens are sourced from certified partner farms with strict quality checks, traceability records, and third-party purity testing.',
    },
    {
      id: 'wholesale',
      title: 'Wholesale Dashboard',
      answer:
        'Wholesale partners can track inventory, pricing tiers, and order status through the dashboard after account approval by our concierge team.',
    },
  ];

  return (
    <div className="bg-background text-on-surface font-body selection:bg-tertiary selection:text-on-tertiary pb-28 md:pb-0">
      <main className="pt-10 pb-16">
        <section className="max-w-[1440px] mx-auto px-8 mb-10 lg:mb-8">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-tertiary uppercase tracking-[0.28em] text-xs md:text-sm font-semibold mb-3 block">Connect With Us</span>
              <h1 className="text-4xl md:text-6xl font-headline font-bold text-on-surface leading-[1.08] tracking-tighter">
                Let us start a <br />conversation.
              </h1>
            </div>
            <p className="text-primary-fixed-dim text-base md:text-lg max-w-sm leading-relaxed">
              Our curators are available to assist with ingredient inquiries, wholesale partnerships, or personal
              ritual guidance.
            </p>
          </div>
        </section>

        <section className="max-w-[1440px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-7 self-start bg-surface-container-low rounded-xl p-6 md:p-7 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-headline font-semibold mb-6 text-on-surface">Send a Message</h2>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Julian Vane"
                      className="w-full bg-surface-container-highest border-none rounded-lg p-3 text-on-surface placeholder:text-outline focus:ring-1 focus:ring-tertiary transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="julian@lifestyle.com"
                      className="w-full bg-surface-container-highest border-none rounded-lg p-3 text-on-surface placeholder:text-outline focus:ring-1 focus:ring-tertiary transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Subject</label>
                  <select className="w-auto min-w-[190px] bg-surface-container-highest border-none rounded-lg p-3 text-on-surface focus:ring-1 focus:ring-tertiary appearance-none cursor-pointer">
                    <option>Product Inquiry</option>
                    <option>Wholesale/Press</option>
                    <option>Order Status</option>
                    <option>General Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Your Message</label>
                  <textarea
                    rows={4}
                    placeholder="How can we help you today?"
                    className="w-full bg-surface-container-highest border-none rounded-lg p-3 text-on-surface placeholder:text-outline focus:ring-1 focus:ring-tertiary transition-all duration-300 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-linear-to-br from-[#efbf70] to-[#a77e36] text-on-tertiary-fixed font-semibold px-8 py-3 rounded-full hover:scale-105 active:scale-95 transition-transform duration-300 flex items-center gap-3"
                >
                  Submit Inquiry
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-5 self-start grid grid-cols-1 lg:grid-rows-2 gap-5">
            <div className="bg-surface-container-high rounded-xl p-6 md:p-7 h-full flex flex-col justify-between group hover:bg-surface-container-highest transition-colors duration-500">
              <div>
                <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center mb-6 text-tertiary">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <h3 className="text-xl font-headline font-semibold text-on-surface mb-2">Headquarters</h3>
                <address className="not-italic text-primary-fixed-dim leading-relaxed">
                  462038 <br />
                  Bhopal District, MP <br />
                  India
                </address>
              </div>
              <div className="mt-6 pt-6 border-t border-outline-variant/20 flex gap-8">
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Call Us</span>
                  <p className="text-on-surface font-medium">+91 9589636029</p>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Email Us</span>
                  <p className="text-on-surface font-medium">balprolife@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="bg-surface-container rounded-xl p-6 md:p-7 h-full flex flex-col">
              <h3 className="text-xl font-headline font-semibold text-on-surface mb-5">Quick Resources</h3>
              <div className="space-y-2.5">
                {quickResources.map((item) => {
                  const isActive = activeQuery === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveQuery(item.id)}
                      className={`w-full min-h-14 flex items-center justify-between group px-4 md:px-5 py-3 rounded-lg border transition-all text-left ${
                        isActive
                          ? 'bg-surface-container-highest border-tertiary/35'
                          : 'border-outline-variant/20 hover:bg-surface-container-highest hover:border-outline-variant/35'
                      }`}
                      aria-expanded={isActive}
                    >
                      <span className={`${isActive ? 'text-on-surface' : 'text-primary-fixed-dim'}`}>{item.title}</span>
                      <span
                        className={`material-symbols-outlined text-tertiary transition-transform ${
                          isActive ? 'rotate-90' : 'group-hover:translate-x-1'
                        }`}
                      >
                        chevron_right
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 p-4 rounded-lg border border-outline-variant/20 bg-surface-container-high text-sm leading-relaxed text-primary-fixed-dim">
                {quickResources.find((item) => item.id === activeQuery)?.answer}
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[1440px] mx-auto px-8 mt-24">
          <div className="w-full h-[500px] rounded-xl overflow-hidden relative transition-all duration-700">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGRBZev9yqa3j1qxFvssK67-ZUmyg8Siaa-r4O6B0stUDTjZARmhHrE8IdYNdftsg3dGZ57FcScmyYBzJuM1ju2RY1wwRordQtbbLApx-U6fL16hgPTm-k_fGmG50WMiZfWSG13mFUwIrBsKiyOeEL_ZlhKUVFN1L-F2_fO595xImzCJhOMaw5ZVUscUsClDdiQn0Vrcu8_KX7HQGBINLB31VP0umbDZaquLT3euqrUxxr5UEm92oOaD6f-v5T15Q857kN1xSPwA"
              alt="Dark stylized luxury map showing headquarters location"
              className="w-full h-full object-cover object-center saturate-150 contrast-110 brightness-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#130f0d]/35 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute bottom-12 left-12 backdrop-blur-[20px] bg-[rgba(34,26,23,0.72)] p-6 rounded-lg max-w-xs border border-tertiary/20">
              <h4 className="text-[#f3c777] font-headline font-bold mb-2">Visit the Atelier</h4>
              <p className="text-[#f3ddd3] text-sm leading-relaxed">Experience our curation process in person. By appointment only.</p>
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