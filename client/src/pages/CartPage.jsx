import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import bottleChocolateImage from '../assets/bottleechoclate.jpg';

const TAX_RATE = 0.08;

const CartPage = () => {
  const { isAuthenticated } = useAuth();
  const { items, total, loading, mutating, updateItemQuantityByDelta, removeItem } = useCart();

  const tax = total * TAX_RATE;
  const finalTotal = total + tax;

  const handleDecrease = async (item) => {
    await updateItemQuantityByDelta(item.id, -1);
  };

  const handleIncrease = async (item) => {
    await updateItemQuantityByDelta(item.id, 1);
  };

  const handleRemove = async (item) => {
    await removeItem(item.id);
  };

  return (
    <div className="bg-background text-on-surface font-body selection:bg-tertiary selection:text-on-tertiary pb-28 md:pb-0">
      <main className="pt-8 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface mb-2">Secure Checkout</h1>
          <p className="text-primary-fixed-dim font-body">Your premium cocoa experience is just a few steps away.</p>
        </div>

        {!isAuthenticated ? (
          <section className="bg-surface-container-low rounded-xl p-8 shadow-sm max-w-2xl">
            <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">Sign in to view your cart</h2>
            <p className="text-on-surface-variant mb-6">Cart data is connected to your account for secure checkout across devices.</p>
            <div className="flex gap-3">
              <Link to="/login" className="px-6 py-3 rounded-full bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] text-on-tertiary-fixed font-semibold">Login</Link>
              <Link to="/register" className="px-6 py-3 rounded-full border border-outline-variant/30 text-on-surface font-semibold">Create Account</Link>
            </div>
          </section>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-12">
              <section className="bg-surface-container-low rounded-xl p-8 shadow-sm">
                <h2 className="font-headline text-xl font-bold text-tertiary mb-8 uppercase tracking-widest">01. Your Selection</h2>

                {loading ? (
                  <p className="text-on-surface-variant">Loading cart...</p>
                ) : items.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-on-surface-variant mb-6">Your cart is empty.</p>
                    <Link to="/products" className="inline-flex px-6 py-3 rounded-full bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] text-on-tertiary-fixed font-semibold">Browse Products</Link>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {items.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row gap-6 items-center">
                        <div className="relative w-24 h-24 rounded-lg bg-surface-container-highest shrink-0 overflow-hidden">
                          <img
                            className="w-full h-full object-cover"
                            src={item.image || bottleChocolateImage}
                            alt={item.name}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = bottleChocolateImage;
                            }}
                          />
                        </div>
                        <div className="grow text-center sm:text-left">
                          <h3 className="font-headline text-lg font-bold text-on-surface">{item.name}</h3>
                          <p className="text-on-surface-variant text-sm line-clamp-2">{item.details}</p>
                          <button
                            className="text-error text-xs font-semibold mt-2 hover:opacity-80 transition-opacity"
                            type="button"
                            disabled={mutating}
                            onClick={() => handleRemove(item)}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="flex items-center gap-4 bg-surface-container-highest px-4 py-2 rounded-full">
                          <button
                            className="material-symbols-outlined text-sm text-primary hover:text-tertiary transition-colors"
                            type="button"
                            disabled={mutating}
                            onClick={() => handleDecrease(item)}
                          >
                            remove
                          </button>
                          <span className="font-bold text-on-surface w-4 text-center">{item.qty}</span>
                          <button
                            className="material-symbols-outlined text-sm text-primary hover:text-tertiary transition-colors"
                            type="button"
                            disabled={mutating}
                            onClick={() => handleIncrease(item)}
                          >
                            add
                          </button>
                        </div>
                        <div className="text-right min-w-20">
                          <span className="font-headline font-bold text-on-surface text-lg">₹{item.price.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            <aside className="lg:col-span-4 sticky top-32 space-y-8">
              <div className="bg-surface-container-low rounded-xl p-8 shadow-2xl border border-outline-variant/10">
                <h2 className="font-headline text-xl font-bold text-on-surface mb-6">Order Summary</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Subtotal</span>
                    <span className="font-bold text-on-surface">₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Shipping</span>
                    <span className="text-tertiary font-bold">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Estimated Tax</span>
                    <span className="font-bold text-on-surface">₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="pt-4 border-t border-outline-variant/20 flex justify-between items-end">
                    <div>
                      <span className="text-xs font-bold text-tertiary uppercase tracking-widest">Total Due</span>
                      <div className="text-3xl font-headline font-extrabold text-on-surface">₹{finalTotal.toFixed(2)}</div>
                    </div>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className={`w-full bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] text-on-tertiary-fixed font-bold py-5 rounded-full shadow-lg transition-all flex items-center justify-center gap-3 ${items.length === 0 ? 'pointer-events-none opacity-50' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
                >
                  Complete Purchase
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </aside>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 w-full z-50 rounded-t-3xl md:hidden bg-[#19120f]/90 backdrop-blur-2xl border-t border-[#4f4440]/20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex justify-around items-center h-20 pb-safe px-6">
          <Link to="/products" className="flex flex-col items-center justify-center text-[#e2bfb2]/50 py-2 px-4 scale-95 active:scale-90 transition-transform">
            <span className="material-symbols-outlined mb-1">local_mall</span>
            <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Shop</span>
          </Link>

          <Link to="/why-choose-us" className="flex flex-col items-center justify-center text-[#e2bfb2]/50 py-2 px-4 scale-95 active:scale-90 transition-transform">
            <span className="material-symbols-outlined mb-1">auto_awesome</span>
            <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Benefits</span>
          </Link>

          <Link to="/cart" className="flex flex-col items-center justify-center text-[#efbf70] bg-[#3c332f] rounded-full py-2 px-4 scale-95 active:scale-90 transition-transform">
            <span className="material-symbols-outlined mb-1">shopping_cart</span>
            <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Cart</span>
          </Link>

          <Link to="/dashboard" className="flex flex-col items-center justify-center text-[#e2bfb2]/50 py-2 px-4 scale-95 active:scale-90 transition-transform">
            <span className="material-symbols-outlined mb-1">person</span>
            <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Account</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default CartPage;
