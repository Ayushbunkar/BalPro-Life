import React from 'react';
import ProductsSection from '../components/ProductsSection';

const ProductsPage = ({ onAddToCart }) => {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ProductsSection onAddToCart={onAddToCart} />
      </div>
    </div>
  );
};

export default ProductsPage;