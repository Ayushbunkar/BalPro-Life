import React, { useEffect, useState } from 'react';
import { productsAPI } from '../utils/api';
import bottleChocolateImage from '../assets/bottleechoclate.jpg';
import vanillaChocolateImage from '../assets/vanillachoclate.jpg';
import chocolatePack6Image from '../assets/6packchoclate.jpg';
import vanillaPack6Image from '../assets/vanilla6pack.png';

const formatPrice = (value) => {
  if (typeof value !== 'number') return '₹0.00';
  return `₹${value.toFixed(2)}`;
};

const stripFlavorWord = (value = '') => value.replace(/\bflavou?r\b/gi, '').replace(/\s{2,}/g, ' ').trim();

const ProductsSection = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const hasFlavor = (product, flavor) => {
    const text = `${product?.name || ''} ${product?.description || ''}`.toLowerCase();
    return text.includes(flavor);
  };

  const isPackOf6 = (product) => {
    const text = `${product?.name || ''} ${product?.description || ''} ${(product?.tags || []).join(' ')}`.toLowerCase();
    return text.includes('pack of 6') || text.includes('6 pack') || text.includes('x6') || text.includes('pack6');
  };

  const findFlavorProduct = (flavor, packType) => {
    const byFlavor = products.filter((product) => hasFlavor(product, flavor));
    if (packType === 'pack6') {
      return byFlavor.find((product) => isPackOf6(product)) || null;
    }
    return byFlavor.find((product) => !isPackOf6(product)) || null;
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

  const chocolateSingleProduct = findFlavorProduct('chocolate', 'single');
  const vanillaSingleProduct = findFlavorProduct('vanilla', 'single');
  const chocolatePack6Product = findFlavorProduct('chocolate', 'pack6');
  const vanillaPack6Product = findFlavorProduct('vanilla', 'pack6');

  return (
    <section className="py-20 md:py-24 bg-surface-container" id="shop">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-12 md:mb-14">The Indulgent Collection</h2>

        {loading ? (
          <p className="text-on-surface-variant">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-on-surface-variant">No products available right now.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                key: 'chocolate-single',
                title: 'Chocolate Collection',
                displayName: stripFlavorWord(chocolateSingleProduct?.name || 'BalPro Chocolate'),
                product: chocolateSingleProduct,
                flavor: 'chocolate',
                sizeLabel: 'Single Bottle',
                forceImage: null,
              },
              {
                key: 'vanilla-single',
                title: 'Vanilla Collection',
                displayName: stripFlavorWord(hasFlavor(vanillaSingleProduct, 'vanilla') ? vanillaSingleProduct?.name : 'BalPro Vanilla'),
                product: vanillaSingleProduct,
                flavor: 'vanilla',
                sizeLabel: 'Single Bottle',
                forceImage: null,
              },
              {
                key: 'chocolate-pack6',
                title: 'Chocolate Collection',
                displayName: stripFlavorWord(chocolatePack6Product?.name || 'BalPro Chocolate Pack of 6'),
                product: chocolatePack6Product,
                flavor: 'chocolate',
                sizeLabel: 'Pack of 6',
                forceImage: chocolatePack6Image,
              },
              {
                key: 'vanilla-pack6',
                title: 'Vanilla Collection',
                displayName: stripFlavorWord(hasFlavor(vanillaPack6Product, 'vanilla') ? vanillaPack6Product?.name : 'BalPro Vanilla Pack of 6'),
                product: vanillaPack6Product,
                flavor: 'vanilla',
                sizeLabel: 'Pack of 6',
                forceImage: vanillaPack6Image,
              },
            ].map((section) => {
              const product = section.product;
              const sectionFallbackImage = section.flavor === 'vanilla' ? vanillaChocolateImage : bottleChocolateImage;
              const image = section.forceImage || product?.images?.[0]?.url || sectionFallbackImage;
              const canAddToCart = !!product?._id;

              return (
                <div key={section.key} className="group cursor-pointer text-left">
                  <p className="text-tertiary uppercase tracking-[0.2em] text-xs font-bold mb-3">{section.title}</p>
                  <p className="text-on-surface-variant uppercase tracking-[0.2em] text-[11px] font-semibold mb-2">{section.sizeLabel}</p>

                  <div className="h-[340px] md:h-[420px] bg-surface-container-low rounded-2xl overflow-hidden mb-5 relative border border-outline-variant/10 group-hover:border-tertiary/30 transition-all p-4 md:p-6">
                    <img
                      alt={product?.name || section.displayName}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                      src={image}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = sectionFallbackImage;
                      }}
                    />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-surface/40 backdrop-blur-sm">
                      <button
                        onClick={() => canAddToCart && onAddToCart?.(product, 1)}
                        disabled={!canAddToCart}
                        className="gold-shimmer text-on-tertiary-fixed font-bold px-8 py-3 rounded-full"
                      >
                        {canAddToCart ? 'Add to Cart' : 'Unavailable'}
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
