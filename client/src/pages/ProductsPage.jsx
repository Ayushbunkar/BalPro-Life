import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'How should I serve it?',
    answer:
      'For the ultimate experience, serve chilled or pour over ice. You can also heat it gently on a stovetop for a gourmet functional hot chocolate.',
  },
  {
    question: 'When will I feel the effects?',
    answer:
      'Most customers report smoother focus in 20 to 40 minutes. Effects vary by hydration, sleep quality, and personal caffeine sensitivity.',
  },
  {
    question: 'Is it safe for daily use?',
    answer:
      'Yes, for healthy adults this formula is designed for daily use. If you are pregnant, nursing, or under medical supervision, consult your clinician first.',
  },
];

const ProductsPage = ({ onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const handleAddToCart = () => {
    if (!onAddToCart) return;

    const product = {
      id: 'balpro-cacao-1',
      name: 'Balpro Cacao',
      price: 39,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDOPX2vUQHGnDLxgzpxvoeoUKiT0jBKQDqu4n3SFhkpvpbWvqZAlFyKnAFiB3jM-0gBK4Sc1CPYpQZSGch3XP-bmAnmr2gRjAnKgMCeHtofcfjE1Rkv4uyoODPu2ZdKCqXaDkoCTI4lS4PxrL9uMf17I4tupSeZuXVHThLMvZKqNzyXlA9433ltcmHiCCOWu7z-zJ6YEWdFsbJqmkSKpulxdTIInsTxXu_iCkU025IA22z5cWMbVuLDUGOjlEWYzxQXm1iw4vG14Q',
    };

    for (let i = 0; i < quantity; i += 1) {
      onAddToCart(product);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-tertiary/30 pb-28 md:pb-0">
      <main className="pt-8">
        <section className="relative min-h-[calc(100svh-6rem)] flex flex-col md:flex-row items-center justify-between px-8 md:px-24 py-4 md:py-6 mb-16 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-tertiary/5 rounded-full blur-[120px]"></div>

          <div className="w-full md:w-1/2 z-10 space-y-5 lg:space-y-6">
            <div className="inline-block px-4 py-1 rounded-full bg-surface-container-highest text-tertiary text-xs font-bold tracking-[0.2em] mb-4">
              FUNCTIONAL CACAO
            </div>
            <h1 className="font-headline text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[0.9] [text-shadow:0_10px_30px_rgba(0,0,0,0.5)]">
              Velvet <br /> <span className="text-tertiary">Recovery.</span>
            </h1>
            <p className="max-w-md text-primary-fixed-dim text-lg leading-relaxed">
              A masterclass in functional indulgence. Rich Belgian chocolate meets adaptogenic mushrooms in a
              silk-smooth pour.
            </p>

            <div className="flex flex-col space-y-4 pt-3">
              <div className="flex items-baseline space-x-4">
                <span className="text-4xl font-headline font-bold text-on-surface">$39.00</span>
                <span className="text-outline line-through">$48.00</span>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-surface-container rounded-full border border-outline-variant/20 p-1">
                  <button
                    className="w-12 h-12 flex items-center justify-center text-on-surface-variant hover:text-tertiary transition-colors"
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <span className="px-6 font-bold text-lg">{quantity}</span>
                  <button
                    className="w-12 h-12 flex items-center justify-center text-on-surface-variant hover:text-tertiary transition-colors"
                    type="button"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>

                <button
                  className="bg-[linear-gradient(135deg,#efbf70,#a77e36)] px-10 py-4 rounded-full text-on-tertiary-fixed font-bold text-lg relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                  type="button"
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </button>
              </div>

              <button
                type="button"
                className="w-full md:w-[420px] py-4 rounded-full border border-outline-variant/30 text-on-surface font-semibold hover:bg-surface-container-highest transition-all"
              >
                BUY IT NOW
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative flex justify-center mt-10 md:mt-0">
            <div className="relative z-20 w-60 md:w-[360px] lg:w-[420px] transform hover:rotate-3 transition-transform duration-700">
              <img
                alt="Premium Chocolate Tetra Pack"
                className="w-full h-auto drop-shadow-[0_40px_60px_rgba(0,0,0,0.4)]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOPX2vUQHGnDLxgzpxvoeoUKiT0jBKQDqu4n3SFhkpvpbWvqZAlFyKnAFiB3jM-0gBK4Sc1CPYpQZSGch3XP-bmAnmr2gRjAnKgMCeHtofcfjE1Rkv4uyoODPu2ZdKCqXaDkoCTI4lS4PxrL9uMf17I4tupSeZuXVHThLMvZKqNzyXlA9433ltcmHiCCOWu7z-zJ6YEWdFsbJqmkSKpulxdTIInsTxXu_iCkU025IA22z5cWMbVuLDUGOjlEWYzxQXm1iw4vG14Q"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-linear-to-tr from-tertiary/10 to-transparent rounded-full blur-3xl -z-10"></div>
          </div>
        </section>

        <section className="bg-surface-container-low py-24 px-8 md:px-24 rounded-t-[3rem] md:rounded-t-[5rem]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 space-y-4">
              <h2 className="font-headline text-4xl md:text-5xl font-bold">Molecular Benefits</h2>
              <p className="text-primary-fixed-dim max-w-xl">Every drop is engineered for peak performance and sensory bliss.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group relative bg-surface-container-highest p-10 rounded-xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">auto_awesome</span>
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4">Adaptogenic Core</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Infused with 500mg of Reishi and Ashwagandha to modulate stress response and enhance focus.
                </p>
              </div>

              <div className="group relative bg-surface-container-highest p-10 rounded-xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">electric_bolt</span>
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4">Slow Release Energy</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  No spikes. No crashes. Just sustained mental clarity powered by organic raw cacao beans.
                </p>
              </div>

              <div className="group relative bg-surface-container-highest p-10 rounded-xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">spa</span>
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4">Muscle Recovery</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Natural magnesium content aids in muscle relaxation and reduces inflammation post-ritual.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-8 md:px-24">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
            <div className="w-full md:w-1/2">
              <h3 className="font-headline text-3xl font-bold mb-10">Clean Label. Zero Regrets.</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-outline-variant/10 pb-4">
                  <span className="text-on-surface font-semibold">Calories</span>
                  <span className="text-tertiary font-bold text-2xl">110</span>
                </div>
                <div className="flex justify-between items-end border-b border-outline-variant/10 pb-4">
                  <span className="text-on-surface font-semibold">Total Sugars</span>
                  <span className="text-tertiary font-bold text-2xl">2g</span>
                </div>
                <div className="flex justify-between items-end border-b border-outline-variant/10 pb-4">
                  <span className="text-on-surface font-semibold">Protein</span>
                  <span className="text-tertiary font-bold text-2xl">8g</span>
                </div>
                <div className="flex justify-between items-end border-b border-outline-variant/10 pb-4">
                  <span className="text-on-surface font-semibold">Fiber</span>
                  <span className="text-tertiary font-bold text-2xl">5g</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <div className="bg-surface-container-highest rounded-xl p-8 md:p-12 relative overflow-hidden">
                <img
                  alt="Product texture detail"
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5cRyeC3ZdWYzUn5CJWqIdt3m4ZewXFcvPY_C5fbJecERVANXEC4sDQ32dofchWJjJiXUWFSlmQzVI66pLFZfwlOoNNwwyTbb82clH0N2qm0z4XC0VKxTXz1YJQYSAKOCvYaTzxZPa1URwyOvAeOY00yVqZBaHjJFiRreYM6At8OFEXfTbZJ3Laidt95eRsY52JRcR9iuva6jF2MrvcD0O_7ufcCpS0lZxZ_B7ClpdnPuG8mM9PpPSg_Ndn_87qtag2eljcH2g_Q"
                />
                <div className="relative z-10 space-y-6">
                  <h4 className="font-headline text-2xl font-bold">The Craft Process</h4>
                  <p className="text-on-surface-variant italic">
                    We do not just make chocolate; we curate a physical state of being. Every pack is cold-pressed to
                    preserve the delicate structure of functional botanicals.
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    <span className="px-3 py-1 rounded bg-tertiary/10 text-tertiary text-xs uppercase font-bold">Non-GMO</span>
                    <span className="px-3 py-1 rounded bg-tertiary/10 text-tertiary text-xs uppercase font-bold">Vegan</span>
                    <span className="px-3 py-1 rounded bg-tertiary/10 text-tertiary text-xs uppercase font-bold">Gluten Free</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-8 md:px-24 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-16 gap-6 flex-wrap">
              <h2 className="font-headline text-4xl font-bold">Voices of Indulgence</h2>
              <div className="flex items-center space-x-2 text-tertiary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="text-on-surface font-bold ml-2">4.9 / 5</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2 bg-surface p-8 rounded-lg shadow-sm">
                <p className="text-lg font-medium mb-6">
                  Finally, a health drink that does not taste like dirt. It is thick, creamy, and actually helps me
                  wind down after a long day.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary-container"></div>
                  <div>
                    <p className="font-bold">Julianne V.</p>
                    <p className="text-xs text-outline">Verified Connoisseur</p>
                  </div>
                </div>
              </div>
              <div className="bg-surface p-8 rounded-lg shadow-sm">
                <p className="text-sm mb-6">The subscription replaced my 3PM coffee and my 9PM dessert.</p>
                <p className="font-bold">Marcus T.</p>
              </div>
              <div className="bg-surface p-8 rounded-lg shadow-sm">
                <p className="text-sm mb-6">Packaging is editorial quality. Looks amazing in my fridge and tastes even better.</p>
                <p className="font-bold">Elena R.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-8 md:px-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-headline text-4xl font-bold mb-16 text-center">Questions and Answers</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const open = openFaqIndex === idx;
                return (
                  <div key={faq.question} className="border-b border-outline-variant/10">
                    <button
                      className="w-full flex justify-between items-center py-6 text-left hover:text-tertiary transition-colors"
                      type="button"
                      onClick={() => setOpenFaqIndex(open ? -1 : idx)}
                    >
                      <span className="text-xl font-bold">{faq.question}</span>
                      <span className={`material-symbols-outlined transition-transform ${open ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>
                    {open && <div className="pb-6 text-on-surface-variant">{faq.answer}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-lg hidden md:block">
        <div className="bg-surface-container-highest/90 backdrop-blur-2xl p-4 rounded-full border border-tertiary/20 shadow-2xl flex items-center justify-between px-8 gap-4">
          <div className="flex items-center gap-4">
            <img
              alt="Mini product"
              className="w-10 h-10 object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJiveFdCNZuz6gMADu4lTsmoLGv-3G5bT497Ngj_C_TDr1hwKWKOEjkxIhLhIERpb3b45HEQfAiRAnKJVzhM5vfnqYxohvsByJFow0SmS-0JC22Vw9zN0N6BPNgRut2VnlK1V3lVpsPJQcr7QN398aEugJkHDNNS08VfgThzaXHD_Dw9BdotuBUWiFnSyj1lP1_YAApHPRrl3YTET6A6DhmfjKMl3_y1LPlVIiXaZbysve_OxeOfL2Uic7ghG_hIZvwt18kkhKLA"
            />
            <div>
              <p className="text-xs font-bold text-tertiary">BALPRO CACAO</p>
              <p className="font-bold">$39.00</p>
            </div>
          </div>
          <button
            className="bg-[linear-gradient(135deg,#efbf70,#a77e36)] px-8 py-3 rounded-full text-on-tertiary-fixed font-bold text-sm"
            type="button"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        </div>
      </div>

      <nav className="fixed bottom-0 w-full z-50 rounded-t-3xl md:hidden bg-[#19120f]/90 backdrop-blur-2xl border-t border-[#4f4440]/20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] h-20 pb-safe px-6 flex justify-around items-center">
        <Link className="flex flex-col items-center justify-center text-[#efbf70] bg-[#3c332f] rounded-full py-2 px-4 scale-95 active:scale-90 transition-transform" to="/products">
          <span className="material-symbols-outlined">local_mall</span>
          <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Shop</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-[#e2bfb2]/50 py-2 px-4 scale-95 active:scale-90 transition-transform" to="/ingredients">
          <span className="material-symbols-outlined">auto_awesome</span>
          <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Benefits</span>
        </Link>
        <button className="flex flex-col items-center justify-center text-[#e2bfb2]/50 py-2 px-4 scale-95 active:scale-90 transition-transform" type="button">
          <span className="material-symbols-outlined">shopping_cart</span>
          <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Cart</span>
        </button>
        <Link className="flex flex-col items-center justify-center text-[#e2bfb2]/50 py-2 px-4 scale-95 active:scale-90 transition-transform" to="/login">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Account</span>
        </Link>
      </nav>
    </div>
  );
};

export default ProductsPage;
