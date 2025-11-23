import React from 'react';
import bottleImg from '../assets/bottle1.png';
import { ShoppingCart, X, Trash2, ArrowRight } from 'lucide-react';
import Button from './Button';

const CartSidebar = ({ isOpen, onClose, cart, onRemove, onUpdateQty, onCheckout }) => {
  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-60 shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Your Fuel ({cart.length})</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {cart.length === 0 ? (
              <div className="text-center text-slate-400 mt-20">
                <ShoppingCart size={48} className="mx-auto mb-4 opacity-20"/>
                <p className="uppercase font-bold tracking-widest text-sm">Cart Empty</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex gap-6 group">
                  <div className="w-20 h-24 shrink-0 shadow-md bg-white border border-slate-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={bottleImg}
                      alt={item.name}
                      className="w-16 h-20 object-contain"
                    />
                  </div>
                  <div className="flex-1 py-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-900 uppercase text-sm">{item.name}</h4>
                      <button onClick={() => onRemove(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-slate-500 font-medium mb-3">₹{item.price}</p>
                    <div className="inline-flex items-center border border-slate-200">
                      <button onClick={() => onUpdateQty(item.id, -1)} className="px-3 py-1 hover:bg-slate-100 text-slate-600">-</button>
                      <span className="px-3 text-xs font-bold">{item.qty}</span>
                      <button onClick={() => onUpdateQty(item.id, 1)} className="px-3 py-1 hover:bg-slate-100 text-slate-600">+</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-8 border-t border-slate-100 bg-slate-50">
            <div className="flex justify-between items-end mb-6">
              <span className="text-slate-500 text-sm uppercase font-bold tracking-widest">Total</span>
              <span className="text-3xl font-black text-slate-900">₹{total.toFixed(2)}</span>
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