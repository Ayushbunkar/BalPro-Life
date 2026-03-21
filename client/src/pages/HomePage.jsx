import React from 'react';
import Hero from '../components/Hero';
import ProductsSection from '../components/ProductsSection';
import AboutSection from '../components/AboutSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const HomePage = ({ onAddToCart }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero scrollToSection={scrollToSection} />
      
      {/* Featured In Section */}
      <section className="py-16" style={{backgroundColor: 'rgba(30, 27, 26, 0.5)', borderTop: '1px solid rgba(77, 69, 65, 0.05)', borderBottom: '1px solid rgba(77, 69, 65, 0.05)'}}>
        <div className="max-w-[1440px] mx-auto px-10">
          <p className="text-center font-label text-[10px] uppercase tracking-[0.4rem] text-[#d9c4a2] opacity-50 mb-12" style={{fontFamily: 'Manrope'}}>
            As Seen In The Curated Press
          </p>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32" style={{filter: 'grayscale(1) opacity(0.4) contrast(1.25)'}}>
            <span className="font-headline text-3xl italic tracking-tighter" style={{fontFamily: 'Epilogue'}}>VOGUE</span>
            <span className="font-headline text-3xl font-extrabold tracking-tight" style={{fontFamily: 'Epilogue'}}>Healthline</span>
            <span className="font-headline text-3xl uppercase tracking-widest font-light" style={{fontFamily: 'Epilogue'}}>GQ</span>
            <span className="font-headline text-3xl font-black italic" style={{fontFamily: 'Epilogue'}}>WIRED</span>
            <span className="font-headline text-3xl tracking-tighter" style={{fontFamily: 'Epilogue'}}>Forbes</span>
          </div>
        </div>
      </section>

      <ProductsSection onAddToCart={onAddToCart} />
      <AboutSection />
      <CTASection />
      <Footer />
    </>
  );
};

export default HomePage;