import React from 'react';
import { Link } from 'react-router-dom';

const ClinicalStudiesPage = () => {
  return (
    <div className="bg-surface text-on-surface font-body selection:bg-tertiary selection:text-on-tertiary">
      <main>
        <header className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 bg-[radial-gradient(circle_at_50%_50%,#2b1810_0%,#19120f_100%)]">
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9HfL9qF5qtKpt5ahz41MQDt3fPEFBBOF24_3A0jlopGYKsS6fnIFPcCNGMt4--BGh8nwPEb7G1dQSCYKOzRKUe7a8aIpWDDYXh4fWGjmOTAMcuw9rYEOFV7z5OdO1nheilnokpLMAhRmKH_dqMcTmRYS1uxq1nvoTu72I_eUri-iJe7EkxfWncF905JWCxgxXZjvlt7-ZaKe0gSZ_Fk_7-AkkNjPoDHMlabczMrc6dhXYQEbO5sKvGoWM6I6ig1vaq4uzHCaKXw')"
            }}
          ></div>

          <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12 py-16">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <p className="text-tertiary font-label tracking-[0.3em] uppercase mb-4 text-sm font-semibold">Scientific Validation</p>
              <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface mb-8 leading-[0.9]">
                The Proof of <br />
                <span className="text-tertiary italic">Performance</span>
              </h1>
              <p className="text-primary-fixed-dim text-lg md:text-xl max-w-xl mb-12 leading-relaxed">
                Bridging the gap between ancient ritual and clinical rigor. BALPRO LIFE is formulated based on double-blind,
                placebo-controlled data to optimize your cognitive and metabolic architecture.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
                <button className="gold-shimmer text-on-tertiary px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-2xl" type="button">
                  Download Full Whitepaper
                </button>
                <Link
                  className="inline-flex items-center justify-center px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs border border-outline-variant/30 text-on-surface hover:bg-surface-container transition-colors"
                  to="/products"
                >
                  Shop the Formula
                </Link>
              </div>
            </div>

            <div className="w-full md:w-1/2 relative">
              <div className="absolute -inset-10 bg-tertiary/10 blur-[100px] rounded-full"></div>
              <img
                alt="3D render of a luxury chocolate beverage tetra pack"
                className="relative z-10 w-full max-w-md mx-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] transform -rotate-6 hover:rotate-0 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbuOrLLzUhfKpnbWn8_jJJZ4HbAW0uwEevY9t2j4XUERE2hCRqdnrx2e76d2WzHLSAQ5dqhTI12NlSe2R9nyp0cLXDVUBvSo6H2x641WiNoyghVoqv4vPD0XCaMb9mJXZLzsOs8Ya0i05ze7aJTYUQ8zyJqOGYVgoEQzTB8t7Us7kHYihC-CkSf6GBIu-p6jW3aixVIO8JLhIa9n1Epp3pX5uEIdqTQCGjayVrt0tBvjrPueS0Lct0_vX4BpBtmUEZTkQ3oDAUEQ"
              />
            </div>
          </div>
        </header>

        <section className="py-32 px-6 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center">
              <h2 className="font-headline text-4xl font-bold tracking-tight mb-4">The Clinical Roadmap</h2>
              <p className="text-primary-fixed-dim uppercase tracking-[0.2em] text-xs">A Three-Tier Validation Process</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-surface-container-low p-10 rounded-xl flex flex-col items-start border border-outline-variant/10 hover:border-tertiary/20 transition-all duration-500 group">
                <span className="text-5xl font-headline font-extrabold text-tertiary/20 group-hover:text-tertiary/40 transition-colors mb-6">01</span>
                <h3 className="text-xl font-headline font-bold mb-4">Phase I: Bio-Safety</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm">
                  Comprehensive metabolic screening ensuring absolute purity and zero-toxin profiles. Conducted with
                  independent laboratory verification for safety and bioavailability.
                </p>
              </div>
              <div className="bg-surface-container-low p-10 rounded-xl flex flex-col items-start border border-outline-variant/10 hover:border-tertiary/20 transition-all duration-500 group md:translate-y-8">
                <span className="text-5xl font-headline font-extrabold text-tertiary/20 group-hover:text-tertiary/40 transition-colors mb-6">02</span>
                <h3 className="text-xl font-headline font-bold mb-4">Phase II: Efficacy</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm">
                  Double-blind, placebo-controlled study focusing on acute cognitive uplift and cortisol regulation.
                  Quantitative data tracking neural response times.
                </p>
              </div>
              <div className="bg-surface-container-low p-10 rounded-xl flex flex-col items-start border border-outline-variant/10 hover:border-tertiary/20 transition-all duration-500 group md:translate-y-16">
                <span className="text-5xl font-headline font-extrabold text-tertiary/20 group-hover:text-tertiary/40 transition-colors mb-6">03</span>
                <h3 className="text-xl font-headline font-bold mb-4">Phase III: Long-term Optimization</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm">
                  Multi-month longitudinal tracking of gut-brain axis health and consistent metabolic baseline improvement in
                  500+ healthy participants.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 px-6 bg-surface-container-lowest overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                <h2 className="font-headline text-5xl font-bold tracking-tight mb-6 leading-tight">
                  Quantifiable Results <br />for the <span className="text-tertiary">Modern Mind.</span>
                </h2>
              </div>
              <div className="flex items-center gap-4 text-tertiary text-sm tracking-widest font-bold uppercase">
                <span>Scroll Findings</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="bg-[rgba(38,30,26,0.6)] backdrop-blur-[20px] p-12 rounded-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-7xl">psychology</span>
                </div>
                <h4 className="font-headline text-2xl font-bold mb-8">Cognitive Focus</h4>
                <div className="mb-8 flex items-end gap-2">
                  <span className="text-6xl font-headline font-extrabold text-tertiary">34%</span>
                  <span className="text-on-surface-variant pb-2 uppercase tracking-tighter text-xs">Increase in Alpha Wave Activity</span>
                </div>
                <div className="h-2 w-full bg-surface-container-highest rounded-full mb-8">
                  <div className="h-full w-[34%] gold-shimmer rounded-full"></div>
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Participants demonstrated a significant shift in EEG readings toward deep focus states within 45 minutes of
                  consumption.
                </p>
              </div>

              <div className="bg-[rgba(38,30,26,0.6)] backdrop-blur-[20px] p-12 rounded-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-7xl">bolt</span>
                </div>
                <h4 className="font-headline text-2xl font-bold mb-8">Metabolic Recovery</h4>
                <div className="mb-8 flex items-end gap-2">
                  <span className="text-6xl font-headline font-extrabold text-tertiary">2.5x</span>
                  <span className="text-on-surface-variant pb-2 uppercase tracking-tighter text-xs">Glycogen Resynthesis Speed</span>
                </div>
                <div className="flex gap-1 h-20 items-end mb-8">
                  <div className="w-full h-[40%] bg-surface-container-highest rounded-t-sm"></div>
                  <div className="w-full h-[60%] bg-surface-container-highest rounded-t-sm"></div>
                  <div className="w-full h-full gold-shimmer rounded-t-sm"></div>
                  <div className="w-full h-[85%] bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] opacity-80 rounded-t-sm"></div>
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Enhanced nutrient shuttling enables rapid muscular recovery without the insulin spikes typical of processed
                  performance drinks.
                </p>
              </div>

              <div className="bg-[rgba(38,30,26,0.6)] backdrop-blur-[20px] p-12 rounded-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-7xl">monitor_heart</span>
                </div>
                <h4 className="font-headline text-2xl font-bold mb-8">Cortisol Balance</h4>
                <div className="mb-8 flex items-end gap-2">
                  <span className="text-6xl font-headline font-extrabold text-tertiary">22%</span>
                  <span className="text-on-surface-variant pb-2 uppercase tracking-tighter text-xs">Reduction in Stress Markers</span>
                </div>
                <div className="flex justify-center mb-8">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96" aria-hidden="true">
                      <circle className="text-surface-container-highest" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="8"></circle>
                      <circle className="text-tertiary" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="195.9"></circle>
                    </svg>
                    <span className="absolute text-xs font-bold uppercase tracking-tighter">Lower</span>
                  </div>
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Clinical data indicates a marked reduction in systemic cortisol, promoting a calm-alert state rather than
                  jittery energy.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-48 px-6 bg-surface relative">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-5"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA6Rub2mTO8orZVq17PcmUIGxHJwwWdwSVm3A_HZbni8hlUPzaa66iAYXLnY15sZa2rLdJFuebMuupAoaQYMQvffe7HHI-dtTMpUIj4g_oajkagnC0tkgPiEH2iRW5NXSxziaDmMVw7utHx774IwUYB5mlYj3aNmKFzk5MCg1j41HVjlGz_ugPFuGl_LU7WN2tIjzriUXMaLS7QeG7yipybbdPOJHyELpH5-a_qlQrbMHZ1hxrXqOqNF2jTl6eXjz5rikPhbYgbog')"
            }}
          ></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-24">
              <div className="w-full lg:w-1/2">
                <img
                  alt="Scientific glassware with rich brown liquid"
                  className="rounded-xl shadow-2xl"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAk5poKaUmiNX7SVHIaLK4gdhMHwRANLIAnpK4cUDC6NVhe7j10bocmrHDi2S_PuOGN6F5VKh6xXal6Cq3nt1PorF0KiZGKgKC9v-020akX_qiwd7N0s5iNCiClrpHgDYLOIpIW4U6l3G5v0iRlyFIK9b3gIU_bd2wyAAgVJiLINt3_eOz1EAt8diOIr0lT63dQrRb9ofKQfRZ3PMulq1z1GkS7rFf21cjavIoW-i0XIJIs0u-4YzIa1x00VyiP1kfZkMKgdZzYQ"
                />
              </div>
              <div className="w-full lg:w-1/2">
                <p className="text-tertiary font-label tracking-widest uppercase mb-6 text-sm">The Micro-Layer System</p>
                <h2 className="font-headline text-4xl font-bold mb-8 leading-tight">Bioavailability &amp; <br />Nutrient Density</h2>
                <p className="text-on-surface-variant text-lg leading-relaxed mb-10">
                  Our proprietary delivery system encapsulates active cocoa flavonoids and electrolytes within a phospholipid
                  matrix, allowing for direct bypass of harsh gastric acids and immediate intestinal absorption.
                </p>
                <ul className="space-y-8">
                  <li className="flex items-start gap-6">
                    <div className="mt-1 w-6 h-6 rounded-full gold-shimmer flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-on-tertiary text-[16px] font-bold">check</span>
                    </div>
                    <div>
                      <h5 className="font-bold text-on-surface mb-2">Liposomal Encapsulation</h5>
                      <p className="text-on-surface-variant text-sm">Protected delivery of delicate antioxidants to ensure 98% potency upon arrival at cellular targets.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-6">
                    <div className="mt-1 w-6 h-6 rounded-full gold-shimmer flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-on-tertiary text-[16px] font-bold">check</span>
                    </div>
                    <div>
                      <h5 className="font-bold text-on-surface mb-2">Easy Absorption</h5>
                      <p className="text-on-surface-variant text-sm">Magnesium and Potassium in highly absorbable forms to prevent digestive discomfort and maximize hydration.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 px-6 bg-surface-container-low">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-headline text-3xl font-bold mb-4">Academic References</h2>
              <div className="h-1 w-20 gold-shimmer mx-auto rounded-full"></div>
            </div>
            <div className="space-y-4">
              {[{
                id: '01',
                source: 'NEUROSCIENCE QUARTERLY, 2023',
                title: 'The Impact of Epicatechin-Rich Cocoa on Alpha Wave Modulation in High-Stress Environments.',
                author: 'Dr. Aris Thorne, Global Institute of Bio-Performance.'
              }, {
                id: '02',
                source: 'METABOLIC HEALTH JOURNAL, 2024',
                title: 'Longitudinal Assessment of Plant-Based Recovery Formulas in Professional Endurance Athletes.',
                author: 'Study conducted in collaboration with Zurich Performance Lab.'
              }, {
                id: '03',
                source: 'THE CLINICAL BIOCHEMIST, 2023',
                title: 'Bioavailability and Gastric Stability of Liposomal Nutrient Delivery Systems in Functional Beverages.',
                author: 'Internal Whitepaper - Research Unit 09.'
              }].map((item) => (
                <a
                  key={item.id}
                  className="block p-6 rounded-lg bg-surface hover:bg-surface-container-high transition-all group border-l-4 border-transparent hover:border-tertiary"
                  href="#"
                >
                  <p className="text-xs text-tertiary mb-2 font-mono">[{item.id}] {item.source}</p>
                  <h5 className="font-bold text-on-surface mb-1 group-hover:text-tertiary transition-colors">{item.title}</h5>
                  <p className="text-xs text-on-surface-variant italic">{item.author}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 px-6 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-surface"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold mb-12">
              Experience the <span className="text-tertiary italic">Validated</span> Ritual.
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link className="inline-flex justify-center items-center gold-shimmer text-on-tertiary px-12 py-6 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-2xl" to="/products">
                Order Starter Kit
              </Link>
              <button className="px-12 py-6 rounded-full font-bold uppercase tracking-widest text-sm border border-outline-variant/30 text-on-surface hover:bg-surface-container transition-colors" type="button">
                Join the Newsletter
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ClinicalStudiesPage;
