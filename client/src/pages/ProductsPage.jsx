import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Sparkles, Zap } from 'lucide-react';
import { productsAPI } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import bottleChocolateImage from '../assets/bottleechoclate.jpg';
import vanillaChocolateImage from '../assets/vanillachoclate.jpg';
import chocolatePack6Image from '../assets/6packchoclate.jpg';
import vanillaPack6Image from '../assets/vanilla6pack.png';

const MAX_PRODUCT_LOAD_RETRIES = 3;
const RETRY_BASE_DELAY_MS = 1200;

const hasFlavor = (product, flavor) => {
  const text = `${product?.name || ''} ${product?.description || ''}`.toLowerCase();
  return text.includes(flavor);
};

const isPackOf6 = (product) => {
  const text = `${product?.name || ''} ${product?.description || ''} ${(product?.tags || []).join(' ')}`.toLowerCase();
  return text.includes('pack of 6') || text.includes('6 pack') || text.includes('x6') || text.includes('pack6');
};

const PRODUCT_VARIANTS = [
  {
    key: 'chocolate-single',
    title: 'Chocolate Flavour',
    packType: 'single',
    flavor: 'chocolate',
    fallbackName: 'BalPro Chocolate Flavour',
    fallbackImage: bottleChocolateImage,
  },
  {
    key: 'vanilla-single',
    title: 'Vanilla Flavour',
    packType: 'single',
    flavor: 'vanilla',
    fallbackName: 'BalPro Vanilla',
    fallbackImage: vanillaChocolateImage,
  },
  {
    key: 'chocolate-pack6',
    title: 'Chocolate Pack of 6',
    packType: 'pack6',
    flavor: 'chocolate',
    fallbackName: 'BalPro Chocolate Flavour Pack of 6',
    fallbackImage: chocolatePack6Image,
  },
  {
    key: 'vanilla-pack6',
    title: 'Vanilla Pack of 6',
    packType: 'pack6',
    flavor: 'vanilla',
    fallbackName: 'BalPro Vanilla Pack of 6',
    fallbackImage: vanillaPack6Image,
  },
];

const faqs = [
  {
    question: 'How should I serve it?',
    answer:
      'For the ultimate experience, serve chilled or pour over ice. You can also heat it gently on a stovetop for a gourmet functional hot chocolate.',
  },
  {
    question: 'When will I feel the effects?',
    answer:
      'Most customers report smoother focus in 20 to 40 minutes. Effects vary by hydration, sleep quality, and personal caffeine sensitivity.',
  },
  {
    question: 'Is it safe for daily use?',
    answer:
      'Yes, for healthy adults this formula is designed for daily use. If you are pregnant, nursing, or under medical supervision, consult your clinician first.',
  },
];

