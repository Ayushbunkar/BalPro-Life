import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const categories = [
  'Product & Ritual',
  'Rewards Game',
  'Shipping & Delivery',
  'Science & Nutrition',
];

const faqItems = [
  {
    category: 'Product & Ritual',
    question: 'How do I scan my code?',
    answer: [
      'To unlock the secrets within your liquid ritual, follow these precise steps:',
      '1) Locate Code: Find the unique 8-digit alphanumeric sequence printed directly under the matte cap.',
      '2) Enter Portal: Scan the QR on the pack or navigate to our digital Curator Portal on your mobile device.',
      '3) Pick Number: Input your code and select your lucky number to reveal your instant ritual reward.',
    ],
  },
  {
    category: 'Product & Ritual',
    question: 'What are the benefits of the Chocolate Ritual?',
    answer: [
      'The Chocolate Ritual is more than a beverage. It is designed to balance mood, focus, and calm with functional cacao + adaptogenic ingredients.',
      'The natural theobromine offers a smoother lift than traditional caffeine-heavy drinks.',
    ],
  },
  {
    category: 'Rewards Game',
    question: 'How do I claim my free tetra pack?',
    answer: [
      'When you win a redemption reward, a QR voucher is generated in your wallet.',
      'Present it at participating partner outlets to redeem your selected flavor.',
    ],
  },
  {
    category: 'Shipping & Delivery',
    question: 'When will my order arrive?',
    answer: [
      'Metro orders usually arrive in 2-4 business days.',
      'Other regions may take 4-7 business days depending on courier coverage.',
    ],
  },
  {
    category: 'Science & Nutrition',
    question: 'Is the formula clinically backed?',
    answer: [
      'Our blend includes evidence-backed ingredients such as cacao polyphenols and adaptogens used in published studies.',
      'You can review detailed ingredient references on the ingredients and studies pages.',
    ],
  },
  {
    category: 'Science & Nutrition',
    question: 'Is the packaging sustainable?',
    answer: [
      'Yes. We continuously improve our material stack for better recyclability and lower lifecycle impact.',
    ],
  },
];

const FaqPage = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [search, setSearch] = useState('');
  const [openQuestion, setOpenQuestion] = useState(0);

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return faqItems.filter((item) => {
      const categoryMatch = item.category === activeCategory;
      if (!categoryMatch) return false;
      if (!q) return true;
      return item.question.toLowerCase().includes(q) || item.answer.join(' ').toLowerCase().includes(q);
    });
  }, [activeCategory, search]);

  return (
    <div className="bg-surface font-body text-on-surface">
      <main className="pt-32">
        <section className="px-6 md:px-12 mb-24 relative">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-tertiary font-headline font-bold tracking-[0.3em] text-xs uppercase mb-6">Assistance & Wisdom</p>
            <h1 className="font-headline text-5xl md:text-8xl font-black tracking-tighter leading-none mb-12">
              Frequently Asked <br />
              <span className="text-tertiary">Rituals</span>
            </h1>
            <div className="max-w-2xl mx-auto relative">
              <input
                className="w-full bg-surface-container-highest border-none rounded-full py-6 px-10 text-on-surface placeholder:text-on-surface-variant focus:ring-2 focus:ring-tertiary transition-all"
                placeholder="Search for your ritual inquiry..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-tertiary">search</span>
            </div>
          </div>
          <div className="absolute -z-10 top-0 left-1/4 w-96 h-96 bg-tertiary/10 rounded-full blur-[100px]"></div>
          <div className="absolute -z-10 bottom-0 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
        </section>

        <section className="px-6 md:px-12 mb-16 overflow-x-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex md:justify-center gap-4 min-w-max pb-4">
              {categories.map((category) => {
                const active = category === activeCategory;
                return (
                  <button
                    key={category}
                    className={`px-8 py-4 rounded-full border font-bold text-xs uppercase tracking-widest transition-all ${active ? 'border-tertiary text-tertiary bg-tertiary/5' : 'border-outline-variant/30 text-on-surface-variant hover:border-tertiary hover:text-tertiary'}`}
                    onClick={() => {
                      setActiveCategory(category);
                      setOpenQuestion(0);
                    }}
                    type="button"
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12 mb-32">
          <div className="max-w-4xl mx-auto space-y-8">
            {filteredItems.map((item, index) => {
              const isOpen = openQuestion === index;
              return (
                <div key={item.question} className="bg-[rgba(60,51,47,0.4)] backdrop-blur-[20px] rounded-lg border border-outline-variant/10 p-8 md:p-10 hover:border-tertiary/30 transition-all duration-500 group">
                  <button
                    className="flex justify-between items-center gap-6 cursor-pointer w-full text-left"
                    onClick={() => setOpenQuestion(isOpen ? -1 : index)}
                    type="button"
                  >
                    <h3 className="font-headline text-2xl font-bold group-hover:text-tertiary transition-colors">{item.question}</h3>
                    <span className={`material-symbols-outlined ${isOpen ? 'text-tertiary' : 'text-on-surface-variant'}`}>{isOpen ? 'expand_less' : 'expand_more'}</span>
                  </button>

                  {isOpen && (
                    <div className="pt-8 text-on-surface-variant leading-relaxed space-y-4">
                      {item.answer.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {filteredItems.length === 0 && (
              <div className="text-center text-on-surface-variant py-10 border border-outline-variant/20 rounded-lg">
                No ritual answers found for your search.
              </div>
            )}
          </div>
        </section>

        <section className="px-6 md:px-12 pb-32">
          <div className="max-w-5xl mx-auto rounded-xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-[#221a17] opacity-90"></div>
            <img
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
              alt="Abstract melted chocolate texture"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVRcGA9YoO38z_90eZpIomsazmsriiz-AQyG6L1R2hrs4vC2J6KbX1Nc1GoAhOCVzdNeLHjN6e3sOGQJl9Ip3_GdXojpidyMkpuKC0_PvAbF8wkc0gHpH2rabifLBcua4AoXMzCGtuHz0zm4JyOAQ3JP-G-3ouovxnQcYrXKYtceERI596ceNLBRLAbyQMqpk_9PGFocUE_JvPqhoqr_uIGFGIslVUUW7X7z9DrkeCsDNpEmmkoZ354m-I4icQvnwxA4Gjll4Okw"
            />
            <div className="relative z-10 p-12 md:p-24 text-center">
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold mb-8">Unanswered Rituals?</h2>
              <p className="text-on-surface-variant text-lg mb-12 max-w-xl mx-auto">Our Liquid Curators are standing by to guide you through your scientific or spiritual journey with Balpro Life.</p>
              <Link className="bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] px-10 py-5 rounded-full text-on-tertiary font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform inline-block" to="/contact">
                Contact our Ritual Experts
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FaqPage;
