import React from 'react';

const StorySection = () => {
  return (
    <section className="relative min-h-screen py-32 flex items-center" id="story">
      <div className="absolute inset-0 z-0">
        <img
          alt="Cacao Pods"
          className="w-full h-full object-cover opacity-20"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBY4VIcLWGF6wEGhzE77rfE7RVy_tfVOFep7q-fsl3g_LyNLO2zUIwBFJ582dMT0XBqf5m167uRdGJskD4lBE1wDlv282P-VSaJkr2LrNeUqxZlkjRTE-_MF9DMEwFtHM-nAeAhbOeSmJVXDZxmk32kpz1isMySzOCr89bBBhvDMCrRqmI8NGDkY2-seTGJGk-QP3bUSjhttvs4YmLZ_UnJH3A30L-3Z1NMq11D9ZhtNitCU8Vn-997bgTjwjPsaGcfDbqA7eJi9Q"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <span className="text-tertiary font-bold tracking-widest text-xs uppercase mb-6 block">Our Legacy</span>
          <h2 className="font-headline text-5xl md:text-7xl font-bold mb-10 leading-tight">
            The Journey from <span className="text-tertiary">Pod to Performance.</span>
          </h2>
          <div className="space-y-8 text-lg text-primary-fixed-dim leading-relaxed">
            <p>We spent three years traversing the Andean highlands to find a cacao variety that possessed the perfect lipid profile for high-performance nutrition.</p>
            <p>Balpro Life isn't just a drink; it's a testament to the belief that luxury and health shouldn't be mutually exclusive. We combine ancient botanical wisdom with modern nutrient-density mapping.</p>
            <div className="pt-6">
              <a href="#" className="text-tertiary font-bold flex items-center group">
                Discover Our Origin Story
                <span className="material-symbols-outlined ml-2 group-hover:translate-x-2 transition-transform">arrow_right_alt</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
