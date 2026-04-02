import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import UserSidebar from './UserSidebar';

const UserDashboard = () => {
  return (
    <div className="bg-background text-on-background font-body antialiased min-h-screen">
      <UserSidebar />

      <main className="md:ml-72 min-h-screen relative">
        <section className="px-8 py-12">
          <div className="relative mb-24">
            <div className="max-w-4xl">
              <h2 className="font-headline text-6xl md:text-8xl font-black text-on-surface tracking-tighter leading-none">
                Welcome Back, <span className="text-tertiary">Julian</span>
              </h2>
              <p className="mt-6 text-xl text-primary-fixed-dim max-w-xl leading-relaxed">
                Your afternoon ritual is perfectly timed. Ready for your dose of functional luxury?
              </p>
            </div>

            <div className="hidden lg:block absolute -right-12 -top-12 w-96 h-[500px] rounded-xl overflow-hidden shadow-2xl rotate-3 translate-y-12">
              <img
                className="w-full h-full object-cover"
                alt="Premium bottle"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVJaR27i2pVfvC6HJRaTRc_QfhEPcIEaL_W6qGOMSvHyq-U86a2IqZYi-aARxtu8RzONslIu3Y8gvUPY3A-xHOnhQsWTIBTyW7-tGQMg4BNtk09stQ5EhGl6HvD6pwWaUn4uibemSKtyhBOd7r9OAMlMKpFeECjE8hFw7838rCcFzVcnLOyro0PwplOos3ThiroqZAvwQ902D6zGdemDOfNi2o6D9fzohWAGRwfGuRG3duaBL3Zf4vi6d5ZVpL_sj1Q_Mc6ZTniQ"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
            <div className="md:col-span-7 lg:col-span-8 glass-card rounded-xl p-8 border border-outline-variant/10 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-12">
                  <span className="text-tertiary text-xs font-bold tracking-widest uppercase px-3 py-1 bg-tertiary/10 rounded-full">Next Scheduled Ritual</span>
                  <span className="text-primary-fixed-dim text-sm">Today, 4:30 PM</span>
                </div>
                <h3 className="font-headline text-4xl font-bold mb-4">Adaptogenic Cacao Pour</h3>
                <p className="text-primary-fixed-dim leading-relaxed max-w-md">
                  Focused on stress reduction and cortisol balance. Infused with Ashwagandha and ceremonial grade magnesium.
                </p>
              </div>
              <div className="mt-12 flex items-center gap-6">
                <button className="bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] px-8 py-4 rounded-full font-bold text-on-primary hover:scale-105 transition-transform flex items-center gap-2" type="button">
                  <span>Start Ritual</span>
                  <span className="material-symbols-outlined">play_arrow</span>
                </button>
                <button className="text-primary-fixed-dim hover:text-tertiary transition-colors flex items-center gap-2" type="button">
                  <span className="material-symbols-outlined">schedule</span>
                  <span>Reschedule</span>
                </button>
              </div>
            </div>

            <div className="md:col-span-5 lg:col-span-4 bg-[#221a17] rounded-xl p-8 border border-outline-variant/5 shadow-xl">
              <h3 className="font-headline text-xl font-bold mb-8">Liquid Gold Rewards</h3>
              <div className="relative pt-1">
                <div className="flex mb-4 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-tertiary bg-tertiary/10">Gold Tier</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-tertiary">850 / 1000 pts</span>
                  </div>
                </div>
                <div className="overflow-hidden h-3 mb-8 text-xs flex rounded-full bg-surface-container-highest">
                  <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)]" style={{ width: '85%' }}></div>
                </div>
              </div>
              <p className="text-sm text-primary-fixed-dim mb-8">
                You&apos;re 150 points away from unlocking the <strong>Velvet Reserve Collection</strong>.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-surface-container-high/40">
                  <span className="material-symbols-outlined text-tertiary">workspace_premium</span>
                  <div className="text-xs">
                    <p className="font-bold">Next Milestone</p>
                    <p className="text-primary-fixed-dim opacity-70">Free Shipping on next Ritual Set</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-12 lg:col-span-5 glass-card rounded-xl overflow-hidden relative border border-outline-variant/10">
              <div className="p-8 relative z-10">
                <div className="w-12 h-12 bg-tertiary/20 rounded-lg flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-tertiary">insights</span>
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4">Wellness Insight</h3>
                <p className="text-primary-fixed-dim mb-6 leading-relaxed">
                  Based on your sleep data from last night, we recommend increasing the <span className="text-tertiary font-medium">Reishi</span> concentration in your evening ritual to support deeper REM cycles.
                </p>
                <Link className="text-tertiary font-bold flex items-center gap-2 group" to="/how-it-works">
                  Explore the science
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-tertiary/5 rounded-full blur-3xl -mr-8 -mb-8"></div>
            </div>

            <div className="md:col-span-12 lg:col-span-7 bg-[#221a17] rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center border border-outline-variant/5">
              <div className="w-full md:w-1/3 aspect-square rounded-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  alt="Order"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg00sI2Qy79_ExUOYLhOh-2nZXgAh8j5fA8xnZOGX0yiA208V2-eRWH_uDa-L5KqrRN6Z-fDWEH1zj_0hxS7LLzDbt48kXSLZLe6Mpu1Ng28mYG6o2Np0qmq9NWYbB_67iDuNZ8EZNpynbS6a2GBU6ySr7fl_pZ3lOrhaKaKxbJ-AGjA3f2kABplXJaXSubo_h2ZoJLQrpI1KzF0WGSnA3q4dMvbTK3IjFZqcNKVym8Mzu3dumVoWKE0KMptYnE-ubK9qPYhuuFA"
                />
              </div>
              <div className="flex-1">
                <span className="text-[#e2bfb2] text-[10px] tracking-widest uppercase mb-2 block">Recent Ritual Order</span>
                <h4 className="font-headline text-xl font-bold mb-2">The Longevity Bundle</h4>
                <p className="text-sm text-primary-fixed-dim mb-6">Arrived Tuesday, Nov 14th</p>
                <div className="flex gap-4">
                  <button className="bg-surface-container-highest px-6 py-3 rounded-full text-xs font-bold hover:bg-tertiary hover:text-on-tertiary transition-colors" type="button">
                    Order Again
                  </button>
                  <button className="outline-1 outline-outline-variant/30 px-6 py-3 rounded-full text-xs font-bold hover:bg-surface-container-high transition-colors" type="button">
                    View Tracking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="h-48 flex items-center justify-center pointer-events-none overflow-hidden opacity-30">
          <span className="text-[12vw] font-black text-outline-variant/10 uppercase select-none tracking-tighter whitespace-nowrap">
            The Liquid Curator • The Liquid Curator
          </span>
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-card border-t border-outline-variant/10 flex justify-around py-4 z-50">
        <NavLink to="/dashboard" end className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-tertiary' : 'text-[#e2bfb2]'}`}>
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
        </NavLink>
        <NavLink to="/dashboard/rewards" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-tertiary' : 'text-[#e2bfb2]'}`}>
          <span className="material-symbols-outlined">workspace_premium</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Rewards</span>
        </NavLink>
        <NavLink to="/dashboard/rituals" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-tertiary' : 'text-[#e2bfb2]'}`}>
          <span className="material-symbols-outlined">auto_awesome</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Rituals</span>
        </NavLink>
        <NavLink to="/dashboard/settings" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-tertiary' : 'text-[#e2bfb2]'}`}>
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Settings</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default UserDashboard;
