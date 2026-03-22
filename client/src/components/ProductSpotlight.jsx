import React from 'react';

const ProductSpotlight = () => {
  return (
    <section className="py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-surface-container-low rounded-[3rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl border border-outline-variant/5">
          <div className="lg:w-1/2 relative h-[400px] lg:h-auto overflow-hidden">
            <img
              alt="Chocolate Pour"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvorfHoZEA14e2xMjROu4Mb1CMStVIq6Dx4IEflViJBqHOD8WSDADm3eJ8x-Grw3HlXWrSnGzgb9EQqLnk9HJ6unn3i6bhMa22ZgF5SWO-1I4kcyVdCLKU1AMUNwluCG8dXXwPudeo9S3GKtqOIdklW_GomoMbAZxtSgMHoPR5UvZMLNHnaVgGHMHcrrmEDx1aKfduB_35bSY4-HSKODUChPOYxXjMLoc7CdAd62s0DJ8aLH6bLRbL9AEXT1HXVrbOfwI65ZJGeg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface-container-low/80 to-transparent"></div>
          </div>
          
          <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center space-y-8">
            <div className="inline-flex items-center px-4 py-1 rounded-full border border-tertiary/30 text-tertiary text-xs font-bold uppercase tracking-widest w-fit">
              The Masterpiece
            </div>
            <h2 className="font-headline text-4xl lg:text-6xl font-extrabold text-on-surface">Signature Velvet Cacao</h2>
            <p className="text-primary-fixed-dim text-lg leading-relaxed">
              Our flagship formula features 72% single-origin Peruvian cacao, infused with Lion's Mane and 20g of bio-available pea protein. It's the ritual your morning deserves.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <span className="material-symbols-outlined text-tertiary">check_circle</span>
                <span>No Added Sugars</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="material-symbols-outlined text-tertiary">check_circle</span>
                <span>Daily Vitamin Complex</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="material-symbols-outlined text-tertiary">check_circle</span>
                <span>Keto & Vegan Friendly</span>
              </li>
            </ul>
            <button className="gold-shimmer text-on-tertiary-fixed font-bold px-10 py-5 rounded-full w-full lg:w-fit transition-all hover:shadow-[0_0_30px_rgba(239,191,112,0.3)]">
              Explore Signature
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSpotlight;
