import React from 'react';
import { Link } from 'react-router-dom';

const compareRows = [
  ['Sugar Content', '0g Added', '24g - 32g'],
  ['Functional Adaptogens', 'Ashwagandha + Reishi', 'None'],
  ['Cocoa Origin', 'Single Origin Heirloom', 'Mass Commodity Blend'],
  ['Protein Source', 'Bio-available Pea & Seed', 'Whey Isolate (Processed)'],
  ['Bioavailability', '94% Retention', 'Less than 40%'],
];

const faqs = [
  {
    q: 'What makes the Life formula unique?',
    a: 'Our formula integrates a triple-threat of ceremonial grade cacao, specific adaptogenic mushrooms for cognitive support, and a mineral complex designed for rapid absorption.',
  },
  {
    q: 'Is this suitable for ketogenic lifestyles?',
    a: 'Absolutely. With 0g of added sugar and high-quality MCT fats, Balpro Life is designed to support metabolic health and sustained ketosis without the crash.',
  },
  {
    q: 'How often should I consume Balpro Life?',
    a: 'Most of our community enjoys one cup in the morning for sustained focus and one in the evening as a restorative ritual. The adaptogens work cumulatively over time.',
  },
];

const WhyChooseUsPage = () => {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-tertiary selection:text-on-tertiary-fixed pb-28 md:pb-0">
      <header className="relative pt-0 md:pt-10 pb-24 overflow-hidden bg-[radial-gradient(circle_at_center,#221a17_0%,#19120f_100%)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <span className="text-tertiary font-label tracking-[0.2em] text-xs uppercase mb-6 block">The Superior Standard</span>
            <h1 className="font-headline text-5xl md:text-7xl font-bold text-on-surface leading-[1.1] mb-8 tracking-tighter">
              Indulgence <br />
              <span className="text-tertiary italic">Redefined.</span>
            </h1>
            <p className="text-primary-fixed-dim text-lg md:text-xl max-w-xl leading-relaxed mb-10">
              We did not just make another chocolate drink. We curated a functional ritual that bridges the gap between high-performance nutrition and artisanal luxury.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/products" className="rounded-full px-8 py-4 bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] text-on-tertiary font-semibold hover:scale-105 transition-transform duration-300 shadow-xl">
                Shop Flagship Pack
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-tertiary/10 blur-[120px] rounded-full"></div>
            <img
              alt="Premium Chocolate Packaging"
              className="relative z-10 w-full h-auto rounded-xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUOs1BVxnN1jZHN3gXBjX4UTCRx1K7W1tF3oEx9Hl8WJCVvRB8uinhsGDWqWfA_YtbnuIJC2FRhHjFYK2aHnb-ykA9z7MnoFjJcZMWFwbfiGXcAVR0bm5mZahgexbN3bvs8JeHPuFlbxd_utcfclSMCiyf7CXzRscpS24AvH_UlImHxj6CXBa0ovh068G_yoA1Xj0Qs-oC0j_RbDDwgyn45VLdqLpVxkPAxREAiXMRBh0id5UeO1E5Q0vJnKKzozXct96QGE8ayA"
            />
          </div>
        </div>
      </header>

      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[['verified', 'GMP Certified'], ['eco', '100% Organic'], ['science', 'Lab Tested'], ['potted_plant', 'Vegan Friendly']].map((item) => (
              <div key={item[1]} className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center text-tertiary border border-outline-variant/20">
                  <span className="material-symbols-outlined text-3xl">{item[0]}</span>
                </div>
                <span className="font-headline font-bold text-on-surface">{item[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-surface">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-surface mb-6 tracking-tight">The Analysis</h2>
            <p className="text-primary-fixed-dim max-w-2xl mx-auto">A transparent look at how Balpro Life compares to the industry standard. No fillers, no compromises.</p>
          </div>
          <div className="overflow-hidden rounded-xl border border-outline-variant/10 shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-highest">
                  <th className="p-8 font-headline text-lg text-on-surface border-b border-outline-variant/10">Key Metric</th>
                  <th className="p-8 font-headline text-lg text-tertiary border-b border-outline-variant/10 bg-surface-container/50">Balpro Life</th>
                  <th className="p-8 font-headline text-lg text-on-surface-variant border-b border-outline-variant/10">Standard Drinks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {compareRows.map((row) => (
                  <tr key={row[0]}>
                    <td className="p-8 font-medium">{row[0]}</td>
                    <td className="p-8 text-tertiary font-bold bg-surface-container/30">{row[1]}</td>
                    <td className="p-8 text-on-surface-variant">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-32 bg-surface-container-low">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="font-headline text-4xl font-bold text-on-surface mb-4">Common Enquiries</h2>
            <div className="w-20 h-1 bg-tertiary rounded-full"></div>
          </div>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-surface p-8 rounded-lg border border-outline-variant/10 hover:border-tertiary/30 transition-colors">
                <div className="flex justify-between items-center">
                  <h3 className="font-headline text-xl font-semibold text-on-surface">{faq.q}</h3>
                  <span className="material-symbols-outlined text-tertiary">expand_more</span>
                </div>
                <p className="mt-4 text-primary-fixed-dim leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Luxury Cacao Background"
            className="w-full h-full object-cover opacity-20"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2V8Vk2HkKtnm6G4VCxHRaATGvaA80bOx_n_x8ed1E2ytw3VX3tAA8nvHUKrmJ-18xJDrNS5TN_ZLFmucXs-Uil12fsR2W9fBMPBRn_PKIhCUpK0_alAOvi-dbPTPZggBvNdoJk2AG7UzTUw6VAfgTry1tlNzZuaQyMM98T-8A0RJdOHGMkC9Kg9ssKLv0epIenhqYWleK7sGVI4xhEpXlaAh1JdO_h-ADKgYqQh7Thmujz-DCbTPW5DKqZn_C9A2J0dW3r-Lu-Q"
          />
          <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-headline text-5xl md:text-7xl font-bold text-on-surface mb-8 tracking-tighter">
            Ready to elevate your <br />
            <span className="text-tertiary">daily ritual?</span>
          </h2>
          <p className="text-primary-fixed-dim text-xl mb-12 max-w-2xl mx-auto">
            Experience the flagship blend that redefined the category. Limited batches crafted monthly for peak potency.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link to="/products" className="w-full md:w-auto px-12 py-5 bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] rounded-full text-on-tertiary font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl">
              Get The Flagship Pack
            </Link>
            <Link to="/ingredients" className="w-full md:w-auto px-12 py-5 rounded-full border border-outline-variant/30 text-on-surface font-semibold text-lg hover:bg-surface-container-highest transition-all duration-300">
              Explore Ingredients
            </Link>
          </div>
        </div>
      </section>

      <nav className="fixed bottom-0 w-full z-50 rounded-t-3xl md:hidden bg-[#19120f]/90 backdrop-blur-2xl border-t border-[#4f4440]/20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex justify-around items-center h-20 pb-safe px-6">
          <Link className="flex flex-col items-center justify-center text-[#e2bfb2]/50 py-2 px-4 scale-95 active:scale-90 transition-transform active:bg-[#3c332f] rounded-full" to="/products">
            <span className="material-symbols-outlined">local_mall</span>
            <span className="text-[10px] font-medium uppercase tracking-widest mt-1">Shop</span>
          </Link>
          <Link className="flex flex-col items-center justify-center text-[#efbf70] bg-[#3c332f] rounded-full py-2 px-4 scale-95 active:scale-90 transition-transform" to="/why-choose-us">
            <span className="material-symbols-outlined">auto_awesome</span>
            <span className="text-[10px] font-medium uppercase tracking-widest mt-1">Why Choose Us</span>
          </Link>
          <button className="flex flex-col items-center justify-center text-[#e2bfb2]/50 py-2 px-4 scale-95 active:scale-90 transition-transform active:bg-[#3c332f] rounded-full" type="button">
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className="text-[10px] font-medium uppercase tracking-widest mt-1">Cart</span>
          </button>
          <Link className="flex flex-col items-center justify-center text-[#e2bfb2]/50 py-2 px-4 scale-95 active:scale-90 transition-transform active:bg-[#3c332f] rounded-full" to="/login">
            <span className="material-symbols-outlined">person</span>
            <span className="text-[10px] font-medium uppercase tracking-widest mt-1">Account</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default WhyChooseUsPage;
