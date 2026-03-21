import React, { useState } from 'react';

const CTASection = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    setEmail('');
    alert('Thank you for subscribing!');
  };

  return (
    <section className="py-32" style={{backgroundColor: '#151312'}}>
      <div className="max-w-[1440px] mx-auto px-10">
        <div
          className="relative w-full rounded-[2rem] overflow-hidden py-24 px-10 text-center border"
          style={{
            backgroundColor: '#221f1e',
            borderColor: 'rgba(77, 69, 65, 0.1)',
          }}
        >
          {/* Background Gradient Pattern */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div
              className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(239,191,112,0.2)_0%,_transparent_70%)]"
            ></div>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-10">
            <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tighter text-[#e8e1de]" style={{fontFamily: 'Epilogue'}}>
              The Ritual Awaits.
            </h2>
            
            <p className="font-body text-[#d9c4a2] text-lg font-light leading-relaxed" style={{fontFamily: 'Manrope'}}>
              Join an elite collective of high-performers. Subscribe to seasonal curations and receive early access to limited obsidian drops.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row justify-center items-center gap-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full md:w-80 bg-transparent border-b py-4 px-2 font-label text-[10px] tracking-widest text-[#e8e1de] focus:outline-none transition-colors"
                style={{borderColor: '#4d4541'}}
                placeholder="YOUR EMAIL ADDRESS"
              />
              <button
                type="submit"
                className="w-full md:w-auto px-12 py-5 font-headline text-xs font-bold uppercase tracking-widest rounded-xl hover:scale-105 transition-transform duration-500"
                style={{backgroundColor: '#efbf70', color: '#432c00', fontFamily: 'Epilogue', boxShadow: '0 15px 30px rgba(239, 191, 112, 0.1)'}}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
