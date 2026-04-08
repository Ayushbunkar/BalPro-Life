import React from 'react';
import { Link } from 'react-router-dom';

const ProductSpotlight = () => {
  return (
    <section className="py-10 md:py-14 bg-surface min-h-[calc(100svh-6rem)] flex items-center px-2 sm:px-4 md:px-6">
      <div className="w-full max-w-[1150px] mx-auto">
        <div className="bg-surface-container-low rounded-[3rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl border border-outline-variant/5 min-h-[520px] lg:min-h-[calc(100svh-10rem)]">
          <div className="lg:w-1/2 relative h-80 md:h-[380px] lg:h-auto overflow-hidden">
            <img
              alt="Chocolate Pour"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvorfHoZEA14e2xMjROu4Mb1CMStVIq6Dx4IEflViJBqHOD8WSDADm3eJ8x-Grw3HlXWrSnGzgb9EQqLnk9HJ6unn3i6bhMa22ZgF5SWO-1I4kcyVdCLKU1AMUNwluCG8dXXwPudeo9S3GKtqOIdklW_GomoMbAZxtSgMHoPR5UvZMLNHnaVgGHMHcrrmEDx1aKfduB_35bSY4-HSKODUChPOYxXjMLoc7CdAd62s0DJ8aLH6bLRbL9AEXT1HXVrbOfwI65ZJGeg"
            />
            <div className="absolute inset-0 bg-linear-to-r from-surface-container-low/80 to-transparent"></div>
          </div>
          
          <div className="lg:w-1/2 p-8 md:p-10 lg:p-12 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center px-4 py-1 rounded-full border border-tertiary/30 text-tertiary text-xs font-bold uppercase tracking-widest w-fit">
              The Masterpiece
            </div>
            <h2 className="font-headline text-4xl lg:text-5xl font-extrabold text-on-surface">Signature Smooth Protein</h2>
            <p className="text-primary-fixed-dim text-lg leading-relaxed">
              Packed with protein and daily nutrition to keep you active, strong, and energized throughout the day.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <span className="material-symbols-outlined text-tertiary">check_circle</span>
                <span>No Added Sugars</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="material-symbols-outlined text-tertiary">check_circle</span>
                <span>Rich in Fiber</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="material-symbols-outlined text-tertiary">check_circle</span>
                <span>High in Protein</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="material-symbols-outlined text-tertiary">check_circle</span>
                <span>All Essential Amino Acids</span>
              </li>
            </ul>
            <Link
              to="/products"
              className="gold-shimmer text-on-tertiary-fixed font-bold px-10 py-4 rounded-full w-full lg:w-fit transition-all hover:shadow-[0_0_30px_rgba(239,191,112,0.3)] inline-flex items-center justify-center"
            >
              Explore Signature
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSpotlight;
