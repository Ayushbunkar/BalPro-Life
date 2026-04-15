import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import singleBgRemoveImage from '../assets/singlebgremove.png';

const ChocolateHero = ({ onShopClick }) => {
  const bottleRef = useRef(null);

  useEffect(() => {
    if (!bottleRef.current) return undefined;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(bottleRef.current, {
      y: -14,
      rotation: 5,
      scale: 1.02,
      duration: 2.4,
      ease: 'sine.inOut',
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="relative min-h-[calc(100svh-7rem)] flex items-center justify-center overflow-hidden py-2 md:py-4">
      <div className="absolute inset-0 bg-linear-to-b from-surface/0 via-surface/40 to-surface z-10"></div>
      <div className="w-full max-w-[1380px] mx-auto px-6 md:px-10 xl:px-14 relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-4 lg:space-y-5 max-w-[640px] lg:pl-2 xl:pl-4">
          <span className="text-tertiary font-bold tracking-[0.2em] uppercase text-sm block">Daily Protein Nutrition</span>
          <h1 className="font-headline text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-tight text-on-surface">
            Chocolate Nutrition, <span className="text-tertiary italic font-normal">Reimagined.</span>
          </h1>
          <p className="text-primary-fixed-dim text-lg md:text-xl max-w-lg leading-relaxed">
            A smooth, protein rich drink that fuels your strength, energy, and everyday performance without the extra sugar.
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
        <div className="relative flex justify-center lg:justify-end items-center h-72 md:h-[400px] lg:h-[500px]">
          <img
            ref={bottleRef}
            alt="Premium Chocolate Beverage"
            className="relative z-10 w-[78%] md:w-[70%] lg:w-[64%] max-w-[430px] h-auto drop-shadow-[0_34px_36px_rgba(0,0,0,0.48)] origin-bottom"
            src={singleBgRemoveImage}
          />
        </div>
      </div>
    </section>
  );
};

export default ChocolateHero;
