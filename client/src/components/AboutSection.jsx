import React from 'react';

const AboutSection = () => {
  return (
    <section id="story" className="py-40" style={{backgroundColor: '#100e0c'}}>
      <div className="max-w-[1440px] mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -top-10 -left-10 w-40 h-40 border-l border-t" style={{borderColor: 'rgba(239, 191, 112, 0.3)', zIndex: 0}}></div>
            
            <img
              alt="The Laboratory"
              className="relative z-10 w-full rounded-2xl object-cover"
              style={{filter: 'grayscale(1) brightness(0.75)'}}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ27x50Yi-LjqVkjRjaNKUfZbmeM2UpyE4q5oNT6zRkTj1-FmbdA6BBhPlbwq796XAH_9C7bFwSuCpA-YXKjdvO2K95AaGhI5eDVbyW2EaSlHRhBVSzjrVUPmLcy02ZzGB0dHnxT5BBc2ejchDCkG3VIven55aK0OKPCgB06n2_9RT78nMMF7ShqFfOyDsrgxfjsN6-vu_xd-88bx8GMw1W9aUv9-CB7Vj0CzRFN1aIOs0S1D7_cIu_PL5DfByg-AS7gQB9G9b8-o"
            />
            
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border-r border-b" style={{borderColor: 'rgba(239, 191, 112, 0.3)', zIndex: 0}}></div>
          </div>

          {/* Content Side */}
          <div className="space-y-10 order-1 lg:order-2">
            <span className="font-label text-[0.6875rem] uppercase tracking-[0.2rem]" style={{color: '#efbf70', fontFamily: 'Manrope'}}>
              Our Genesis
            </span>

            <h2 className="font-headline text-5xl md:text-6xl font-black tracking-tighter text-[#e8e1de] leading-tight" style={{fontFamily: 'Epilogue'}}>
              Crafting the Future of Focus.
            </h2>

            <div className="space-y-6 text-lg text-[#d9c4a2] font-light leading-relaxed" style={{fontFamily: 'Manrope'}}>
              <p>
                Born in the intersection of molecular biology and high-artisan craft, BALPRO LIFE was founded for those who find peace in precision. We believe your daily supplements should be as sophisticated as your life.
              </p>
              <p>
                Every bottle is a culmination of five years of research into adaptogenic bioavailability, housed in light-filtering obsidian glass to preserve structural integrity.
              </p>
            </div>

            <div className="pt-6">
              <a
                href="#"
                className="inline-flex items-center gap-4 text-[#efbf70] font-headline text-xs uppercase tracking-[0.2rem] font-bold group"
                style={{fontFamily: 'Epilogue'}}
              >
                Read Our Manifesto
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform" style={{fontFamily: 'Material Symbols Outlined'}}>
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;