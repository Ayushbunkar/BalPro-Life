import React from 'react';

const ProductsSection = ({ onAddToCart }) => {
  const products = [
    {
      id: 1,
      name: 'Signature Dark',
      price: '$34.00 (12-Pack)',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqzV5pup6qXD86Cv9T0gQJI2MOEQYe9C-A53uMTailPXiJ5xipJAVI37ylGNU9WLTkwcenK3l0-SfgJM3M5ZvrbeAzOZHrUmRVCs_zGo82KWUfusgKBsfsNCCWBGN8GzRirWtbRuFD3MHnnIriBGLIHzXdfCvqh8wHEDsueIQzEiFYGxFBxVChtmS6PQ0JKL_NlnO0vsaqcNFrSFbYa-vnXLif8p04spZY0RkyYP2a7StGnHMZBVBtUozcbFX3LWR7VRtzVBksfw'
    },
    {
      id: 2,
      name: 'Hazelnut Dream',
      price: '$36.00 (12-Pack)',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrBQxmPcABjzc2YG_RqI4raKJLklL3weMQyB1qF12uqsu4QUTkHc7DFB-yWj4Gz3Zv86qIa7BZgg3PNLFSLkrJFwWsG0dzlozjClKcpNLoZzkoQYiIdG3GzTs-Xuk_JdqB0BtjEP8pUEePIbR3LRXWZgMUck5Frr-OeVba5x8QkDAS7JBZXE7eFaHiyQJ3EgCnq1MflsAZwmgA1enDM8_h4xYUBaPxjUmgB842ck_sANGZFK8UJo5IkGA1SmEsRF9ZZnyyDAl-Jw',
      marginTop: true
    },
    {
      id: 3,
      name: 'Golden Oat',
      price: '$34.00 (12-Pack)',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlXFX4MXYQhUphGKNjxk1ksTLNlQ9boxDJF9HuQaGmp6o-pEjIQyj5vDnYO7RQclEdqXPFzZqmT34QBU-MmiIAN3YwWSPL2VS3bYDOljiMrQR6SVEAmUeGC8FRFW00g3ckJweUJj1ydMZOj3zUnSfTTJsz5GEFkYsbP-rUE8s7SiAicv7tPmFg5YobG-scN5T2FTVOO1G7z0qbwCX-cIAWulnk6e9tnF-SnFY-n15SL9XfXW9okp9KUnBji2323FJswTT_WrlSgA'
    }
  ];

  return (
    <section className="py-32 bg-surface-container" id="shop">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-20">The Indulgent Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {products.map((product) => (
            <div 
              key={product.id}
              className={`group cursor-pointer ${product.marginTop ? 'translate-y-8' : ''}`}
            >
              <div className="aspect-[4/5] bg-surface-container-low rounded-xl overflow-hidden mb-6 relative border border-outline-variant/5 group-hover:border-tertiary/20 transition-all">
                <img
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={product.image}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-surface/40 backdrop-blur-sm">
                  <button 
                    onClick={() => onAddToCart?.(product)}
                    className="gold-shimmer text-on-tertiary-fixed font-bold px-8 py-3 rounded-full"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="text-tertiary font-semibold">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;