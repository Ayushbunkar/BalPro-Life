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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {ingredients.map((ingredient, idx) => (
            <div key={idx} className="glass-panel p-10 rounded-xl relative group overflow-hidden h-[400px] flex flex-col justify-end">
              <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-6xl text-tertiary">{ingredient.icon}</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-tertiary text-2xl font-bold mb-4">{ingredient.title}</h3>
                <p className="text-on-surface opacity-70 group-hover:opacity-100 transition-opacity">{ingredient.description}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-tertiary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IngredientsSection;
