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
      description: 'A silky texture that rivals artisanal patisseries without the guilt.',
      marginTop: true
    },
    {
      icon: 'bolt',
      title: 'Peak Function',
      description: 'Designed to enhance mental clarity and sustained metabolic energy.'
    },
    {
      icon: 'fitness_center',
      title: 'Performance',
      description: '20g of plant protein for optimal muscle recovery and satiety.',
      marginTop: true
    }
  ];

  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">Built for the Discerning.</h2>
          <p className="text-primary-fixed-dim">Every sip is a result of meticulous sourcing and biological optimization.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className={`p-8 rounded-xl bg-surface-container-low border border-outline-variant/10 hover:border-tertiary/30 transition-all group ${feature.marginTop ? 'lg:mt-12' : ''}`}
            >
              <div className="w-14 h-14 bg-surface-container-highest rounded-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-tertiary text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBalpro;
