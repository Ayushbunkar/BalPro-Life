import React from 'react';
import { NavLink } from 'react-router-dom';
import UserSidebar from './UserSidebar';

const mobileClass = ({ isActive }) =>
  `flex flex-col items-center gap-1 ${isActive ? 'text-tertiary' : 'text-outline'}`;

const UserRituals = () => {
  return (
    <div className="font-body selection:bg-tertiary selection:text-surface bg-[#19120f] text-[#efdfd9] min-h-screen">
      <UserSidebar />

      <main className="md:mr-72 min-h-screen pb-24">
        <header className="p-8 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-tertiary font-headline font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Personalized Sanctuary</span>
            <h2 className="text-5xl md:text-7xl font-headline font-black text-on-surface tracking-tighter leading-none mb-4">Daily <span className="text-tertiary italic">Rituals</span></h2>
            <p className="text-primary-fixed-dim text-lg max-w-lg leading-relaxed">Curate your sensory experience. Align your flow with our functional cacao blends and timed wellness protocols.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="glass-card p-4 rounded-xl flex items-center gap-4">
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-outline">Performance</p>
                <p className="font-headline font-bold text-tertiary">94% Consistency</p>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-tertiary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary">trending_up</span>
              </div>
            </div>
          </div>
        </header>

        <section className="px-8 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-8">
            <div className="glass-card rounded-xl p-8 relative overflow-hidden group">
              <div className="flex justify-between items-center mb-8 relative z-10">
                <h3 className="font-headline font-bold text-2xl">The Schedule</h3>
                <div className="flex gap-2">
                  <span className="px-4 py-1 rounded-full bg-surface-container-highest text-[10px] font-bold uppercase tracking-widest">Today</span>
                  <span className="px-4 py-1 rounded-full bg-transparent border border-outline-variant text-[10px] font-bold uppercase tracking-widest text-outline">Week View</span>
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="flex gap-8 group/item">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase text-tertiary mb-1">07:30</span>
                    <div className="w-px h-full bg-outline-variant/30"></div>
                  </div>
                  <div className="grow glass-card border border-outline-variant/10 p-6 rounded-lg hover:bg-surface-container-highest transition-colors cursor-pointer group-hover/item:border-tertiary/30">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="material-symbols-outlined text-tertiary text-lg">wb_sunny</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-primary-fixed-dim">Morning Focus</span>
                        </div>
                        <h4 className="font-headline font-bold text-xl mb-1">Cacao Nootropic Activation</h4>
                        <p className="text-sm text-outline">Mix 2 scoops with 200ml hot oat milk. 10min meditation.</p>
                      </div>
                      <span className="material-symbols-outlined text-outline group-hover/item:text-tertiary transition-colors">check_circle</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 group/item">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase text-outline mb-1">14:00</span>
                    <div className="w-px h-full bg-outline-variant/30"></div>
                  </div>
                  <div className="grow bg-surface-container-low border border-outline-variant/5 p-6 rounded-lg opacity-60">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="material-symbols-outlined text-outline text-lg">bolt</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-outline">Midday Energy</span>
                        </div>
                        <h4 className="font-headline font-bold text-xl mb-1">Metabolic Reset</h4>
                        <p className="text-sm text-outline">Matcha-infused Balpro blend. Sunlight exposure.</p>
                      </div>
                      <span className="material-symbols-outlined text-outline">radio_button_unchecked</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 group/item">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase text-outline mb-1">21:30</span>
                    <div className="w-px h-full bg-outline-variant/30"></div>
                  </div>
                  <div className="grow glass-card border border-outline-variant/10 p-6 rounded-lg hover:bg-surface-container-highest transition-colors cursor-pointer">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="material-symbols-outlined text-[#8a9cf4] text-lg">dark_mode</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-primary-fixed-dim">Evening Calm</span>
                        </div>
                        <h4 className="font-headline font-bold text-xl mb-1">Magnesium Sleep Synthesis</h4>
                        <p className="text-sm text-outline">Ashwagandha + Cacao. Deep breathing protocol.</p>
                      </div>
                      <span className="material-symbols-outlined text-outline">radio_button_unchecked</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-8 rounded-xl">
                <h4 className="font-headline font-bold mb-6 text-sm uppercase tracking-widest text-tertiary">Bio-Marker Sync</h4>
                <div className="space-y-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-outline">Focus Depth</span>
                    <span className="font-bold">88%</span>
                  </div>
                  <div className="h-1 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary w-[88%]"></div>
                  </div>
                  <div className="flex justify-between text-xs pt-2">
                    <span className="text-outline">Rest Quality</span>
                    <span className="font-bold">72%</span>
                  </div>
                  <div className="h-1 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[72%]"></div>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 flex flex-col justify-center">
                <span className="material-symbols-outlined text-tertiary mb-2 text-4xl">auto_graph</span>
                <h4 className="font-headline font-bold text-xl mb-2">Weekly Insight</h4>
                <p className="text-sm text-outline leading-relaxed">Your "Evening Calm" consistency has improved by 12% this week. Expect better REM cycles.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="relative group cursor-pointer overflow-hidden rounded-xl h-64 flex items-center justify-center border-2 border-dashed border-outline-variant hover:border-tertiary/50 transition-all">
              <img className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700" alt="Ritual ingredients" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxzPCZpNNONgXtNV5BdduoUBSIDS1LeUfYSurdOPDKc8Ef8p-nhtzSChlTpGtdGFoOwu7O4vXncj0jpVO1Gq25_E3DPwr2xpX96ejweWQbjHHCRhhUh3kyEfpuIuEhfH2A-DSiD42wKL_dWc7iGDA06QNtys6ILPITWPHo7o6QSQ2dtm2DfVRiLgDoAGBVKR4JaotcVQ_laLqUV__6EEg1SeiArUSuGbrd07VbG1srooqpGnmPz_WEnIVyMnVm0jcM9qi08Z9rlA" />
              <div className="relative z-10 text-center p-6">
                <div className="w-16 h-16 rounded-full bg-tertiary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-tertiary transition-colors">
                  <span className="material-symbols-outlined text-tertiary text-3xl group-hover:text-surface">add</span>
                </div>
                <h3 className="font-headline font-bold text-2xl mb-1">Design New Ritual</h3>
                <p className="text-outline text-sm">Blend ingredients, timing, and intent.</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-headline font-bold text-xl px-2">Active Library</h3>

              <div className="glass-card rounded-xl p-2 flex items-center gap-4 hover:translate-x-2 transition-transform cursor-pointer group">
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                  <img className="w-full h-full object-cover" alt="The Alchemist Brew" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9Swjs6h38Y7YJZwaYXqFBpo0ul6KW7t9m6jgrKA9_K8kDjDCbS0lE77TlxYJkWoNxHKG_Y_o79jgVPpU7akD9qsFA9z2eCzChK3Z6JtIwjzuK8Mi-2neB2ZxaFl4e67J1wpc1awTy45aJCcAIqJnIf69NutvGGQJX7AeAhamjfBCdSQzmFn9LwogF-MTpDXO3mNaxq8aWUHNffpPMZghm24nKRDyHjCO2SuXB4Y_L7QT_67o7bMneYu0eJoX35ytQzyEkNR-UMg" />
                </div>
                <div className="grow">
                  <h4 className="font-bold text-on-surface group-hover:text-tertiary transition-colors">The Alchemist Brew</h4>
                  <p className="text-[10px] text-outline uppercase tracking-widest">Cognition • Lions Mane • 15min</p>
                </div>
                <div className="pr-4">
                  <span className="material-symbols-outlined text-outline">chevron_right</span>
                </div>
              </div>

              <div className="glass-card rounded-xl p-2 flex items-center gap-4 hover:translate-x-2 transition-transform cursor-pointer group">
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                  <img className="w-full h-full object-cover" alt="Twilight Reset" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAzuBLx4Q1rzPVApJQkS98SRCdlGfeOPQSiEIGi28HnR6Y8dFB22_zZJZqLc_rPOpn7aaOOOQJwhjARVEBgJxhWlL5rgcNue3DnFj5P8qEEFB0gWJFxUs1R5vIAuvzqe_1gipKb_VLXtpFx5_XAqeLq_DFuY3AvNRUrk7BeZvLwxhQqWLwZvRrA1UrfzRzA6G_-vZm5F8veJR3CCU8Tu4luAaSYSoGX0npzaNTEsdwFNXUBo5LT7oFUx-SUHQODskfnI1N1wy50Q" />
                </div>
                <div className="grow">
                  <h4 className="font-bold text-on-surface group-hover:text-tertiary transition-colors">Twilight Reset</h4>
                  <p className="text-[10px] text-outline uppercase tracking-widest">Recovery • Reishi • 30min</p>
                </div>
                <div className="pr-4">
                  <span className="material-symbols-outlined text-outline">chevron_right</span>
                </div>
              </div>

              <div className="glass-card rounded-xl p-2 flex items-center gap-4 hover:translate-x-2 transition-transform cursor-pointer group">
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                  <img className="w-full h-full object-cover" alt="Zenith Flow" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnCXOwZdvG0b_87Xc2HRXA1jIc76YzUI35weUoq78WOmntmYn1eLMoc-uFgxH_VOx4bF0rHm1ld71ovzuxausMQkui-MvFrMHYSIc-2hFbGOOM2zNNzjc1F7o5MiZVWa88HLWN8UG8MXy-maAwWocuD60te8lLvlCQr7vStYJQfGM1PodxHBjMIjSLoJoPZKRjNIFhtAaWnzIWhZQLB22egSiqmUzzI9B5ebPvnn8mlZ8-On1sDTlz6nVKYjZk0JVLwv0tD45D0w" />
                </div>
                <div className="grow">
                  <h4 className="font-bold text-on-surface group-hover:text-tertiary transition-colors">Zenith Flow</h4>
                  <p className="text-[10px] text-outline uppercase tracking-widest">Vibrancy • Ashwagandha • 10min</p>
                </div>
                <div className="pr-4">
                  <span className="material-symbols-outlined text-outline">chevron_right</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-xl bg-linear-to-br from-surface-container-low to-surface border border-outline-variant/10">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-headline font-bold text-sm uppercase tracking-widest">Ritual Impact</h4>
                <span className="text-tertiary text-xs font-bold">+24% Flow State</span>
              </div>
              <div className="flex items-end justify-between gap-1 h-24">
                <div className="w-full bg-tertiary/20 h-[40%] rounded-t-sm"></div>
                <div className="w-full bg-tertiary/20 h-[65%] rounded-t-sm"></div>
                <div className="w-full bg-tertiary/20 h-[50%] rounded-t-sm"></div>
                <div className="w-full bg-tertiary/40 h-[85%] rounded-t-sm"></div>
                <div className="w-full bg-tertiary/20 h-[60%] rounded-t-sm"></div>
                <div className="w-full bg-tertiary h-full rounded-t-sm"></div>
                <div className="w-full bg-tertiary/60 h-[75%] rounded-t-sm"></div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[8px] uppercase font-bold text-outline">Mon</span>
                <span className="text-[8px] uppercase font-bold text-outline">Sun</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <nav className="md:hidden fixed bottom-0 w-full glass-card border-t border-outline-variant/10 flex justify-around items-center py-4 z-50">
        <NavLink to="/dashboard" end className={mobileClass}>
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold uppercase">Home</span>
        </NavLink>
        <NavLink to="/dashboard/rituals" className={mobileClass}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          <span className="text-[10px] font-bold uppercase">Rituals</span>
        </NavLink>
        <div className="relative -top-6">
          <button type="button" className="w-14 h-14 rounded-full gold-shimmer shadow-lg shadow-tertiary/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-surface">add</span>
          </button>
        </div>
        <NavLink to="/dashboard/orders" className={mobileClass}>
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="text-[10px] font-bold uppercase">Orders</span>
        </NavLink>
        <NavLink to="/dashboard/settings" className={mobileClass}>
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-bold uppercase">Profile</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default UserRituals;
