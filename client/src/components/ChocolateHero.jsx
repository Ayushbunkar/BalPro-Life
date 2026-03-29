import React from 'react';

const ChocolateHero = ({ onShopClick }) => {
  return (
    <section className="relative min-h-[calc(100svh-7rem)] flex items-center justify-center overflow-hidden py-2 md:py-4">
      <div className="absolute inset-0 bg-linear-to-b from-surface/0 via-surface/40 to-surface z-10"></div>
      <div className="container mx-auto px-6 relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
        {/* Left Content */}
        <div className="space-y-4 lg:space-y-5">
          <span className="text-tertiary font-bold tracking-[0.2em] uppercase text-sm block">Functional Cacao</span>
          <h1 className="font-headline text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-tight text-on-surface">
            Chocolate Nutrition, <span className="text-tertiary italic font-normal">Reimagined.</span>
          </h1>
          <p className="text-primary-fixed-dim text-lg md:text-xl max-w-lg leading-relaxed">
            A velvet-smooth fusion of organic cacao, adaptogens, and pure plant protein. Indulgence that fuels your peak performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-1">
            <button 
              onClick={onShopClick}
              className="gold-shimmer text-on-tertiary-fixed font-bold px-10 py-5 rounded-full hover:scale-105 transition-transform shadow-xl active:scale-95"
            >
              Shop Now
            </button>
          </div>
        </div>

        {/* Right Content - Product Image */}
        <div className="relative flex justify-center items-center h-64 md:h-[340px] lg:h-[430px]">
          <div className="absolute inset-0 bg-tertiary/10 blur-[120px] rounded-full"></div>
          <img
            alt="Premium Chocolate Beverage"
            className="relative z-10 w-[62%] md:w-[58%] lg:w-[52%] max-w-[300px] h-auto drop-shadow-[0_26px_28px_rgba(0,0,0,0.44)] transform rotate-2"
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
