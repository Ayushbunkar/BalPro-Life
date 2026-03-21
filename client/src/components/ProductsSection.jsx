import React from 'react';

const ProductsSection = ({ onAddToCart }) => {
  const products = [
    {
      id: 1,
      name: 'Velvet Cocoa',
      price: '$84',
      description: 'Midnight cacao infused with lion\'s mane and ceremonial grade matcha.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1gNf-pVECfq2tcv98-JHn5S7TW906RDdutcmRRiOcJMQCFDqvAHfimTkiPmGRb51KsyR3Z39oVRXdgwrKFUJeMsYrUC1ABGF2c0cRUzMKN0avq8FvX8YuoykeUUia1TbZ2DUm1RgFKBdWX29XMq6N085kA_diPBRsYDXMHHYAiyzFTunz_-OXXbfRMlWclFebzil_KZQWsUHIublYPG6GMAznw7tLj2ZuleDftMIIWSxvsAnTgKAtEXR3NHIybNW9XHzrDMVhn50'
    },
    {
      id: 2,
      name: 'Amber Mist',
      price: '$92',
      description: 'Wild honey and adaptogenic turmeric for sustained afternoon clarity.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkDbF9K4KDra9pIEQtQVhF7zLeVBhLVQ8bn-gb0sVm5P5JW2CDXGpjHoBReb64tcWAI7mu_u0UytSJT3xkvGvJkzmo1OPMTnaR98AWzjTEghrpI3kq-D6pg_UDaqp0Fhk6xyS766eX9FnIV20RBYwAynlO4DFAjscdoVivIL3PxKoH2T5tyzYWsljD2GQLAEGwhIXQREjmpGPnkSaXMhxlGO85h4GSifDmiM2S3idmU4OT4GEeL8lIhEOyy0mCcn_bhxdI9sk0a0Y'
    },
    {
      id: 3,
      name: 'Obsidian Essence',
      price: '$115',
      description: 'Concentrated recovery blend with activated charcoal and sea minerals.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnM3d2Xocm_W3G9SOKnnpUyf1_htfGf0uJMo2Kjh9urrQTMiX42NIoXIrSgmcdlnj9XJp6Ow9pMyeSP5waxxogz4T4itTQVjGAw9gDtdMylJfNuaQ_l8IHGhhIDBiudMOJiAUjJm4QNEa76CJd4Oy8OnJgGwLKm5x9FMSHqxWtybwofAVcwDuAbRSqPhcdt67uNoIUqqbV_J8QR0DucZiglsaQZVTfq_63DXY3HUzttliDGHghlvbDKMhQZVmMpEKxVvpCLTCPmx8'
    }
  ];

  return (
    <section id="collections" className="py-40 relative overflow-hidden" style={{backgroundColor: '#151312'}}>
      <div className="max-w-[1440px] mx-auto px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="space-y-4">
            <span className="font-label text-[0.6875rem] uppercase tracking-[0.2rem]" style={{color: '#efbf70', fontFamily: 'Manrope'}}>
              Curated Series
            </span>
            <h2 className="font-headline text-5xl md:text-6xl font-black tracking-tighter text-[#e8e1de]" style={{fontFamily: 'Epilogue'}}>
              The Collection
            </h2>
          </div>
          <p className="font-body text-[#d9c4a2] max-w-sm text-right leading-relaxed font-light" style={{fontFamily: 'Manrope'}}>
            Meticulously formulated elixirs designed for the modern architect of life.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-3xl p-10 transition-all duration-700 hover:-translate-y-4 hover:border-[#efbf70]/20 border border-[#373432]/10"
              style={{backgroundColor: 'rgba(10, 8, 7, 0.6)', backdropFilter: 'blur(40px)'}}
            >
              {/* Product Image */}
              <div className="aspect-square mb-10 overflow-hidden rounded-2xl bg-[#0F0D0C]">
                <img
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  src={product.image}
                />
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-headline text-2xl text-[#e8e1de]" style={{fontFamily: 'Epilogue'}}>
                    {product.name}
                  </h3>
                  <span className="font-body text-[#efbf70] font-bold" style={{fontFamily: 'Manrope'}}>
                    {product.price}
                  </span>
                </div>

                <p className="text-[#d9c4a2] text-sm leading-relaxed font-light" style={{fontFamily: 'Manrope'}}>
                  {product.description}
                </p>

                <button
                  onClick={() => onAddToCart?.(product)}
                  className="w-full py-4 font-headline text-[10px] uppercase tracking-widest font-bold rounded-xl transition-colors duration-500 group-hover:text-on-primary"
                  style={{
                    backgroundColor: '#2c2928',
                    color: '#e8e1de'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#efbf70';
                    e.target.style.color = '#432c00';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#2c2928';
                    e.target.style.color = '#e8e1de';
                  }}
                >
                  Add to Ritual
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;