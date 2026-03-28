import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="bg-surface text-on-surface font-body selection:bg-tertiary/30">
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              alt="Luxury chocolate texture close-up"
              className="w-full h-full object-cover opacity-30 grayscale"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCW_3N0312zFXH8pE9H0x5JRLN-vLKsKS-sdS42VsmpgRRqB5FdIvyONT1LAFlpFmIHtYRfoxfXXng8O3R2xfdhHClYcDRN29MNzu9dNYwFghvptQKSUpmivJaDc-yURx9MLqcHnrT7USAm-F4xzxAEYbRoEV0mOWYN8re1yaEEiwFP0MTCZnxVnS-g2GZjzuNFpaN-_edwlqGP_blBx6gjDW1QB5AZXDUG3knNvo0HqVLNhlC9soLJIIo8tRe1oEJNZiTwPX_cXA"
            />
            <div className="absolute inset-0 bg-linear-to-b from-surface/0 via-surface/60 to-surface"></div>
          </div>
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <span className="text-tertiary font-label tracking-[0.3em] uppercase text-sm mb-6 block">The Liquid Curator</span>
            <h1 className="font-headline text-5xl md:text-8xl font-extrabold text-on-surface tracking-tighter leading-[0.9] mb-12">
              Crafted for the <span className="italic text-tertiary">Indulgent</span> Mind.
            </h1>
            <p className="text-primary-fixed-dim text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-body">
              We believe wellness should not be a chore. It should be a ritual, a moment of pure cocoa-infused
              transcendence designed for the high-performer.
            </p>
          </div>
        </section>

        {/* Story Timeline Section */}
        <section className="py-32 bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
              <div className="md:sticky md:top-40">
                <h2 className="font-headline text-4xl md:text-6xl font-bold text-on-surface mb-8">
                  The Genesis of <br />Liquid Gold
                </h2>
                <p className="text-primary-fixed-dim text-lg leading-relaxed mb-8">
                  Our journey was not born in a lab, but in a kitchen where the pursuit of the perfect functional
                  beverage became an obsession.
                </p>
                <div className="h-0.5 w-24 bg-tertiary/30"></div>
              </div>
              <div className="space-y-32">
                <div className="relative pl-12 border-l border-outline-variant/30">
                  <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-tertiary"></span>
                  <span className="text-tertiary font-headline text-2xl font-bold mb-4 block">2020: The Spark</span>
                  <p className="text-on-surface-variant font-body leading-relaxed">
                    Searching for a way to balance high-stress executive life with nutritional density, our founder began
                    experimenting with raw ceremonial cacao and adaptogens.
                  </p>
                </div>
                <div className="relative pl-12 border-l border-outline-variant/30">
                  <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-tertiary"></span>
                  <span className="text-tertiary font-headline text-2xl font-bold mb-4 block">2022: The Breakthrough</span>
                  <p className="text-on-surface-variant font-body leading-relaxed">
                    After 400+ iterations, we perfected the Liquid Silk formula, a blend that tastes like luxury dessert
                    but fuels the brain like a biohacker secret weapon.
                  </p>
                </div>
                <div className="relative pl-12 border-l border-outline-variant/30">
                  <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-tertiary"></span>
                  <span className="text-tertiary font-headline text-2xl font-bold mb-4 block">2024: Balpro Life</span>
                  <p className="text-on-surface-variant font-body leading-relaxed">
                    Launching a brand that treats beverages as editorial pieces. We do not just sell drinks; we curate an
                    elevated way of living.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="py-24 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="rounded-xl p-12 hover:scale-[1.02] transition-all duration-500 bg-[rgba(60,51,47,0.4)] backdrop-blur-[20px]">
              <span className="material-symbols-outlined text-tertiary text-4xl mb-6 block">auto_awesome</span>
              <h3 className="font-headline text-3xl font-bold text-on-surface mb-6">Our Mission</h3>
              <p className="text-on-surface-variant leading-relaxed text-lg">
                To redefine functional nutrition through the lens of luxury, proving that the most beneficial choices can
                also be the most delicious ones.
              </p>
            </div>
            <div className="rounded-xl p-12 hover:scale-[1.02] transition-all duration-500 bg-[rgba(60,51,47,0.4)] backdrop-blur-[20px]">
              <span className="material-symbols-outlined text-tertiary text-4xl mb-6 block">visibility</span>
              <h3 className="font-headline text-3xl font-bold text-on-surface mb-6">Our Vision</h3>
              <p className="text-on-surface-variant leading-relaxed text-lg">
                To become the global standard for high-performance indulgence, where every Balpro moment is a celebration
                of self-optimization.
              </p>
            </div>
          </div>
        </section>

        {/* Founder Story */}
        <section className="py-32 bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-20">
              <div className="w-full md:w-1/2 relative group">
                <div className="absolute -inset-4 bg-tertiary/10 rounded-lg blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                <img
                  alt="Founder portrait"
                  className="relative w-full aspect-4/5 object-cover rounded-lg shadow-2xl"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-Wkl-EYbi7ToGlfKdfms7AV2hk6Zn2IUf_kklZpCntWUY3PDBROQcyKa7WgOcf89ougEjscSHWHuP6WFG2ySZtcRsweMC7YaqEeN1UGTHOGoKYhhgSapLeaYhgPmE8iG2Xl6Pj8ln8UV0f56_d8C_ritoP9xf3VxsuTxp9PzhMkKfJe178bSF3VkxSkDgYcHpg9SBoWoIzuA-XJvTmj074ACSmKXkaxUSOMeVcjvM64Zz2SpaHD4xM7pUD9N0-_FkQKwExiWCfA"
                />
                <div className="absolute bottom-8 left-8 bg-surface/80 backdrop-blur-md px-6 py-4 rounded-md">
                  <p className="font-headline font-bold text-tertiary">Marcus Sterling</p>
                  <p className="text-xs tracking-widest uppercase text-primary-fixed-dim">Founder and Curator</p>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <span className="text-tertiary font-label tracking-widest uppercase text-xs mb-4 block">Note from the Curator</span>
                <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-surface mb-8 leading-tight">
                  Luxury is the ultimate performance enhancer.
                </h2>
                <div className="space-y-6 text-on-surface-variant leading-relaxed text-lg italic">
                  <p>
                    I spent years in the boardroom feeling drained. The health options were chalky and uninspiring.
                    Balpro was born from the belief that when you treat your body to something truly exquisite, your mind
                    follows suit.
                  </p>
                  <p>
                    We sourced the finest cacao from volcanic soils and paired it with clinically-dosed adaptogens. The
                    result is a drink that respects your palate as much as it respects your biology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Philosophy */}
        <section className="py-32 bg-surface-container-low overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-24">
              <h2 className="font-headline text-4xl md:text-6xl font-bold text-on-surface mb-6">The Balpro Promise</h2>
              <p className="text-primary-fixed-dim max-w-2xl mx-auto">
                Uncompromising standards. Unrivaled taste. Unmatched clarity.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div className="text-center group">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 transition-transform group-hover:rotate-12 bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)]">
                  <span className="material-symbols-outlined text-on-tertiary-fixed text-3xl">eco</span>
                </div>
                <h4 className="font-headline text-xl font-bold mb-4">Ethical Sourcing</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Direct-trade cacao from regenerative farms that honor the earth and the hands that harvest.
                </p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 transition-transform group-hover:rotate-12 bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)]">
                  <span className="material-symbols-outlined text-on-tertiary-fixed text-3xl">science</span>
                </div>
                <h4 className="font-headline text-xl font-bold mb-4">Purity First</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  No fillers. No refined sugars. No compromise. Just pure functional botanical power.
                </p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 transition-transform group-hover:rotate-12 bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)]">
                  <span className="material-symbols-outlined text-on-tertiary-fixed text-3xl">workspace_premium</span>
                </div>
                <h4 className="font-headline text-xl font-bold mb-4">Artisanal Quality</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Small-batch production ensures that every single drop meets our Gold Standard of excellence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-40 bg-surface">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="relative inline-block mb-12">
              <div className="absolute inset-0 blur-3xl opacity-20 animate-pulse bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)]"></div>
              <h2 className="relative font-headline text-5xl md:text-7xl font-extrabold text-on-surface tracking-tighter leading-tight">
                Experience the <br />Curated Life.
              </h2>
            </div>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Link
                className="text-on-tertiary-fixed px-12 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl shadow-tertiary/10 bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)]"
                to="/"
              >
                Shop the Collection
              </Link>
              <a
                className="px-12 py-5 rounded-full border border-outline-variant/30 text-on-surface hover:bg-surface-container-highest transition-all duration-300"
                href="/#ingredients"
              >
                Explore Ingredients
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
