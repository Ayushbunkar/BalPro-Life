import React from 'react';

const WhyBalpro = () => {
  const features = [
    {
      icon: 'compost',
      title: 'Pure Ingredients',
      description: 'Ethically sourced Peruvian cacao and premium adaptogens. No fillers, ever.'
    },
    {
      icon: 'restaurant',
      title: 'Refined Taste',
      description: 'A silky texture that rivals artisanal patisseries without the guilt.'
    },
    {
      icon: 'bolt',
      title: 'Peak Function',
      description: 'Designed to enhance mental clarity and sustained metabolic energy.'
    },
    {
      icon: 'fitness_center',
      title: 'Performance',
      description: '20g of plant protein for optimal muscle recovery and satiety.'
    }
  ];

  return (
    <section className="py-32">
      <div className="max-w-[1380px] mx-auto px-6 md:px-10 xl:px-14">
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">Built for the Discerning.</h2>
          <p className="text-primary-fixed-dim">Every sip is a result of meticulous sourcing and biological optimization.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="relative overflow-hidden p-8 rounded-4xl bg-surface-container-low border border-outline-variant/10 hover:border-tertiary/30 transition-all duration-500 group min-h-[270px]"
            >
              <div className="absolute -top-10 -right-8 w-24 h-24 rounded-full bg-tertiary/10 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-14 h-14 bg-surface-container-highest rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-tertiary text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-on-surface-variant text-[1.05rem] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBalpro;
