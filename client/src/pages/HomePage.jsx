import React from 'react';
import Hero from '../components/Hero';
import ProductsSection from '../components/ProductsSection';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';

const HomePage = ({ onAddToCart }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero scrollToSection={scrollToSection} />
      <ProductsSection onAddToCart={onAddToCart} />
      <AboutSection />
      <Footer />
    </>
  );
};

export default HomePage;