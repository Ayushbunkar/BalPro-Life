import React from 'react';
import Button from './Button';
import ProductCard from './ProductCard';

const ProductsSection = ({ onAddToCart }) => {
  return (
    <section id="products" className="py-0 bg-transparent">
      <ProductCard onAddToCart={onAddToCart} />
    </section>
  );
};

export default ProductsSection;