const ProductsPage = ({ onAddToCart }) => {
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [selectedVariantKey, setSelectedVariantKey] = useState('chocolate-single');
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [addToCartMessage, setAddToCartMessage] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  const findVariantProduct = (flavor, packType) => {
    const byFlavor = products.filter((product) => hasFlavor(product, flavor));
    if (packType === 'pack6') {
      return byFlavor.find((product) => isPackOf6(product)) || null;
    }
    return byFlavor.find((product) => !isPackOf6(product)) || null;
  };

  const variants = PRODUCT_VARIANTS.map((variant) => ({
    ...variant,
    product: findVariantProduct(variant.flavor, variant.packType),
  }));

  const selectedVariant = variants.find((variant) => variant.key === selectedVariantKey) || variants[0];
  const firstAvailableVariant = variants.find((variant) => variant.product);
  const primaryProduct = selectedVariant?.product || firstAvailableVariant?.product || null;

  useEffect(() => {
    let active = true;
    let retryTimer = null;

    const fetchProducts = async () => {
      const featuredResponse = await productsAPI.getFeaturedProducts().catch(() => null);
      const featuredProducts = Array.isArray(featuredResponse?.data) ? featuredResponse.data : [];
      if (featuredProducts.length > 0) {
        return featuredProducts;
      }

      const response = await productsAPI.getProducts({ page: 1, limit: 12 }).catch(() => null);
      const products = Array.isArray(response?.data) ? response.data : [];
      return products;
    };

    const loadProducts = async (attempt = 0) => {
      const nextProducts = await fetchProducts();
      if (!active) return;

      if (nextProducts.length > 0) {
        setProducts(nextProducts);
        setRetryCount(attempt);
        setLoadingProduct(false);
        setAddToCartMessage('');
        return;
      }

      if (attempt < MAX_PRODUCT_LOAD_RETRIES) {
        setRetryCount(attempt + 1);
        retryTimer = window.setTimeout(() => {
          loadProducts(attempt + 1);
        }, RETRY_BASE_DELAY_MS * (attempt + 1));
        return;
      }

      setProducts([]);
      setLoadingProduct(false);
      setAddToCartMessage('No live product available right now. Please try again shortly.');
    };

    setLoadingProduct(true);
    setRetryCount(0);
    setAddToCartMessage('');
    loadProducts();

    return () => {
      active = false;
      if (retryTimer) {
        window.clearTimeout(retryTimer);
      }
    };
  }, []);

  const handleAddToCart = async () => {
    if (!onAddToCart) return;

    if (!primaryProduct?._id) {
      setAddToCartMessage('Product data is not available right now.');
      return;
    }

    setAddToCartMessage('');
    try {
      await onAddToCart(primaryProduct, quantity);
    } catch {
      setAddToCartMessage('Unable to add this product right now.');
    }
  };

  const handleRetryNow = async () => {
    setLoadingProduct(true);
    setRetryCount(0);
    setAddToCartMessage('');

    const featuredResponse = await productsAPI.getFeaturedProducts().catch(() => null);
    const featuredProducts = Array.isArray(featuredResponse?.data) ? featuredResponse.data : [];

    let nextProducts = featuredProducts;
    if (!nextProducts.length) {
      const response = await productsAPI.getProducts({ page: 1, limit: 12 }).catch(() => null);
      nextProducts = Array.isArray(response?.data) ? response.data : [];
    }

    setProducts(nextProducts);
    setLoadingProduct(false);
    if (!nextProducts.length) {
      setAddToCartMessage('No live product available right now. Please try again shortly.');
    }
  };

  const displayName = primaryProduct?.name || selectedVariant?.fallbackName || 'Product Unavailable';
  const displayDescription = primaryProduct?.description || 'Choose from our four signature wellness variants.';
  const displayPrice = typeof primaryProduct?.price === 'number' ? primaryProduct.price : 0;
  const displayOriginalPrice = typeof primaryProduct?.originalPrice === 'number' ? primaryProduct.originalPrice : null;
  const displayImage = primaryProduct?.images?.[0]?.url || selectedVariant?.fallbackImage || bottleChocolateImage;

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-tertiary/30 pb-28 md:pb-0">
      <main className="pt-8">
        <section className="relative min-h-[calc(100svh-6rem)] flex flex-col md:flex-row items-center justify-between px-8 md:px-24 py-4 md:py-6 mb-16 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-tertiary/5 rounded-full blur-[120px]"></div>

          <div className="w-full md:w-1/2 z-10 space-y-5 lg:space-y-6">
            <div className="inline-block px-4 py-1 rounded-full bg-surface-container-highest text-tertiary text-xs font-bold tracking-[0.2em] mb-4">
              {selectedVariant?.title?.toUpperCase() || 'CHOCOLATE FLAVOUR'}
            </div>
            <h1 className="font-headline text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[0.9] [text-shadow:0_10px_30px_rgba(0,0,0,0.5)]">
              {displayName.split(' ')[0] || 'Product'} <br /> <span className="text-tertiary">Recovery.</span>
            </h1>
            <p className="max-w-md text-primary-fixed-dim text-lg leading-relaxed">
              {displayDescription}
            </p>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {variants.map((variant) => {
                const isSelected = selectedVariant?.key === variant.key;
                const available = !!variant?.product?._id;
                const previewImage = variant?.product?.images?.[0]?.url || variant.fallbackImage;
                const variantPrice = typeof variant?.product?.price === 'number' ? variant.product.price : null;

                return (
                  <button
                    key={variant.key}
                    type="button"
                    onClick={() => {
                      setSelectedVariantKey(variant.key);
                      setQuantity(1);
                      setAddToCartMessage('');
                    }}
                    className={`relative overflow-hidden text-left rounded-2xl border p-3.5 md:p-4 transition-all duration-300 ${isSelected ? 'border-[#efbf70] bg-[linear-gradient(160deg,rgba(239,191,112,0.14),rgba(40,25,18,0.88))] shadow-[0_14px_36px_rgba(167,126,54,0.30)] -translate-y-0.5' : 'border-[#3f322a] bg-[linear-gradient(160deg,rgba(27,16,12,0.96),rgba(16,9,7,0.96))] hover:border-[#8b6731] hover:-translate-y-0.5'} ${!available ? 'opacity-70' : ''}`}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,191,112,0.20),transparent_45%)]" />

                    <div className="relative w-full h-36 md:h-40 rounded-xl overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(0,0,0,0.24))] mb-3 border border-white/10">
                      <img
                        src={previewImage}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover opacity-25 scale-110 blur-[1.5px]"
                        loading="lazy"
                      />
                      <img
                        src={previewImage}
                        alt={variant.title}
                        className="relative w-full h-full object-contain p-2.5 md:p-3"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = variant.fallbackImage;
                        }}
                      />
                    </div>

                    <div className="relative flex items-center justify-between gap-2">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-[#efbf70] font-bold">{variant.packType === 'pack6' ? 'Pack of 6' : 'Single Bottle'}</p>
                      {variantPrice !== null && <span className="text-[11px] font-semibold text-[#f3d7a5]">₹{variantPrice.toFixed(0)}</span>}
                    </div>

                    <p className="relative text-sm md:text-[15px] font-bold text-on-surface mt-1 leading-snug line-clamp-2">{variant.product?.name || variant.fallbackName}</p>
                    {!available && <p className="relative text-[11px] text-on-surface-variant mt-1">Unavailable</p>}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col space-y-4 pt-3">
              <div className="flex items-baseline space-x-4">
                <span className="text-4xl font-headline font-bold text-on-surface">₹{displayPrice.toFixed(2)}</span>
                {typeof displayOriginalPrice === 'number' && displayOriginalPrice > displayPrice && (
                  <span className="text-outline line-through">₹{displayOriginalPrice.toFixed(2)}</span>
                )}
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-surface-container rounded-full border border-outline-variant/20 p-1">
                  <button
                    className="w-12 h-12 flex items-center justify-center text-on-surface-variant hover:text-tertiary transition-colors"
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <span className="px-6 font-bold text-lg">{quantity}</span>
                  <button
                    className="w-12 h-12 flex items-center justify-center text-on-surface-variant hover:text-tertiary transition-colors"
                    type="button"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>

                <button
                  className="bg-[linear-gradient(135deg,#efbf70,#a77e36)] px-10 py-4 rounded-full text-on-tertiary-fixed font-bold text-lg relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                  type="button"
                  disabled={loadingProduct || !primaryProduct?._id}
                  onClick={handleAddToCart}
                >
                  {loadingProduct ? 'LOADING...' : 'ADD TO CART'}
                </button>
              </div>

              {!loadingProduct && !isAuthenticated && (
                <p className="text-sm text-primary-fixed-dim">Login required to add items.</p>
              )}

              {!loadingProduct && addToCartMessage && (
                <div className="flex items-center gap-3">
                  <p className="text-sm text-error">{addToCartMessage}</p>
                  {!primaryProduct?._id && (
                    <button
                      type="button"
                      className="text-xs text-tertiary hover:underline"
                      onClick={handleRetryNow}
                    >
                      Retry now {retryCount > 0 ? `(${retryCount}/${MAX_PRODUCT_LOAD_RETRIES})` : ''}
                    </button>
                  )}
                </div>
              )}

              <button
                type="button"
                className="w-full md:w-[420px] py-4 rounded-full border border-outline-variant/30 text-on-surface font-semibold hover:bg-surface-container-highest transition-all"
              >
                BUY IT NOW
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative flex justify-center mt-10 md:mt-0">
            <div className="relative z-20 w-full max-w-[520px] rounded-4xl border border-[#5e4623]/40 bg-[linear-gradient(150deg,rgba(47,31,21,0.94),rgba(17,10,8,0.94))] shadow-[0_26px_70px_rgba(0,0,0,0.55)] p-5 md:p-7 overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,191,112,0.22),transparent_45%)]" />
              <div className="pointer-events-none absolute -left-14 -bottom-14 w-44 h-44 rounded-full bg-[#efbf70]/12 blur-3xl" />

              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/20">
                <img
                  alt={displayName}
                  className="w-full aspect-4/5 object-cover"
                  src={displayImage}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = selectedVariant?.fallbackImage || bottleChocolateImage;
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black/60 to-transparent">
                  <div className="inline-flex items-center rounded-full bg-[#1e140f]/80 border border-[#efbf70]/30 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#efbf70] font-bold">
                    {selectedVariant?.packType === 'pack6' ? 'Premium Pack of 6' : 'Premium Single Bottle'}
                  </div>
                </div>
              </div>

              <div className="relative mt-4 flex flex-wrap gap-2">
                <span className="text-[11px] uppercase tracking-[0.16em] rounded-full px-3 py-1 border border-[#efbf70]/30 bg-[#2b1c14]/80 text-[#f2d6a1]">Luxury Blend</span>
                <span className="text-[11px] uppercase tracking-[0.16em] rounded-full px-3 py-1 border border-[#efbf70]/30 bg-[#2b1c14]/80 text-[#f2d6a1]">Small Batch</span>
                <span className="text-[11px] uppercase tracking-[0.16em] rounded-full px-3 py-1 border border-[#efbf70]/30 bg-[#2b1c14]/80 text-[#f2d6a1]">Daily Wellness</span>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-linear-to-tr from-tertiary/10 to-transparent rounded-full blur-3xl -z-10"></div>
          </div>
        </section>

        <section className="bg-surface-container-low py-24 px-8 md:px-24 rounded-t-[3rem] md:rounded-t-[5rem]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 space-y-4">
              <h2 className="font-headline text-4xl md:text-5xl font-bold">Molecular Benefits</h2>
              <p className="text-primary-fixed-dim max-w-xl">Every drop is engineered for peak performance and sensory bliss.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group relative bg-surface-container-highest p-10 rounded-xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-full bg-[#efbf70] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Sparkles size={30} className="text-white" strokeWidth={2.2} />
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4">Adaptogenic Core</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Infused with 500mg of Reishi and Ashwagandha to modulate stress response and enhance focus.
                </p>
              </div>

              <div className="group relative bg-surface-container-highest p-10 rounded-xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-full bg-[#efbf70] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Zap size={30} className="text-white" strokeWidth={2.2} />
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4">Slow Release Energy</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  No spikes. No crashes. Just sustained mental clarity powered by organic raw cacao beans.
                </p>
              </div>

              <div className="group relative bg-surface-container-highest p-10 rounded-xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-full bg-[#efbf70] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Dumbbell size={30} className="text-white" strokeWidth={2.2} />
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4">Muscle Recovery</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Natural magnesium content aids in muscle relaxation and reduces inflammation post-ritual.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-8 md:px-24">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
            <div className="w-full md:w-1/2">
              <h3 className="font-headline text-3xl font-bold mb-10">Clean Label. Zero Regrets.</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-outline-variant/10 pb-4">
                  <span className="text-on-surface font-semibold">Calories</span>
                  <span className="text-tertiary font-bold text-2xl">110</span>
                </div>
                <div className="flex justify-between items-end border-b border-outline-variant/10 pb-4">
                  <span className="text-on-surface font-semibold">Total Sugars</span>
                  <span className="text-tertiary font-bold text-2xl">2g</span>
                </div>
                <div className="flex justify-between items-end border-b border-outline-variant/10 pb-4">
                  <span className="text-on-surface font-semibold">Protein</span>
                  <span className="text-tertiary font-bold text-2xl">8g</span>
                </div>
                <div className="flex justify-between items-end border-b border-outline-variant/10 pb-4">
                  <span className="text-on-surface font-semibold">Fiber</span>
                  <span className="text-tertiary font-bold text-2xl">5g</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <div className="bg-surface-container-highest rounded-xl p-8 md:p-12 relative overflow-hidden">
                <img
                  alt="Product texture detail"
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5cRyeC3ZdWYzUn5CJWqIdt3m4ZewXFcvPY_C5fbJecERVANXEC4sDQ32dofchWJjJiXUWFSlmQzVI66pLFZfwlOoNNwwyTbb82clH0N2qm0z4XC0VKxTXz1YJQYSAKOCvYaTzxZPa1URwyOvAeOY00yVqZBaHjJFiRreYM6At8OFEXfTbZJ3Laidt95eRsY52JRcR9iuva6jF2MrvcD0O_7ufcCpS0lZxZ_B7ClpdnPuG8mM9PpPSg_Ndn_87qtag2eljcH2g_Q"
                />
                <div className="relative z-10 space-y-6">
                  <h4 className="font-headline text-2xl font-bold">The Craft Process</h4>
                  <p className="text-on-surface-variant italic">
                    We do not just make chocolate; we curate a physical state of being. Every pack is cold-pressed to
                    preserve the delicate structure of functional botanicals.
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    <span className="px-3 py-1 rounded bg-tertiary/10 text-tertiary text-xs uppercase font-bold">Non-GMO</span>
                    <span className="px-3 py-1 rounded bg-tertiary/10 text-tertiary text-xs uppercase font-bold">Vegan</span>
                    <span className="px-3 py-1 rounded bg-tertiary/10 text-tertiary text-xs uppercase font-bold">Gluten Free</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-8 md:px-24 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-16 gap-6 flex-wrap">
              <h2 className="font-headline text-4xl font-bold">Voices of Indulgence</h2>
              <div className="flex items-center space-x-2 text-tertiary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="text-on-surface font-bold ml-2">4.9 / 5</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2 bg-surface p-8 rounded-lg shadow-sm">
                <p className="text-lg font-medium mb-6">
                  Finally, a health drink that does not taste like dirt. It is thick, creamy, and actually helps me
                  wind down after a long day.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary-container"></div>
                  <div>
                    <p className="font-bold">Julianne V.</p>
                    <p className="text-xs text-outline">Verified Connoisseur</p>
                  </div>
                </div>
              </div>
              <div className="bg-surface p-8 rounded-lg shadow-sm">
                <p className="text-sm mb-6">The subscription replaced my 3PM coffee and my 9PM dessert.</p>
                <p className="font-bold">Marcus T.</p>
              </div>
              <div className="bg-surface p-8 rounded-lg shadow-sm">
                <p className="text-sm mb-6">Packaging is editorial quality. Looks amazing in my fridge and tastes even better.</p>
                <p className="font-bold">Elena R.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-8 md:px-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-headline text-4xl font-bold mb-16 text-center">Questions and Answers</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const open = openFaqIndex === idx;
                return (
                  <div key={faq.question} className="border-b border-outline-variant/10">
                    <button
                      className="w-full flex justify-between items-center py-6 text-left hover:text-tertiary transition-colors"
                      type="button"
                      onClick={() => setOpenFaqIndex(open ? -1 : idx)}
                    >
                      <span className="text-xl font-bold">{faq.question}</span>
                      <span className={`material-symbols-outlined transition-transform ${open ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>
                    {open && <div className="pb-6 text-on-surface-variant">{faq.answer}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 w-full z-50 rounded-t-3xl md:hidden bg-[#19120f]/90 backdrop-blur-2xl border-t border-[#4f4440]/20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] h-20 pb-safe px-6 flex justify-around items-center">
        <Link className="flex flex-col items-center justify-center text-[#efbf70] bg-[#3c332f] rounded-full py-2 px-4 scale-95 active:scale-90 transition-transform" to="/products">
          <span className="material-symbols-outlined">local_mall</span>
          <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Shop</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-[#e2bfb2]/50 py-2 px-4 scale-95 active:scale-90 transition-transform" to="/ingredients">
          <span className="material-symbols-outlined">auto_awesome</span>
          <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Benefits</span>
        </Link>
        <button className="flex flex-col items-center justify-center text-[#e2bfb2]/50 py-2 px-4 scale-95 active:scale-90 transition-transform" type="button">
          <span className="material-symbols-outlined">shopping_cart</span>
          <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Cart</span>
        </button>
        <Link className="flex flex-col items-center justify-center text-[#e2bfb2]/50 py-2 px-4 scale-95 active:scale-90 transition-transform" to="/login">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Account</span>
        </Link>
      </nav>
    </div>
  );
};

export default ProductsPage;
