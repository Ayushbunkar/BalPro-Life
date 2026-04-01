import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import UserSidebar from './UserSidebar';

const mobileClass = ({ isActive }) =>
  `flex flex-col items-center gap-1 ${isActive ? 'text-tertiary' : 'text-outline'}`;

const UserRituals = () => {
  return (
    <div className="font-body selection:bg-tertiary selection:text-surface antialiased bg-[#140d0a] text-[#efdfd9] min-h-screen">
      <UserSidebar />

      <main className="md:ml-72 min-h-screen pb-32">
        <header className="p-8 md:p-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-tertiary/40"></span>
              <span className="text-tertiary font-headline font-bold tracking-[0.3em] text-[10px] uppercase">The Sanctuary Dashboard</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-headline font-black text-on-surface tracking-tighter leading-[0.9] mb-6">Daily <span className="text-tertiary italic">Rituals</span></h2>
            <p className="text-primary-fixed-dim/70 text-lg md:text-xl max-w-xl leading-relaxed">Align your circadian flow with functional botanicals and precision wellness protocols.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-6 rounded-3xl flex items-center gap-6 bg-[rgba(34,26,23,0.4)] backdrop-blur-xl border border-[rgba(239,191,112,0.1)] shadow-[0_0_30px_rgba(239,191,112,0.15)]">
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-outline tracking-widest mb-1">Ritual Sync</p>
                <p className="font-headline font-black text-2xl text-tertiary">94% <span className="text-[10px] font-bold text-outline-variant ml-1">Consistency</span></p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-tertiary/10 border border-tertiary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary text-3xl">trending_up</span>
              </div>
            </div>
          </div>
        </header>

        <section className="px-8 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-10">
            <div className="rounded-[2.5rem] p-10 relative overflow-hidden group border border-white/5 bg-[rgba(34,26,23,0.4)] backdrop-blur-xl">
              <div className="flex justify-between items-center mb-12 relative z-10">
                <div className="flex items-center gap-4">
                  <h3 className="font-headline font-bold text-3xl tracking-tight">Timeline</h3>
                  <span className="bg-tertiary/10 text-tertiary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Phase: Flow</span>
                </div>
                <div className="flex p-1 bg-surface-container-highest/50 rounded-full border border-outline-variant/10">
                  <button type="button" className="px-6 py-2 rounded-full bg-tertiary text-surface text-[10px] font-black uppercase tracking-widest">Today</button>
                  <button type="button" className="px-6 py-2 rounded-full text-outline text-[10px] font-bold uppercase tracking-widest hover:text-on-surface transition-colors">Week</button>
                </div>
              </div>

              <div className="space-y-12 relative z-10">
                <div className="flex gap-8 group/item">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full border-2 border-tertiary flex items-center justify-center mb-2 bg-surface shadow-[0_0_15px_rgba(239,191,112,0.3)]">
                      <span className="text-[11px] font-black text-tertiary">07:30</span>
                    </div>
                    <div className="w-px grow bg-linear-to-b from-tertiary to-transparent"></div>
                  </div>
                  <div className="grow rounded-3xl p-8 hover:bg-surface-container-highest transition-all duration-500 group-hover/item:-translate-y-1 border border-tertiary/20 bg-[rgba(34,26,23,0.4)] backdrop-blur-xl">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-lg bg-tertiary/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-tertiary text-xl">wb_sunny</span>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-tertiary">Cognitive Launch</span>
                        </div>
                        <h4 className="font-headline font-black text-2xl mb-3">Cacao Nootropic Activation</h4>
                        <p className="text-sm text-outline-variant leading-relaxed mb-6">Designed to clear adenosine receptors and trigger synaptic firing for deep work sessions.</p>
                        <div className="flex gap-4 p-4 rounded-2xl bg-surface/40 border border-outline-variant/10">
                          <div className="shrink-0 flex flex-col justify-center items-center px-3 border-r border-outline-variant/20">
                            <span className="material-symbols-outlined text-tertiary text-lg">local_cafe</span>
                            <span className="text-[8px] font-black uppercase mt-1 text-outline">Prep</span>
                          </div>
                          <p className="text-xs text-on-surface/80 leading-relaxed italic">"Whisk 2 scoops into 200ml oat milk (80C). Add a pinch of sea salt. Hold mug with both hands for 30s before first sip."</p>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 border-tertiary/30 flex items-center justify-center bg-tertiary shadow-lg shadow-tertiary/20">
                        <span className="material-symbols-outlined text-surface font-black">done</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-8 group/item">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full border border-outline-variant/30 flex items-center justify-center mb-2 bg-surface">
                      <span className="text-[11px] font-black text-outline">14:00</span>
                    </div>
                    <div className="w-px grow bg-outline-variant/20"></div>
                  </div>
                  <div className="grow bg-surface-container-low/30 border border-outline-variant/5 p-8 rounded-3xl opacity-60 hover:opacity-100 transition-opacity group-hover/item:-translate-y-1">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-lg bg-outline-variant/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-outline text-xl">bolt</span>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline">Metabolic Engine</span>
                        </div>
                        <h4 className="font-headline font-black text-2xl mb-3">Thermodynamic Reset</h4>
                        <p className="text-sm text-outline-variant leading-relaxed">A secondary metabolic spike to combat the afternoon dip and sustain executive function.</p>
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 border-outline-variant/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-outline">radio_button_unchecked</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-8 group/item">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full border border-outline-variant/30 flex items-center justify-center mb-2 bg-surface">
                      <span className="text-[11px] font-black text-outline">21:30</span>
                    </div>
                  </div>
                  <div className="grow rounded-3xl p-8 hover:bg-surface-container-highest transition-all duration-500 group-hover/item:-translate-y-1 bg-[rgba(34,26,23,0.4)] backdrop-blur-xl border border-white/5">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-lg bg-[#8a9cf4]/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[#8a9cf4] text-xl">dark_mode</span>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a9cf4]">Neural Parasympathetic</span>
                        </div>
                        <h4 className="font-headline font-black text-2xl mb-3">Magnesium Sleep Synthesis</h4>
                        <p className="text-sm text-outline-variant leading-relaxed mb-6">Lowering core temperature and GABA modulation for optimal sleep architecture.</p>
                        <div className="flex gap-4 p-4 rounded-2xl bg-surface/40 border border-outline-variant/10">
                          <div className="shrink-0 flex flex-col justify-center items-center px-3 border-r border-outline-variant/20">
                            <span className="material-symbols-outlined text-[#8a9cf4] text-lg">bedtime</span>
                            <span className="text-[8px] font-black uppercase mt-1 text-outline">Prep</span>
                          </div>
                          <p className="text-xs text-on-surface/80 leading-relaxed italic">"Mix ritual blend into 150ml warm water. Sip slowly while performing the 4-7-8 breathing protocol for 5 minutes."</p>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 border-outline-variant/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-outline">radio_button_unchecked</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-24 -right-24 w-64 h-64 bg-tertiary/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden bg-[rgba(34,26,23,0.4)] backdrop-blur-xl">
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-8">
                    <h4 className="font-headline font-black text-sm uppercase tracking-[0.2em] text-tertiary">Bio-Sync Metrics</h4>
                    <span className="material-symbols-outlined text-tertiary/40">query_stats</span>
                  </div>
                  <div className="space-y-8">
                    <div>
                      <div className="flex justify-between text-[11px] mb-3">
                        <span className="text-outline uppercase font-bold tracking-widest">Focus Depth</span>
                        <span className="font-black text-tertiary">88%</span>
                      </div>
                      <div className="h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-linear-to-r from-tertiary/40 to-tertiary w-[88%] rounded-full shadow-[0_0_10px_rgba(239,191,112,0.4)]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-3">
                        <span className="text-outline uppercase font-bold tracking-widest">Rest Quality</span>
                        <span className="font-black text-primary">72%</span>
                      </div>
                      <div className="h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-linear-to-r from-primary/40 to-primary w-[72%] rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#221a17] p-10 rounded-[2.5rem] border border-outline-variant/10 flex flex-col relative overflow-hidden group">
                <div className="absolute inset-0 bg-linear-to-br from-tertiary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl bg-tertiary/10 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-tertiary text-3xl">auto_graph</span>
                  </div>
                  <h4 className="font-headline font-black text-2xl mb-4 text-on-surface">Weekly Neural Insight</h4>
                  <p className="text-sm text-outline-variant leading-relaxed mb-6">Consistency in your <span className="text-tertiary font-bold">Evening Calm</span> protocol has driven a <span className="text-white font-bold">12% increase</span> in REM cycle duration. Sensory adaptation is peaking.</p>
                  <button type="button" className="mt-auto text-[10px] font-black uppercase tracking-[0.2em] text-tertiary flex items-center gap-2 hover:translate-x-1 transition-transform">
                    View Full Report <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-10">
            <div className="relative group cursor-pointer overflow-hidden rounded-[2.5rem] h-72 flex items-center justify-center border-2 border-dashed border-tertiary/20 hover:border-tertiary/60 transition-all duration-700 bg-surface-container-low">
              <img className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-50 transition-all duration-1000" alt="Designer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxzPCZpNNONgXtNV5BdduoUBSIDS1LeUfYSurdOPDKc8Ef8p-nhtzSChlTpGtdGFoOwu7O4vXncj0jpVO1Gq25_E3DPwr2xpX96ejweWQbjHHCRhhUh3kyEfpuIuEhfH2A-DSiD42wKL_dWc7iGDA06QNtys6ILPITWPHo7o6QSQ2dtm2DfVRiLgDoAGBVKR4JaotcVQ_laLqUV__6EEg1SeiArUSuGbrd07VbG1srooqpGnmPz_WEnIVyMnVm0jcM9qi08Z9rlA" />
              <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent"></div>
              <div className="relative z-10 text-center p-8">
                <div className="w-20 h-20 rounded-full bg-[rgba(34,26,23,0.4)] backdrop-blur-xl border border-tertiary/30 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                  <span className="material-symbols-outlined text-tertiary text-4xl">add</span>
                </div>
                <h3 className="font-headline font-black text-3xl mb-2 text-white">Design Ritual</h3>
                <p className="text-outline text-xs uppercase tracking-[0.2em]">Curate Ingredients • Set Intent</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end px-2">
                <h3 className="font-headline font-black text-2xl">Active Library</h3>
                <Link className="text-[10px] font-black uppercase text-tertiary hover:underline" to="/dashboard/rituals">See All</Link>
              </div>

              {[
                {
                  title: 'The Alchemist Brew',
                  benefit: 'Benefit: Neuro-Clarity',
                  ing: 'Lions Mane',
                  time: '15 MIN',
                  tag: 'Premium Ritual',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9Swjs6h38Y7YJZwaYXqFBpo0ul6KW7t9m6jgrKA9_K8kDjDCbS0lE77TlxYJkWoNxHKG_Y_o79jgVPpU7akD9qsFA9z2eCzChK3Z6JtIwjzuK8Mi-2neB2ZxaFl4e67J1wpc1awTy45aJCcAIqJnIf69NutvGGQJX7AeAhamjfBCdSQzmFn9LwogF-MTpDXO3mNaxq8aWUHNffpPMZghm24nKRDyHjCO2SuXB4Y_L7QT_67o7bMneYu0eJoX35ytQzyEkNR-UMg'
                },
                {
                  title: 'Zenith Flow',
                  benefit: 'Benefit: Metabolic Ignition',
                  ing: 'Ashwagandha',
                  time: '10 MIN',
                  tag: 'Active',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnCXOwZdvG0b_87Xc2HRXA1jIc76YzUI35weUoq78WOmntmYn1eLMoc-uFgxH_VOx4bF0rHm1ld71ovzuxausMQkui-MvFrMHYSIc-2hFbGOOM2zNNzjc1F7o5MiZVWa88HLWN8UG8MXy-maAwWocuD60te8lLvlCQr7vStYJQfGM1PodxHBjMIjSLoJoPZKRjNIFhtAaWnzIWhZQLB22egSiqmUzzI9B5ebPvnn8mlZ8-On1sDTlz6nVKYjZk0JVLwv0tD45D0w'
                }
              ].map((card) => (
                <div key={card.title} className="group relative overflow-hidden rounded-3xl bg-[rgba(34,26,23,0.4)] backdrop-blur-xl border border-white/5 transition-all duration-500 hover:-translate-y-2 shadow-2xl">
                  <div className="h-48 overflow-hidden relative">
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={card.title} src={card.img} />
                    <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-tertiary/20">
                      <span className="text-[8px] font-black text-tertiary uppercase tracking-widest">{card.tag}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-headline font-black text-xl mb-1 text-on-surface">{card.title}</h4>
                        <p className="text-[10px] text-tertiary font-bold uppercase tracking-widest">{card.benefit}</p>
                      </div>
                      <span className="material-symbols-outlined text-outline group-hover:text-tertiary transition-colors">arrow_outward</span>
                    </div>
                    <div className="flex gap-4 border-t border-outline-variant/10 pt-4">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-outline">psychology</span>
                        <span className="text-[9px] font-bold text-outline-variant uppercase">{card.ing}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-outline">schedule</span>
                        <span className="text-[9px] font-bold text-outline-variant uppercase">{card.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-10 rounded-[2.5rem] bg-linear-to-br from-surface-container-low to-background border border-outline-variant/10 relative overflow-hidden">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h4 className="font-headline font-black text-sm uppercase tracking-[0.2em] text-on-surface">Consistency Arc</h4>
                  <p className="text-[10px] text-tertiary font-bold mt-1">LIFETIME PROGRESSION</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-tertiary tracking-tighter">+24%</span>
                  <p className="text-[8px] font-bold text-outline uppercase">Neural Flow</p>
                </div>
              </div>
              <div className="flex items-end justify-between gap-2 h-32">
                <div className="w-full bg-tertiary/10 h-[30%] rounded-xl"></div>
                <div className="w-full bg-tertiary/10 h-[55%] rounded-xl"></div>
                <div className="w-full bg-tertiary/10 h-[45%] rounded-xl"></div>
                <div className="w-full bg-tertiary/30 h-[80%] rounded-xl"></div>
                <div className="w-full bg-tertiary/10 h-[60%] rounded-xl"></div>
                <div className="w-full bg-tertiary h-full rounded-xl shadow-lg shadow-tertiary/20 border-white/10"></div>
                <div className="w-full bg-tertiary/60 h-[75%] rounded-xl"></div>
              </div>
              <div className="mt-8 pt-8 border-t border-outline-variant/10 flex justify-between items-center">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-background bg-tertiary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] text-surface font-bold">star</span>
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-background bg-surface-container flex items-center justify-center">
                    <span className="text-[10px] font-bold">12</span>
                  </div>
                </div>
                <p className="text-[10px] font-bold text-outline-variant uppercase tracking-widest">Longest Streak: 12 Rituals</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <nav className="md:hidden fixed bottom-0 w-full bg-[rgba(34,26,23,0.4)] backdrop-blur-xl border-t border-outline-variant/20 flex justify-around items-center py-5 z-50">
        <NavLink to="/dashboard" end className={mobileClass}>
          <span className="material-symbols-outlined text-2xl">home</span>
          <span className="text-[9px] font-black uppercase tracking-tighter">Home</span>
        </NavLink>
        <NavLink to="/dashboard/rituals" className={mobileClass}>
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          <span className="text-[9px] font-black uppercase tracking-tighter">Rituals</span>
        </NavLink>
        <div className="relative -top-10">
          <button type="button" className="w-16 h-16 rounded-2xl bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] shadow-2xl shadow-tertiary/30 flex items-center justify-center border-t border-white/20">
            <span className="material-symbols-outlined text-surface text-3xl font-black">add</span>
          </button>
        </div>
        <NavLink to="/dashboard/orders" className={mobileClass}>
          <span className="material-symbols-outlined text-2xl">inventory_2</span>
          <span className="text-[9px] font-black uppercase tracking-tighter">Orders</span>
        </NavLink>
        <NavLink to="/dashboard/settings" className={mobileClass}>
          <span className="material-symbols-outlined text-2xl">account_circle</span>
          <span className="text-[9px] font-black uppercase tracking-tighter">Profile</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default UserRituals;
