import React from 'react';
import bottleImg from '../assets/bottle1.png';
import { Star } from 'lucide-react';
import Button from './Button';

const ProductCard = ({ onAddToCart }) => {
  // Two products - Banana and Chocolate flavors vjdffd
  const products = [
    {
      id: 1,
      name: "BALPRO LIFE PROTEIN SHAKE",
      tagline: "PREMIUM NUTRITION",
      description: "• 20g Protein\n• Zero Added Sugar\n• High Calcium, Vitamin B12, & Fiber\n• Omega-3 from Chia Seeds\n• 215 Calories per 200 ml",
      price: 25,
      originalPrice: 40,
      rating: 4.8,
      reviews: 1247,
      flavor: "Banana Flavor",
      accentColor: "#4FAF5A",
      bgAccent: "rgba(29, 107, 58, 0.9)"
    },
    {
      id: 2,
      name: "BALPRO LIFE PROTEIN SHAKE",
      tagline: "PREMIUM NUTRITION",
      description: "• 20g Protein\n• Zero Added Sugar\n• High Calcium, Vitamin B12, & Fiber\n• Omega-3 from Chia Seeds\n• 215 Calories per 200 ml",
      price: 25,
      originalPrice: 40,
      rating: 4.8,
      reviews: 1247,
      flavor: "Chocolate Flavor",
      accentColor: "#6B4423",
      bgAccent: "rgba(107, 68, 35, 0.9)"
    }
  ];

  return (
    <div className="py-12 px-4" style={{backgroundColor: '#F8F2E9'}}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group relative bg-white flex flex-col md:flex-row h-full border border-[#EAD8C0] hover:border-[#1D6B3A] transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 min-h-80 rounded-3xl overflow-hidden" style={{boxShadow: '0 10px 40px -10px rgba(125, 74, 34, 0.15)'}}>
            {/* Premium Card Header / Image Area */}
            <div className="w-full md:w-1/2 h-64 md:h-full relative flex items-center justify-center overflow-hidden" style={{backgroundColor: '#F8F2E9'}}>
              <div className="absolute inset-0 opacity-10" style={{backgroundColor: product.accentColor}}></div>

              {/* Product Bottle Image */}
              <div className="relative z-10 transform group-hover:scale-105 transition-transform duration-700 ease-out">
                <img
                  src={bottleImg}
                  alt={`BalPro Life Protein Shake - ${product.flavor}`}
                  className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain rounded-2xl drop-shadow-2xl"
                />
                {/* Reflection/Shadow */}
                <div className="hidden sm:block absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/30 blur-xl rounded-full"></div>
              </div>

              <div className="absolute top-4 z-20 right-4 rounded-full text-white text-xs font-bold px-3 py-1 border" style={{backgroundColor: product.bgAccent, borderColor: product.accentColor}}>
                ₹{product.originalPrice}
              </div>
            </div>

            <div className="w-full md:w-1/2 h-full p-4 md:p-6 flex flex-col justify-center" style={{backgroundColor: '#FFFFFF'}}>
              <div className="flex-1 space-y-3">
                <div className="flex items-center space-x-1" style={{color: '#D6B37C'}}>
                  <Star size={14} fill="currentColor" />
                  <span className="text-slate-400 text-xs font-bold tracking-wider">({product.reviews} REVIEWS)</span>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-black mb-2 uppercase tracking-tight leading-tight" style={{color: '#7B4A22'}}>{product.name}</h3>
                  <p className="text-xs md:text-sm font-bold uppercase tracking-widest mb-3" style={{color: product.accentColor}}>{product.tagline}</p>
                </div>

                <div className="mb-4">
                  <p className="text-xs md:text-sm leading-relaxed mb-4 font-medium" style={{color: '#1A1A1A'}}>
                    {product.description.split('\n').map((line, index) => (
                      <span key={index}>{line}<br/></span>
                    ))}
                  </p>
                </div>

                {/* Flavor */}
                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{color: '#7B4A22'}}>Flavor</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-2 rounded-full font-medium" style={{backgroundColor: '#F4E8D3', color: product.accentColor}}>
                      {product.flavor}
                    </span>
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
        ))}
      </div>
    </div>
  );
};

export default ProductCard;