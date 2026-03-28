import React from 'react';

const IngredientsPage = () => {
  return (
    <div className="bg-background text-on-background font-body selection:bg-tertiary selection:text-on-tertiary">
      <main className="relative overflow-hidden">
        {/* Floating particles */}
        <div className="absolute top-40 left-10 w-1 h-1 bg-tertiary rounded-full opacity-30"></div>
        <div className="absolute top-80 right-20 w-1 h-1 bg-tertiary rounded-full opacity-30"></div>
        <div className="absolute bottom-40 left-1/4 w-1 h-1 bg-tertiary rounded-full opacity-30"></div>
        <div className="absolute top-1/2 right-10 w-1 h-1 bg-tertiary rounded-full opacity-30"></div>

        {/* Hero */}
        <section className="relative min-h-[calc(100svh-6rem)] flex items-center px-8 py-6 md:py-8 overflow-hidden">
          <div className="max-w-[1440px] mx-auto w-full grid md:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="relative z-10">
              <span className="text-tertiary font-bold tracking-widest text-sm mb-4 block uppercase">Functional Alchemy</span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline font-extrabold text-on-surface leading-[1.1] tracking-tighter mb-6">
                The Science of <br />
                <span className="text-tertiary italic">Indulgent</span> Nutrition.
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant max-w-lg mb-8 lg:mb-10 leading-relaxed">
                Beyond basic supplements. Balpro Life is a meticulously engineered bio-available formula designed to bridge
                the gap between hedonistic cocoa and clinical human performance.
              </p>
              <div className="flex flex-wrap gap-6">
                <button
                  type="button"
                  className="bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] text-on-tertiary-fixed font-bold py-4 px-10 rounded-full hover:scale-105 transition-transform active:scale-95 shadow-xl"
                >
                  Explore Formula
                </button>
                <button
                  type="button"
                  className="border border-outline-variant/30 text-on-surface font-semibold py-4 px-10 rounded-full hover:bg-surface-container-highest transition-colors active:scale-95"
                >
                  Clinical Studies
                </button>
              </div>
            </div>

            <div className="relative w-full max-w-[520px] lg:max-w-[560px] mx-auto md:mx-0 md:ml-auto">
              <div className="absolute inset-0 bg-linear-to-tr from-tertiary/10 to-transparent rounded-full blur-3xl"></div>
              <img
                className="w-full h-auto object-cover rounded-xl relative z-10 transform rotate-0 md:-rotate-2 hover:rotate-0 transition-transform duration-700"
                alt="High quality cocoa powder spilling elegantly in mid-air"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6C7SIU6Nen1lDrRsPR8M-GatzpJUP4w5Rfnh-GnF1UTrlvzg-T9EnUMzARtrErZZUT8xlwPXv06ECbE7njRc2t-B6CoUoJIz9y0OPxkX9HrQ38WmabISyAJHflatwrbZvENbLwcSAq10TUoyrsSX8hlCPTkBNnWml54sQoiTO6eIYvBN8HAhCJRIJVsY9EwAf4-gGw3j9bFI6ROnSvV0QQNwZ6fab6VNoR6aqEs4uAMpL1MzhLjez44FUb5CUzThDPm2K54yRkQ"
              />
              <div className="absolute bottom-4 right-4 md:-bottom-8 md:-right-6 bg-[rgba(34,26,23,0.6)] backdrop-blur-[20px] p-6 md:p-8 rounded-lg shadow-2xl z-20 max-w-60 md:max-w-xs">
                <p className="text-tertiary font-bold mb-2">Purity GuardTM</p>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Third-party lab tested for heavy metals and purity. Only the essence of performance remains.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ingredient spotlight */}
        <section className="py-32 px-8 bg-surface-container-low">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6">The Quartet of Power</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto">
                Four pillars of nutrition, balanced for synergy. We do not just add ingredients; we orchestrate them.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 md:auto-rows-fr gap-8 items-stretch">
              <div className="md:col-span-7 h-full bg-[rgba(34,26,23,0.6)] backdrop-blur-[20px] rounded-xl p-10 md:p-12 hover:bg-surface-container-highest transition-all duration-500 group">
                <div className="h-full flex flex-col md:flex-row gap-10 items-start">
                  <div className="shrink-0 w-24 h-24 rounded-full bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-on-tertiary-fixed">restaurant</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-headline font-bold mb-4 text-tertiary">Heirloom Cacao</h3>
                    <p className="text-on-surface-variant mb-6 text-lg">
                      Rich in polyphenols and theobromine. Our cacao is sourced from volcanic soil for maximum mineral
                      density and a flavor profile that rivals artisanal chocolatiers.
                    </p>
                    <div className="flex gap-3 flex-wrap">
                      <span className="px-4 py-1 rounded-full border border-outline-variant/20 text-xs font-bold uppercase tracking-widest">
                        Anti-Inflammatory
                      </span>
                      <span className="px-4 py-1 rounded-full border border-outline-variant/20 text-xs font-bold uppercase tracking-widest">
                        Natural Mood Elevator
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 h-full bg-[rgba(34,26,23,0.6)] backdrop-blur-[20px] rounded-xl p-10 md:p-12 hover:bg-surface-container-highest transition-all duration-500 group flex flex-col">
                <div className="mb-6 w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center group-hover:bg-tertiary transition-colors">
                  <span className="material-symbols-outlined text-2xl group-hover:text-on-tertiary-fixed">fitness_center</span>
                </div>
                <h3 className="text-2xl font-headline font-bold mb-4">Bio-Protein Matrix</h3>
                <p className="text-on-surface-variant mb-6">
                  A 24g blend of sprouted peas and fermented hemp, ensuring 98% bioavailability without the bloating of
                  whey.
                </p>
                <ul className="space-y-2 text-sm text-on-surface font-semibold">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary text-lg">check_circle</span>
                    Complete Amino Acid Profile
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary text-lg">check_circle</span>
                    Grass-Fed Standards
                  </li>
                </ul>
              </div>

              <div className="md:col-span-5 h-full bg-[rgba(34,26,23,0.6)] backdrop-blur-[20px] rounded-xl p-10 md:p-12 hover:bg-surface-container-highest transition-all duration-500 group order-last md:order-0 flex flex-col">
                <div className="mb-6 w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center group-hover:bg-tertiary transition-colors">
                  <span className="material-symbols-outlined text-2xl group-hover:text-on-tertiary-fixed">science</span>
                </div>
                <h3 className="text-2xl font-headline font-bold mb-4">Chelated Minerals</h3>
                <p className="text-on-surface-variant mb-6">
                  Magnesium and Zinc bound to organic acids for effortless absorption by the gut lining.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-surface-container rounded-lg">
                    <p className="text-tertiary font-bold text-xl">400mg</p>
                    <p className="text-[10px] uppercase text-on-surface-variant tracking-tighter">Magnesium</p>
                  </div>
                  <div className="text-center p-3 bg-surface-container rounded-lg">
                    <p className="text-tertiary font-bold text-xl">15mg</p>
                    <p className="text-[10px] uppercase text-on-surface-variant tracking-tighter">Zinc Glycinate</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 h-full bg-[rgba(34,26,23,0.6)] backdrop-blur-[20px] rounded-xl p-10 md:p-12 hover:bg-surface-container-highest transition-all duration-500 group">
                <div className="h-full flex flex-col md:flex-row gap-10 items-start">
                  <div className="shrink-0 w-24 h-24 rounded-full bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-on-tertiary-fixed">bolt</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-3xl font-headline font-bold mb-4 text-tertiary">Adaptogenic Complex</h3>
                    <p className="text-on-surface-variant mb-6 text-lg">
                      Lions Mane and KSM-66 Ashwagandha extract. These work in tandem to modulate cortisol while
                      providing cognitive clarity during demanding days.
                    </p>
                    <div className="flex gap-3 flex-wrap justify-start">
                      <span className="px-4 py-1 rounded-full border border-outline-variant/20 text-xs font-bold uppercase tracking-widest">
                        Nootropic Focus
                      </span>
                      <span className="px-4 py-1 rounded-full border border-outline-variant/20 text-xs font-bold uppercase tracking-widest">
                        Stress Support
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nutrition facts section */}
        <section className="py-10 md:py-12 px-8 min-h-[calc(100svh-6rem)] flex items-center">
          <div className="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div className="space-y-5">
              <h2 className="text-3xl lg:text-4xl font-headline font-bold">What's Inside Matters.</h2>
              <div className="relative pl-9 border-l-2 border-outline-variant/20">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-tertiary"></div>
                <h4 className="text-xl font-bold mb-1">0g Added Sugar</h4>
                <p className="text-on-surface-variant text-base leading-relaxed">
                  Sweetened with monk fruit and a hint of vanilla bean. No glucose spikes, no midday crashes.
                </p>
              </div>
              <div className="relative pl-9 border-l-2 border-outline-variant/20">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-tertiary"></div>
                <h4 className="text-xl font-bold mb-1">High Fiber Pre-biotics</h4>
                <p className="text-on-surface-variant text-base leading-relaxed">
                  Chicory root fiber feeds your microbiome, improving nutrient absorption from every scoop.
                </p>
              </div>
              <div className="relative pl-9 border-l-2 border-outline-variant/20">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-tertiary"></div>
                <h4 className="text-xl font-bold mb-1">Cold-Pressed Process</h4>
                <p className="text-on-surface-variant text-base leading-relaxed">
                  Our ingredients never see temperatures above 40 C, preserving delicate enzymes and anti-oxidants.
                </p>
              </div>
              <div className="relative pl-9 border-l-2 border-outline-variant/20">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-tertiary"></div>
                <h4 className="text-xl font-bold mb-1">Digestive Enzyme Support</h4>
                <p className="text-on-surface-variant text-base leading-relaxed">
                  A gentle enzyme blend helps break down protein and cacao compounds for smoother digestion and better comfort.
                </p>
              </div>
              <div className="relative pl-9 border-l-2 border-outline-variant/20">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-tertiary"></div>
                <h4 className="text-xl font-bold mb-1">Electrolyte Balance</h4>
                <p className="text-on-surface-variant text-base leading-relaxed">
                  Naturally occurring potassium and magnesium help maintain hydration and sustained performance throughout the day.
                </p>
              </div>
            </div>

            <div className="bg-on-surface text-surface p-8 rounded-lg shadow-2xl font-body max-w-[370px] mx-auto transform rotate-0 md:rotate-1">
              <h2 className="text-3xl font-headline font-black border-b-8 border-surface pb-1 mb-2">Nutrition Facts</h2>
              <p className="text-sm font-bold border-b border-surface pb-1 mb-2">15 servings per container</p>
              <div className="flex justify-between items-end border-b-8 border-surface pb-1 mb-4">
                <div className="font-bold">
                  <p className="text-lg">Serving size</p>
                </div>
                <p className="font-black text-xl">1 Scoop (45g)</p>
              </div>
              <div className="flex justify-between items-baseline border-b-4 border-surface mb-2">
                <p className="text-lg font-black leading-none">Amount per serving</p>
              </div>
              <div className="flex justify-between items-baseline border-b-4 border-surface mb-4">
                <p className="text-3xl font-black leading-none">Calories</p>
                <p className="text-3xl font-black leading-none">160</p>
              </div>
              <div className="text-right text-sm font-black border-b border-surface pb-1 mb-1">% Daily Value*</div>

              <div className="grid grid-cols-[1fr_auto] border-b border-surface/30 py-2">
                <p><span className="font-black">Total Fat</span> 4g</p>
                <p className="font-black text-sm">5%</p>
              </div>
              <div className="grid grid-cols-[1fr_auto] border-b border-surface/30 py-2 pl-4">
                <p>Saturated Fat 2g</p>
                <p className="font-black text-sm">10%</p>
              </div>
              <div className="grid grid-cols-[1fr_auto] border-b border-surface/30 py-2">
                <p><span className="font-black">Sodium</span> 120mg</p>
                <p className="font-black text-sm">5%</p>
              </div>
              <div className="grid grid-cols-[1fr_auto] border-b border-surface/30 py-2">
                <p><span className="font-black">Total Carbohydrate</span> 12g</p>
                <p className="font-black text-sm">4%</p>
              </div>
              <div className="grid grid-cols-[1fr_auto] border-b border-surface/30 py-2 pl-4">
                <p>Dietary Fiber 8g</p>
                <p className="font-black text-sm">29%</p>
              </div>
              <div className="grid grid-cols-[1fr_auto] border-b border-surface/30 py-2 pl-4">
                <p>Total Sugars 0g</p>
                <p className="font-black text-sm"></p>
              </div>
              <div className="grid grid-cols-[1fr_auto] border-b border-surface/30 py-2">
                <p><span className="font-black">Protein</span> 24g</p>
                <p className="font-black text-sm">48%</p>
              </div>

              <div className="pt-4 text-[10px] leading-tight italic">
                *The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet.
                2,000 calories a day is used for general nutrition advice.
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default IngredientsPage;
