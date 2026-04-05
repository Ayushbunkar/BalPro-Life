import React, { useEffect, useState } from 'react';
import { productsAPI } from '../utils/api';

const formatPrice = (value) => {
  if (typeof value !== 'number') return '₹0.00';
  return `₹${value.toFixed(2)}`;
};

const ProductsSection = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const hasFlavor = (product, flavor) => {
    const text = `${product?.name || ''} ${product?.description || ''}`.toLowerCase();
    return text.includes(flavor);
  };

  useEffect(() => {
    let active = true;

    const loadProducts = async () => {
      try {
        const response = await productsAPI.getFeaturedProducts();
        const featured = Array.isArray(response?.data) ? response.data : [];

        if (active) {
          setProducts(featured);
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

  const chocolateProduct = products.find((p) => hasFlavor(p, 'chocolate')) || products[0] || null;
  const vanillaProduct =
    products.find((p) => hasFlavor(p, 'vanilla')) ||
    products.find((p) => p?._id !== chocolateProduct?._id) ||
    chocolateProduct;

  return (
    <section className="py-20 md:py-24 bg-surface-container" id="shop">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-12 md:mb-14">The Indulgent Collection</h2>

        {loading ? (
          <p className="text-on-surface-variant">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-on-surface-variant">No products available right now.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                key: 'chocolate',
                title: 'Chocolate Collection',
                displayName: chocolateProduct?.name || 'BalPro Chocolate',
                product: chocolateProduct,
              },
              {
                key: 'vanilla',
                title: 'Vanilla Collection',
                displayName: hasFlavor(vanillaProduct, 'vanilla') ? vanillaProduct?.name : 'BalPro Vanilla',
                product: vanillaProduct,
              },
            ].map((section) => {
              const product = section.product;
              const image = product?.images?.[0]?.url || '';

              return (
                <div key={section.key} className="group cursor-pointer text-left">
                  <p className="text-tertiary uppercase tracking-[0.2em] text-xs font-bold mb-3">{section.title}</p>

                  <div className="h-[260px] md:h-[300px] bg-surface-container-low rounded-2xl overflow-hidden mb-5 relative border border-outline-variant/10 group-hover:border-tertiary/30 transition-all">
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

                  <h3 className="text-2xl font-bold text-on-surface">{section.displayName}</h3>
                  <p className="text-tertiary font-semibold">{formatPrice(product?.price)}</p>
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
