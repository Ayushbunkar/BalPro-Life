import React from 'react';
import homepageVideo from '../assets/homepage.mp4';
import { Play } from 'lucide-react';
import Button from './Button';

const Hero = ({ scrollToSection }) => {
  return (
    <section className="relative pb-10 pt-10 overflow-hidden section-below-navbar" style={{backgroundColor: '#F8F2E9'}}>
      <div className="content-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          <div className="lg:w-1/2 space-y-10 text-center lg:text-left z-20">
            <div className="inline-block">
              
            </div>
            <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter" style={{color: '#7B4A22'}}>
              FUEL <br/>
              <span className="text-transparent bg-clip-text bg-linear-to-r" style={{backgroundImage: 'linear-gradient(to right, #4FAF5A, #1D6B3A)'}}>AMBITION.</span>
            </h1>
            <p className="text-lg max-w-md mx-auto lg:mx-0 font-medium leading-relaxed pl-6" style={{color: '#1A1A1A', borderLeftColor: '#D6B37C', borderLeftWidth: '4px'}}>
              Real Food. Real Protein. Real Performance. <br />
              The Everyday Protein Your Body Deserves.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Button variant="primary" onClick={() => scrollToSection('products')}>Shop Now</Button>

            </div>
          </div>          <div className="lg:w-1/2 relative">
             {/* --- AI GENERATED IMAGE IMPLEMENTATION --- */}
             <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 ring-1 ring-slate-100 group" style={{borderColor: '#F4E8D3', boxShadow: '0 25px 50px -12px rgba(125, 74, 34, 0.25)'}}>
                 <video
                   src={homepageVideo}
                   alt="BalPro Premium Protein Splash"
                   className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-1000"
                   autoPlay
                   muted
                   loop
                   playsInline
                />
                {/* Overlay Gradient for Text Readability if needed, but image is dark */}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent pointer-events-none"></div>
             </div>

             {/* Decorative Elements */}
             <div className="hidden sm:block absolute -top-10 -right-10 w-64 h-64 rounded-full blur-3xl -z-10" style={{backgroundColor: 'rgba(31, 107, 58, 0.15)'}}></div>
             <div className="hidden sm:block absolute -bottom-10 -left-10 w-64 h-64 rounded-full blur-3xl -z-10" style={{backgroundColor: 'rgba(244, 232, 211, 0.4)'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;