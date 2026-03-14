import React, { useRef, useEffect, useState } from 'react';
import { Target, Leaf, Zap, Heart, Award, ShieldCheck } from 'lucide-react';
//cghgnvhmsadassdfsdfkmdfdfvcbgxbnkvbndssdffdggf
const features = [
  {
    id: 1,
    icon: Target,
    title: 'Muscle Recovery',
    description:
      '20g of high-quality protein supports muscle repair and recovery after intense workouts.',
    headerBg: 'linear-gradient(135deg, #1D6B3A 0%, #2E8B4A 100%)',
    iconBg: '#FFF3CD',
    iconColor: '#D4A017',
  },
  {
    id: 2,
    icon: Leaf,
    title: 'Plant + Dairy Blend',
    description:
      'Perfect combination of soy protein isolate and low-fat milk for complete amino acid profile.',
    headerBg: 'linear-gradient(135deg, #2E8B4A 0%, #4FAF5A 100%)',
    iconBg: '#D4EDDA',
    iconColor: '#1D6B3A',
  },
  {
    id: 3,
    icon: Zap,
    title: 'Energy Booster',
    description:
      'Natural energy from chia seeds and balanced nutrition to fuel your active lifestyle.',
    headerBg: 'linear-gradient(135deg, #7B4A22 0%, #A0622E 100%)',
    iconBg: '#DBEAFE',
    iconColor: '#1E40AF',
  },
  {
    id: 4,
    icon: Heart,
    title: 'Heart Healthy',
    description:
      'Omega-3 fatty acids from chia seeds support cardiovascular health and wellness.',
    headerBg: 'linear-gradient(135deg, #6B4423 0%, #8B5E3C 100%)',
    iconBg: '#F3E8FF',
    iconColor: '#7C3AED',
  },
  {
    id: 5,
    icon: Award,
    title: 'Naturally Sweetened',
    description:
      'Zero added sugar, naturally sweetened with stevia for guilt-free indulgence.',
    headerBg: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
    iconBg: '#FFEDD5',
    iconColor: '#EA580C',
  },
  {
    id: 6,
    icon: ShieldCheck,
    title: 'Quality Assured',
    description:
      'Rigorous testing ensures purity, potency, and safety in every serving.',
    headerBg: 'linear-gradient(135deg, #1D6B3A 0%, #15572D 100%)',
    iconBg: '#D1FAE5',
    iconColor: '#059669',
  },
];

const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      // progress 0 → 1 as we scroll through the section
      const rawProgress = -rect.top / (sectionHeight - windowHeight);
      setScrollProgress(Math.min(Math.max(rawProgress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCards = features.length;
  // Each card occupies a slice of the total progress
  const cardSlice = 1 / totalCards;

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${totalCards * 100}vh`, backgroundColor: '#F8F2E9' }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 pt-15 h-screen overflow-hidden flex flex-col items-center">
        {/* Section header — fixed at top with padding */}
        <div className="text-center pt-16 md:pt-20 pb-6 md:pb-8 px-4 relative z-50 shrink-0">
          <p
            className="text-sm font-bold uppercase tracking-[0.3em] mb-2"
            style={{ color: '#1D6B3A' }}
          >
            Why Choose Us
          </p>
          <h2
            className="text-3xl md:text-5xl font-black tracking-tight"
            style={{ color: '#7B4A22' }}
          >
            THE BALPRO ADVANTAGE
          </h2>
        </div>

        {/* Card stack — overflow hidden so stacked cards can't bleed into heading */}
        <div className="relative w-full max-w-2xl mx-auto px-4 flex-1 overflow-hidden" style={{ maxHeight: '400px' }}>
          {features.map((feature, index) => {
            const cardStart = index * cardSlice;
            const cardEnd = cardStart + cardSlice;
            // How far this specific card has progressed (0 → 1)
            const cardProgress = Math.min(
              Math.max((scrollProgress - cardStart) / cardSlice, 0),
              1
            );
            // Card is "active" once its progress > 0
            const isVisible = scrollProgress >= cardStart;

            // Stacking: earlier cards shrink & move up, later cards slide in from bottom
            const stackOffset = Math.min(
              Math.max((scrollProgress - cardEnd) / cardSlice, 0),
              1
            );
            const isStacked = scrollProgress > cardEnd;

            // Translate: arrives from below, then settles, then shrinks up as next card comes
            let translateY = 0;
            let scale = 1;
            let opacity = 0;

            if (!isVisible) {
              // Below viewport – waiting to enter
              translateY = 100;
              opacity = 0;
            } else if (!isStacked) {
              // Currently animating in — slide up from below
              translateY = 100 * (1 - cardProgress);
              scale = 1;
              opacity = 0.2 + 0.8 * cardProgress;
            } else {
              // Stacked behind — stay in place, scale down slightly
              const stackIndex = Math.floor(
                (scrollProgress - cardEnd) / cardSlice
              );
              const clampedStack = Math.min(stackIndex, totalCards - 1);
              translateY = 0;
              scale = 1 - (clampedStack + 1) * 0.03;
              opacity = Math.max(1 - (clampedStack + 1) * 0.18, 0.15);
            }

            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="absolute inset-x-4 rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  opacity,
                  zIndex: index + 1,
                  transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
                  willChange: 'transform, opacity',
                }}
              >
                {/* Card Header */}
                <div
                  className="px-6 py-5 flex items-center gap-4"
                  style={{ background: feature.headerBg }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                    }}
                  >
                    <Icon size={24} color="#fff" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-white/70 text-xs font-bold tracking-wider">
                      {String(index + 1).padStart(2, '0')} / {String(totalCards).padStart(2, '0')}
                    </p>
                    <h3 className="text-white text-xl md:text-2xl font-black tracking-tight">
                      {feature.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="bg-white px-6 py-8">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: feature.iconBg }}
                    >
                      <Icon size={28} color={feature.iconColor} strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-slate-700 text-base md:text-lg leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll progress dots */}
        <div className="flex gap-2 mt-8 relative z-50">
          {features.map((_, index) => {
            const cardStart = index * cardSlice;
            const isCurrent =
              scrollProgress >= cardStart &&
              scrollProgress < cardStart + cardSlice;
            const isPast = scrollProgress >= cardStart + cardSlice;
            return (
              <div
                key={index}
                className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: isCurrent
                    ? '#1D6B3A'
                    : isPast
                    ? '#7B4A22'
                    : '#D1D5DB',
                  transform: isCurrent ? 'scale(1.4)' : 'scale(1)',
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
