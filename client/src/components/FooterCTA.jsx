import React from 'react';

const FooterCTA = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="bg-surface-container-high rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-tertiary/5 blur-[120px] rounded-full"></div>
          <div className="relative z-10 space-y-8">
            <h2 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tighter">Ready to Upgrade Your Drink?</h2>
            <p className="text-primary-fixed-dim text-xl max-w-xl mx-auto">Join the club of indulgent high-performers. First order gets a signature Balpro glass.</p>
            <button className="gold-shimmer text-on-tertiary-fixed font-bold px-12 py-6 rounded-full text-lg hover:scale-105 transition-transform shadow-2xl active:scale-95">
              Claim Your First Pack
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterCTA;
