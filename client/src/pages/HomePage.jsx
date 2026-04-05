import React from 'react';
import ChocolateHero from '../components/ChocolateHero';
import BrandTrust from '../components/BrandTrust';
import ProductSpotlight from '../components/ProductSpotlight';
import WhyBalpro from '../components/WhyBalpro';
import StorySection from '../components/StorySection';
import IngredientsSection from '../components/IngredientsSection';
import BenefitsSection from '../components/BenefitsSection';
import ProductsSection from '../components/ProductsSection';
import TestimonialsSection from '../components/TestimonialsSection';

const HomePage = ({ onAddToCart }) => {
  const handleShopClick = () => {
    const element = document.getElementById('menu') || document.getElementById('shop');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <ChocolateHero onShopClick={handleShopClick} />
      <BrandTrust />
      <ProductSpotlight />
      <section id="about">
        <WhyBalpro />
      </section>
      <StorySection />
      <IngredientsSection />
      <BenefitsSection />
      <section id="menu">
        <ProductsSection onAddToCart={onAddToCart} />
      </section>
      <section id="reviews">
        <TestimonialsSection />
      </section>
    </>
  );
};

export default HomePage;