import React from 'react';

const Hero = ({ scrollToSection }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden" style={{backgroundColor: '#0A0807'}}>
      {/* Ambient Amber Glows */}
      <div
        className="absolute top-1/4 -left-20 w-[600px] h-[600px] blur-[120px] rounded-full pointer-events-none"
        style={{backgroundColor: 'rgba(239, 191, 112, 0.1)'}}
      ></div>
      <div
        className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] blur-[100px] rounded-full pointer-events-none"
        style={{backgroundColor: 'rgba(239, 191, 112, 0.05)'}}
      ></div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center w-full">
        {/* Left Content */}
        <div className="space-y-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border" style={{backgroundColor: 'rgba(55, 52, 50, 0.3)', borderColor: 'rgba(77, 69, 65, 0.2)'}}>
            <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#efbf70', boxShadow: '0 0 10px #efbf70'}}></div>
            <span className="font-label text-[0.6875rem] uppercase tracking-[0.2rem]" style={{color: '#d9c4a2', fontFamily: 'Manrope'}}>
              The 2024 Collection
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-6">
            <h1 className="text-7xl md:text-8xl font-black leading-[0.9] tracking-tighter text-[#e8e1de]" style={{fontFamily: 'Epilogue'}}>
              Pure Indulgence.<br />
              <span style={{background: 'linear-gradient(135deg, #efbf70 0%, #9a722b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
                Better Energy.
              </span>
            </h1>
            <p className="text-xl text-[#d9c4a2] max-w-lg leading-relaxed font-light" style={{fontFamily: 'Manrope'}}>
              Experience the fusion of molecular science and liquid luxury. Crafted for those who demand performance without compromising on the sensory ritual.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-6 pt-4">
            <button
              className="group relative px-10 py-5 font-bold uppercase tracking-wider text-sm rounded-xl transition-all duration-500 hover:scale-105"
              style={{backgroundColor: '#efbf70', color: '#432c00', fontFamily: 'Epilogue', boxShadow: '0 0 30px rgba(239, 191, 112, 0.2)'}}
            >
              Start Your Ritual
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
            </button>
            <button
              className="px-10 py-5 font-bold uppercase tracking-wider text-sm rounded-xl transition-all duration-400 hover:opacity-100"
              style={{color: '#d9c4a2', fontFamily: 'Epilogue', border: '1px solid rgba(217, 196, 162, 0.3)'}}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(217, 196, 162, 0.05)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Explore the Science
            </button>
          </div>
        </div>

        {/* Right Content - Bottle Image */}
        <div className="relative flex justify-center items-center">
          <div className="relative z-20 w-full max-w-md aspect-[3/4] rounded-full absolute -inset-10 opacity-30 blur-3xl" style={{backgroundColor: 'rgba(239, 191, 112, 0.1)'}}></div>
          
          <img
            alt="Velvet Cocoa Bottle"
            className="relative z-30 w-full h-auto max-h-[716px] object-contain drop-shadow-2xl"
            style={{filter: 'drop-shadow(0 35px 35px rgba(0,0,0,0.8)) brightness(1.1)', mixBlendMode: 'lighten'}}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_burfxyEJaHUOHia8VkIm2AujuhnhVujLdHxSpZStPXIEWt22n-faTP2Zev0LqLj2i4wIs0LUbKlijQ-v2lsDJT_BHw8mVWAGmSgEcb4MJwj8gvCGxkwaOWBJRJNiO5eJKlzQO1nD2k6bbcN4F0fOUsPJSVX_NJA8nV-D3JozxdpvrXwowNyCVtnL3kuPNmkg39tMDi2QmYxGPxUDmZygG29d3M6S7al_tLbpotXETZLeBl0x1AuU-8_gWPUxBICh7m0A-j-uKdg"
          />

          {/* Floating Cards */}
          <div
            className="absolute top-20 right-0 z-40 p-6 rounded-2xl border border-[#efbf70]/10 shadow-2xl"
            style={{backgroundColor: 'rgba(10, 8, 7, 0.6)', backdropFilter: 'blur(40px)'}}
          >
            <p className="font-label text-[10px] uppercase tracking-widest text-[#efbf70] mb-1" style={{fontFamily: 'Manrope'}}>
              Key Note
            </p>
            <p className="font-headline text-lg text-[#e8e1de]" style={{fontFamily: 'Epilogue'}}>
              Ecuadorian Cacao
            </p>
          </div>

          <div
            className="absolute bottom-20 left-0 z-40 p-6 rounded-2xl border border-[#efbf70]/10 shadow-2xl"
            style={{backgroundColor: 'rgba(10, 8, 7, 0.6)', backdropFilter: 'blur(40px)'}}
          >
            <p className="font-label text-[10px] uppercase tracking-widest text-[#efbf70] mb-1" style={{fontFamily: 'Manrope'}}>
              Benefit
            </p>
            <p className="font-headline text-lg text-[#e8e1de]" style={{fontFamily: 'Epilogue'}}>
              Cognitive Flow
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;