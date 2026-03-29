import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WinFreeDrinkPage = () => {
  const navigate = useNavigate();
  const [codeInput, setCodeInput] = useState('');

  const handleReveal = () => {
    if (codeInput.trim()) {
      navigate('/enter-code');
      setCodeInput('');
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-tertiary selection:text-on-tertiary">
      <main className="relative overflow-hidden min-h-screen">
        <section id="experience" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#19120f] to-[#19120f] z-10"></div>
            <img
              alt="Cinematic macro shot of rich dark liquid chocolate"
              className="w-full h-full object-cover opacity-40 scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuARjq6ElDvmeeOgLGmLvgqfj_bXwXSHnaiLHkzbSM5kRlTB2F94QiJtFyd7Q7_AEuoxn0873mLz0XRE2-VEONCLwQvZES-7zkRtvIqBIp7WI2No2GNjGukNYIRhXKIm7lZVKnpqj0RWgAxoGBV2-Dzup9_Ovq_bmejY-h80Iq0VF2R26rd2BwQddO3L2REPbaMB8cVgC4uI8B8rR1zAYRZSLD6iTnbvicc_EopSHrk9WqtCq4ze5-Jp6l5qW33Oj0QaqF4fQAJEIA"
            />
          </div>
          <div className="relative z-20 container mx-auto px-6 text-center">
            <span className="inline-block py-2 px-4 rounded-full bg-[#3c332f] text-tertiary text-xs font-bold tracking-[0.2em] uppercase mb-8">The Liquid Curator Presents</span>
            <h1 className="font-['Epilogue'] text-5xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-[0.9]">
              Scan. Play.<br />
              <span className="text-tertiary">Win Free Drinks</span>
            </h1>
            <p className="max-w-xl mx-auto text-primary-fixed-dim text-lg mb-12 leading-relaxed">
              Your daily cacao ritual just gained a new dimension. Unlock the game of chance and excellence hidden within every tetra pack.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => navigate('/enter-code')}
                className="gold-shimmer rounded-full px-10 py-5 text-on-tertiary font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-tertiary/10"
              >
                Start Your Ritual
              </button>
              <button
                onClick={() => navigate('/how-it-works')}
                className="rounded-full px-10 py-5 border border-outline-variant/30 text-on-surface font-bold text-lg hover:bg-surface-variant/20 transition-all"
              >
                How it Works
              </button>
            </div>
          </div>
        </section>

        <section className="py-32 container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="font-['Epilogue'] text-4xl md:text-6xl font-bold tracking-tight text-on-surface mb-4">The Three-Step Path</h2>
            <p className="text-on-surface-variant max-w-lg mx-auto">Master the rhythm of the ritual to claim your liquid excellence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-[#261e1a]/60 backdrop-blur-[20px] border border-[#4f4440]/15 rounded-xl p-10 group hover:-translate-y-2 transition-transform duration-500">
              <div className="w-16 h-16 rounded-lg bg-surface-container-high flex items-center justify-center mb-8 group-hover:gold-shimmer transition-colors">
                <span className="material-symbols-outlined text-tertiary group-hover:text-on-tertiary text-3xl">qr_code_scanner</span>
              </div>
              <h3 className="font-['Epilogue'] text-2xl font-bold mb-4">Enter Code</h3>
              <p className="text-on-surface-variant leading-relaxed">Locate the hidden ritual code on the seal of your Balpro Life tetra pack and enter it here.</p>
            </div>
            <div className="bg-[#261e1a]/60 backdrop-blur-[20px] border border-[#4f4440]/15 rounded-xl p-10 group hover:-translate-y-2 transition-transform duration-500">
              <div className="w-16 h-16 rounded-lg bg-surface-container-high flex items-center justify-center mb-8 group-hover:gold-shimmer transition-colors">
                <span className="material-symbols-outlined text-tertiary group-hover:text-on-tertiary text-3xl">casino</span>
              </div>
              <h3 className="font-['Epilogue'] text-2xl font-bold mb-4">Pick Number</h3>
              <p className="text-on-surface-variant leading-relaxed">Choose your destined number from the 1-100 cosmic wheel and play your luck.</p>
            </div>
            <div className="bg-[#261e1a]/60 backdrop-blur-[20px] border border-[#4f4440]/15 rounded-xl p-10 group hover:-translate-y-2 transition-transform duration-500">
              <div className="w-16 h-16 rounded-lg bg-surface-container-high flex items-center justify-center mb-8 group-hover:gold-shimmer transition-colors">
                <span className="material-symbols-outlined text-tertiary group-hover:text-on-tertiary text-3xl">redeem</span>
              </div>
              <h3 className="font-['Epilogue'] text-2xl font-bold mb-4">Win Rewards</h3>
              <p className="text-on-surface-variant leading-relaxed">Instantly unlock free drinks, rare discounts, or exclusive limited-edition Balpro merchandise.</p>
            </div>
          </div>
        </section>

        <section id="rewards" className="bg-surface-container-low py-32 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-2xl">
                <span className="text-tertiary font-bold tracking-widest text-sm uppercase mb-4 block">The Vault</span>
                <h2 className="font-['Epilogue'] text-4xl md:text-6xl font-bold tracking-tight">Rewards of Excellence</h2>
              </div>
              <button className="text-tertiary font-bold border-b border-tertiary pb-1 hover:brightness-110 transition-all">View Full Catalogue</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative rounded-xl overflow-hidden min-h-[500px] flex items-end p-12 group">
                <img
                  alt="Premium minimal beverage packaging"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW4zS1Bw4ocnfFbGOaIua8XZWSgPFn4poQnvQMdpPJouZOdw4RQPjCHTW8nKj7SJfPcTyJeRQXnNFCRHpfWQTi5Hxhf-_9ZQI37X1IQbNJpFcXJW_9akWkE8OxlQloU4pf6muijjOWW05LbYppDWBDHcEPCHn89M8hnWck2euyk9tSdyX8DzTpv9452E_oElI_eEaT-jgBJfqE6Zy2rROFTWmZgoS4WnjYzHNO09PsuvjwOIKwh376TWiceeBoLkO9BfvP6Ul4-w"
                />
                <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/40 to-transparent"></div>
                <div className="relative z-10">
                  <span className="bg-tertiary text-on-tertiary px-4 py-1 rounded-full text-xs font-bold mb-4 inline-block">MOST POPULAR</span>
                  <h3 className="font-['Epilogue'] text-4xl font-bold mb-4">The Free Tetra Pack</h3>
                  <p className="text-primary-fixed-dim max-w-md mb-8">Receive a voucher for a complimentary 330ml Balpro Life Experience pack at any partner location.</p>
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <div className="bg-[#261e1a]/60 backdrop-blur-[20px] border border-[#4f4440]/15 flex-1 rounded-xl p-8 flex items-center gap-8 group">
                  <div className="w-32 h-32 rounded-lg bg-surface-container overflow-hidden shrink-0">
                    <img
                      alt="A luxury gift card"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWZYIYk8QPVdL1NjT5_nM6B5PU67PXy8pYwPDYb0brNiln0hxE-AqyrZHA_iRNvU4H5yDVIheKeFs7vCw6UC-vvihKw1KgkCtqgcKmvjEn55GC-v1uQFAeSHapyYJ9GbzKbBnxD4d1p6pto_IbDTJkYgPnpgYVANPf7bLFMdtk1bk8Svyufqm4p-m8FI8K-9Mk9L-llbCknp14JtwQLGtnuuAvtAC54DY1eRkd_2tG9cIPDIv4LUnK8VHTNuIAwIZ8EeluFfsvHg"
                    />
                  </div>
                  <div>
                    <h4 className="font-['Epilogue'] text-xl font-bold mb-2">Rare Discounts</h4>
                    <p className="text-on-surface-variant text-sm mb-4">Unlock 25%, 50%, or even 100% off your next subscription bundle.</p>
                    <span className="text-tertiary text-sm font-bold">1 in 10 chance</span>
                  </div>
                </div>
                <div className="bg-[#261e1a]/60 backdrop-blur-[20px] border border-[#4f4440]/15 flex-1 rounded-xl p-8 flex items-center gap-8 group">
                  <div className="w-32 h-32 rounded-lg bg-surface-container overflow-hidden shrink-0">
                    <img
                      alt="A minimalist ceramic mug"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-Z6KQQAsIc5I6j0yvWbFy4CvD7pxGOVcokiDsLHuga62eXRmz0Cu3zNS8PeUXDQWJrlrzo_mXmxZbmszP792p81BEBbjdqCSul6JB1xf5Lclmtn_Ep6AXkXJYLIZU3SsBOLo3CaMstltpxGGWxQeF17cJUf7in4z4cOD_usElgD_VJJD3Ts8dti14p1OHKzPr1GvCazY4dgrFj-rNQRF1tKelt-sDwiEk2LYfpgBucvExEULdzLm0jQSnrm74kEA73gsbLxumyA"
                    />
                  </div>
                  <div>
                    <h4 className="font-['Epilogue'] text-xl font-bold mb-2">Merch Drops</h4>
                    <p className="text-on-surface-variant text-sm mb-4">Limited edition ceramic vessels and premium lifestyle apparel.</p>
                    <span className="text-tertiary text-sm font-bold">Exclusive Drops</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
};

export default WinFreeDrinkPage;
