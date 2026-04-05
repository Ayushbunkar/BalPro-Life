import React from 'react';

const IngredientsSection = () => {
  const ingredients = [
    {
      icon: 'nutrition',
      title: 'Raw Cacao',
      description: 'High in flavonoids for cognitive health and natural nitric oxide production.'
    },
    {
      icon: 'fitness_center',
      title: 'Pea Isolate',
      description: 'Clean, plant-based protein with a complete amino acid profile for muscle repair.'
    },
    {
      icon: 'spa',
      title: 'Adaptogens',
      description: 'Ashwagandha and Lion\'s Mane to modulate stress response and focus.'
    }
  ];

  return (
    <section className="py-32 bg-surface-container-low/30" id="ingredients">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="font-headline text-4xl font-bold mb-4">No Secrets. Just Science.</h2>
            <p className="text-on-surface-variant">Hover over our core ingredients to see how they transform your daily biology.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ingredients.map((ingredient, idx) => (
            <div key={idx} className="glass-panel p-8 rounded-4xl relative group overflow-hidden min-h-[270px] flex flex-col justify-between border border-outline-variant/10 hover:border-tertiary/30 transition-all duration-500">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-surface-container-highest/80 border border-outline-variant/10 flex items-center justify-center group-hover:bg-tertiary/15 transition-colors">
                  <span className="material-symbols-outlined text-2xl text-tertiary">{ingredient.icon}</span>
                </div>
                <span className="text-xs font-bold text-tertiary/70 tracking-[0.2em]">0{idx + 1}</span>
              </div>

              <div className="relative z-10 mt-8">
                <h3 className="text-tertiary text-4xl md:text-3xl font-bold mb-4 leading-tight">{ingredient.title}</h3>
                <p className="text-on-surface-variant text-lg md:text-base leading-relaxed">{ingredient.description}</p>
              </div>

              <div className="absolute inset-0 bg-linear-to-t from-tertiary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IngredientsSection;
