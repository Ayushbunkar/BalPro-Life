import React from 'react';

const BrandTrust = () => {
  return (
    <section className="py-12 bg-surface-container-low/50">
      <div className="container mx-auto px-6">
        <p className="text-center text-outline text-xs uppercase tracking-[0.3em] mb-10">As Seen In Premium Curations</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
          <span className="font-headline font-bold text-2xl">VOGUE</span>
          <span className="font-headline font-bold text-2xl">GQ</span>
          <span className="font-headline font-bold text-2xl">WIRED</span>
          <span className="font-headline font-bold text-2xl">FORBES</span>
          <span className="font-headline font-bold text-2xl">ELLE</span>
        </div>
      </div>
    </section>
  );
};

export default BrandTrust;
