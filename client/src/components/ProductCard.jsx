import React from 'react';
import { Star } from 'lucide-react';
import Button from './Button';

const ProductCard = ({ onAddToCart }) => {
  // Hardcoded product data - no backend dependency
  const product = {
    id: 1,
    name: "BALPRO LIFE PROTEIN SHAKE",
    tagline: "PREMIUM NUTRITION",
    description: "• 20g Protein\n• Zero Added Sugar\n• High Calcium, Vitamin B12, & Fiber\n• Omega-3 from Chia Seeds\n• 215 Calories per 200 ml",
    price: 25,
    rating: 4.8,
    reviews: 1247,
    flavors: ["Banana Flavor"],
    imageGradient: "from-green-400 to-green-600",
    accentColor: "text-green-600"
  };

  return (
    <div className="py-12 flex items-center justify-center p-4" style={{backgroundColor: '#F8F2E9'}}>
      <div className="group relative bg-white flex flex-col md:flex-row h-full border border-[#EAD8C0] hover:border-[#1D6B3A] transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 min-h-80 w-full max-w-6xl rounded-3xl overflow-hidden" style={{boxShadow: '0 10px 40px -10px rgba(125, 74, 34, 0.15)'}}>
        {/* Premium Card Header / Image Area - Full width on mobile, 50% on desktop */}
        <div className="w-full md:w-1/2 h-full md:h-full relative flex items-center justify-center overflow-hidden" style={{backgroundColor: '#F8F2E9'}}>
          <div className="absolute inset-0 opacity-10" style={{backgroundColor: '#4FAF5A'}}></div>

          {/* Product Bottle Image */}
          <div className="relative z-10 transform group-hover:scale-105 transition-transform duration-700 ease-out">
            <img
              src="/src/assets/bottle1.png"
              alt="BalPro Life Protein Shake"
              className="w-100 h-100 md:w-110  md:h-110 lg:w-120 lg:h-120 object-contain rounded-2xl drop-shadow-2xl"
            />
            {/* Reflection/Shadow (hide on very small screens) */}
            <div className="hidden sm:block absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/30 blur-xl rounded-full"></div>
          </div>

          <div className="absolute top-4 z-20  right-4 rounded-full text-white text-xs font-bold px-3 py-1 border" style={{backgroundColor: 'rgba(29, 107, 58, 0.9)', borderColor: '#4FAF5A'}}>
            ₹25
          </div>
        </div>

        <div className="w-full md:w-1/2 h-full p-4 md:p-6 flex flex-col justify-center" style={{backgroundColor: '#FFFFFF'}}>
          <div className="flex-1 space-y-3">
            <div className="flex items-center space-x-1" style={{color: '#D6B37C'}}>
              <Star size={14} fill="currentColor" />
              <span className="text-slate-400 text-xs font-bold tracking-wider">({product.reviews} REVIEWS)</span>
            </div>

            <div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-black mb-2 uppercase tracking-tight leading-tight" style={{color: '#7B4A22'}}>{product.name}</h3>
              <p className="text-xs md:text-sm font-bold uppercase tracking-widest mb-3" style={{color: '#4FAF5A'}}>{product.tagline}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm md:text-base leading-relaxed mb-4 font-medium" style={{color: '#1A1A1A'}}>
                {product.description.split('\n').map((line, index) => (
                  <span key={index}>{line}<br/></span>
                ))}
              </p>
            </div>

            {/* Flavors */}
            <div className="mb-4">
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{color: '#7B4A22'}}>Available Flavors</p>
              <div className="flex flex-wrap gap-2">
                {product.flavors.map((flavor, index) => (
                  <span key={index} className="text-xs px-3 py-2 rounded-full font-medium" style={{backgroundColor: '#F4E8D3', color: '#1D6B3A'}}>
                    {flavor}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl md:text-3xl font-black" style={{color: '#7B4A22'}}>₹{product.price}</span>
              <div className="flex items-center space-x-1">
                <Star size={18} fill="currentColor" style={{color: '#D6B37C'}} />
                <span className="text-lg font-bold" style={{color: '#1A1A1A'}}>{product.rating}</span>
              </div>
            </div>

            <Button
              variant="secondary"
              className="w-full py-3 text-base font-bold"
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;