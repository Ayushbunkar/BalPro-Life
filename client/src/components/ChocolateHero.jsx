import React from 'react';

const ChocolateHero = ({ onShopClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface/0 via-surface/40 to-surface z-10"></div>
      <div className="container mx-auto px-6 relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <span className="text-tertiary font-bold tracking-[0.2em] uppercase text-sm block">Functional Cacao</span>
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-tight text-on-surface">
            Chocolate Nutrition, <span className="text-tertiary italic font-normal">Reimagined.</span>
          </h1>
          <p className="text-primary-fixed-dim text-lg md:text-xl max-w-lg leading-relaxed">
            A velvet-smooth fusion of organic cacao, adaptogens, and pure plant protein. Indulgence that fuels your peak performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={onShopClick}
              className="gold-shimmer text-on-tertiary-fixed font-bold px-10 py-5 rounded-full hover:scale-105 transition-transform shadow-xl active:scale-95"
            >
              Shop Now
            </button>
            <button className="bg-transparent border border-outline-variant/30 text-on-surface font-semibold px-10 py-5 rounded-full hover:bg-surface-container-highest transition-colors active:scale-95">
              The Science
            </button>
          </div>
        </div>

        {/* Right Content - Product Image */}
        <div className="relative flex justify-center items-center h-[500px] lg:h-[700px]">
          <div className="absolute inset-0 bg-tertiary/10 blur-[120px] rounded-full"></div>
          <img
            alt="Premium Chocolate Beverage"
            className="relative z-10 w-full max-w-md h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] transform rotate-6"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcDewhjH4kTrAPpiUxIZc0eTIHCAgBm7WZEEkoKGW_YzMG9IGZINGKVwkaBg9D1M1SVMel7w3leGWBiFGA3YHbvGibdqRcEsqJR7Ksjst2uZ6-_rnW9KGm_Q16K8X0AaTtjYByGQ4T66BrvyS4ADV-Hq43VmbRaLgpz-PGFFYsBpLs8vL7yelLcayt4s4Y_1_jCtWwLJXbfsXulKC-0ZdmfEXzKjo1LqtAQafGk_I0P2aDPQ5RnFhKrUoADZ094FaPWXMWPvUNTw"
          />
          <div className="absolute top-20 right-0 w-16 h-16 bg-tertiary/20 backdrop-blur-md rounded-full border border-tertiary/30 animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-8 h-8 bg-tertiary/10 backdrop-blur-sm rounded-full border border-tertiary/20"></div>
        </div>
      </div>
    </section>
  );
};

export default ChocolateHero;
