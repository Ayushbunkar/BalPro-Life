import React, { useEffect, useState } from 'react';
import { productsAPI } from '../utils/api';

const formatPrice = (value) => {
  if (typeof value !== 'number') return '$0.00';
  return `$${value.toFixed(2)}`;
};

const ProductsSection = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadProducts = async () => {
      try {
        const response = await productsAPI.getFeaturedProducts();
        const featured = Array.isArray(response?.data) ? response.data : [];

        if (active) {
          setProducts(featured.slice(0, 3));
        }
      } catch (_error) {
        if (active) {
          setProducts([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="py-32 bg-surface-container" id="shop">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-20">The Indulgent Collection</h2>

        {loading ? (
          <p className="text-on-surface-variant">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-on-surface-variant">No products available right now.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {products.map((product, index) => {
              const image = product?.images?.[0]?.url || '';
              return (
                <div
                  key={product._id}
                  className={`group cursor-pointer ${index === 1 ? 'translate-y-8' : ''}`}
                >
                  <div className="aspect-4/5 bg-surface-container-low rounded-xl overflow-hidden mb-6 relative border border-outline-variant/5 group-hover:border-tertiary/20 transition-all">
                    {image ? (
                      <img
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={image}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-on-surface-variant">No image</div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-surface/40 backdrop-blur-sm">
                      <button
                        onClick={() => onAddToCart?.(product, 1)}
                        className="gold-shimmer text-on-tertiary-fixed font-bold px-8 py-3 rounded-full"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="text-tertiary font-semibold">{formatPrice(product.price)}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
