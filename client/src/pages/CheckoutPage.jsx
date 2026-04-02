import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ordersAPI } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const TAX_RATE = 0.08;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { items, total, mutating, updateItemQuantityByDelta, removeItem, clearCart } = useCart();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'India',
  });

  const tax = total * TAX_RATE;
  const shipping = 0;
  const finalTotal = total + tax + shipping;

  const handleAddressChange = (field, value) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
  };

  const validateAddress = () => {
    if (!shippingAddress.address.trim()) return 'Address is required';
    if (!shippingAddress.city.trim()) return 'City is required';
    if (!shippingAddress.postalCode.trim()) return 'Postal code is required';
    if (!shippingAddress.country.trim()) return 'Country is required';
    return '';
  };

  const handlePlaceOrder = async () => {
    const validationError = validateAddress();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await ordersAPI.createOrder({
        orderItems: items.map((item) => ({
          product: item.id,
          quantity: item.qty,
        })),
        shippingAddress,
        paymentMethod: 'card',
        taxPrice: Number(tax.toFixed(2)),
        shippingPrice: shipping,
      });

      await clearCart();
      navigate('/dashboard/orders');
    } catch (err) {
      setError(err?.message || 'Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
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
            <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">Sign in to continue checkout</h2>
            <p className="text-on-surface-variant mb-6">Checkout is linked to your account for secure orders and tracking.</p>
            <div className="flex gap-3">
              <Link to="/login" className="px-6 py-3 rounded-full bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] text-on-tertiary-fixed font-semibold">Login</Link>
              <Link to="/register" className="px-6 py-3 rounded-full border border-outline-variant/30 text-on-surface font-semibold">Create Account</Link>
            </div>
          </section>
        ) : items.length === 0 ? (
          <section className="bg-surface-container-low rounded-xl p-8 shadow-sm max-w-2xl">
            <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">Your cart is empty</h2>
            <p className="text-on-surface-variant mb-6">Add products to cart before checkout.</p>
            <Link to="/products" className="px-6 py-3 rounded-full bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] text-on-tertiary-fixed font-semibold inline-flex">Browse Products</Link>
          </section>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-12">
              <section className="bg-surface-container-low rounded-xl p-8 shadow-sm">
                <h2 className="font-headline text-xl font-bold text-tertiary mb-8 uppercase tracking-widest">01. Your Selection</h2>
                <div className="space-y-8">
                  {items.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-6 items-center">
                      <div className="relative w-24 h-24 rounded-lg bg-surface-container-highest shrink-0 overflow-hidden">
                        <span className="absolute top-2 right-2 z-10 min-w-6 h-6 px-1 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center">
                          {item.qty}
                        </span>
                        {item.image ? (
                          <img className="w-full h-full object-cover" src={item.image} alt={item.name} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-on-surface-variant">No image</div>
                        )}
                      </div>
                      <div className="grow text-center sm:text-left">
                        <h3 className="font-headline text-lg font-bold text-on-surface">{item.name}</h3>
                        <p className="text-on-surface-variant text-sm line-clamp-2">{item.details}</p>
                        <button
                          className="text-error text-xs font-semibold mt-2 hover:opacity-80 transition-opacity"
                          type="button"
                          disabled={submitting || mutating}
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center gap-4 bg-surface-container-highest px-4 py-2 rounded-full">
                        <button
                          className="material-symbols-outlined text-sm text-primary hover:text-tertiary transition-colors"
                          type="button"
                          disabled={submitting || mutating}
                          onClick={() => updateItemQuantityByDelta(item.id, -1)}
                        >
                          remove
                        </button>
                        <span className="font-bold text-on-surface w-4 text-center">{item.qty}</span>
                        <button
                          className="material-symbols-outlined text-sm text-primary hover:text-tertiary transition-colors"
                          type="button"
                          disabled={submitting || mutating}
                          onClick={() => updateItemQuantityByDelta(item.id, 1)}
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
              </section>

              <section className="bg-surface-container-low rounded-xl p-8">
                <h2 className="font-headline text-xl font-bold text-tertiary mb-8 uppercase tracking-widest">02. Shipping Destination</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Address</label>
                    <input
                      className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-tertiary/50 transition-all"
                      placeholder="123 Luxury Lane"
                      type="text"
                      value={shippingAddress.address}
                      onChange={(e) => handleAddressChange('address', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">City</label>
                    <input
                      className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-tertiary/50 transition-all"
                      placeholder="New York"
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) => handleAddressChange('city', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Postal Code</label>
                    <input
                      className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-tertiary/50 transition-all"
                      placeholder="10001"
                      type="text"
                      value={shippingAddress.postalCode}
                      onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Country</label>
                    <input
                      className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-tertiary/50 transition-all"
                      placeholder="India"
                      type="text"
                      value={shippingAddress.country}
                      onChange={(e) => handleAddressChange('country', e.target.value)}
                    />
                  </div>
                </div>
              </section>
            </div>

            <aside className="lg:col-span-4 sticky top-32 space-y-8">
              <div className="bg-surface-container-low rounded-xl p-8 shadow-2xl border border-outline-variant/10">
                <h2 className="font-headline text-xl font-bold text-on-surface mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
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

                {error && <p className="text-sm text-error mb-4">{error}</p>}

                <button
                  className="w-full bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] text-on-tertiary-fixed font-bold py-5 rounded-full shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                  disabled={submitting || mutating || items.length === 0}
                  onClick={handlePlaceOrder}
                >
                  {submitting ? 'Placing Order...' : 'Complete Purchase'}
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
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

export default CheckoutPage;
