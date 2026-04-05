import React from 'react';
import { ShoppingCart, X, Trash2, ArrowRight } from 'lucide-react';
import Button from './Button';
import bottleChocolateImage from '../assets/bottleechoclate.jpg';

const CartSidebar = ({ isOpen, onClose, cart, onRemove, onUpdateQty, onCheckout }) => {
  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-surface z-60 shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-high">
            <h2 className="text-2xl font-black text-on-surface tracking-tight uppercase">Your Fuel ({cart.length})</h2>
            <button onClick={onClose} className="p-2 hover:bg-surface-container transition-colors text-on-surface-variant">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center text-slate-400 mt-20">
                <ShoppingCart size={48} className="mx-auto mb-4 opacity-20 text-on-surface-variant"/>
                <p className="uppercase font-bold tracking-widest text-sm text-on-surface-variant">Cart Empty</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex gap-6 group">
                  <div className="relative w-20 h-24 shrink-0 shadow-md bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center overflow-hidden">
                    <span className="absolute -top-2 -right-2 z-10 min-w-6 h-6 px-1 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {item.qty}
                    </span>
                    <img
                      src={bottleChocolateImage}
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = bottleChocolateImage;
                      }}
                      loading="lazy"
                      className="w-16 h-20 object-contain"
                    />
                  </div>
                  <div className="flex-1 py-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-on-surface uppercase text-sm">{item.name}</h4>
                      <button onClick={() => onRemove(item.id)} className="text-on-surface-variant hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-on-surface-variant font-medium mb-3">₹{item.price}</p>
                    <div className="inline-flex items-center border border-outline-variant/20 bg-surface-container p-1 rounded-md">
                      <button onClick={() => onUpdateQty(item.id, -1)} className="px-3 py-1 hover:bg-surface-container-high text-on-surface-variant">-</button>
                      <span className="px-3 text-xs font-bold text-on-surface">{item.qty}</span>
                      <button onClick={() => onUpdateQty(item.id, 1)} className="px-3 py-1 hover:bg-surface-container-high text-on-surface-variant">+</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 border-t border-outline-variant/20 bg-surface-container-low">
            <div className="flex justify-between items-end mb-4">
              <span className="text-on-surface-variant text-sm uppercase font-bold tracking-widest">Total</span>
              <span className="text-3xl font-black text-on-surface">₹{total.toFixed(2)}</span>
            </div>
            <Button variant="primary" className="w-full" icon={ArrowRight} onClick={onCheckout} disabled={cart.length === 0}>
              Secure Checkout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;