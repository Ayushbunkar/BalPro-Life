import React from 'react';
import { Link } from 'react-router-dom';

const checkoutItems = [
  {
    id: 1,
    name: 'Functional Cacao Blend',
    details: '30 Servings • Ashwagandha & Magnesium',
    qty: 1,
    price: 49,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCiZ1BNBnTtcBsLeYhxoa9BpTIv_OqdQlBfDfUGhZwGKEF2s2x9tThQMmR7oNw0VIFPR2pVIsoKK_5nHRZ8kBYBz-ki-2T0pw-4adzc_-Nd7uwfw6s7D4gTCt8L9f5DirTDGG6IS8Lf0q1eCro8tgJmjh3MulalvUplkkwyN1j6TWZokZ2m7fthmcl4ZVJ1rj96iFlX7Y64g1yUErtwjqN9-uIrWnqVMIJjGsW3SNj7hGALrtYv6684romxlWmihCv23AwlS8lk7g',
  },
  {
    id: 2,
    name: 'Signature Ceramic Mug',
    details: 'Matte Onyx • 12oz',
    qty: 1,
    price: 28,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCg_XA_UbJfjwKuJfoispTri7fHbywv7GTRWReJhaKiSUq5r2FPfWsz5C_-erD12QPvHeFa6rkj__T9M8t2ZPjhWzoM8JCOwKR4YAiQgqRVSGjlZfimaI6yM_z8cpkUihwGHzy2MO9pOV6AGaEhDs3Qpthsl-9HVkUMtTY48sXQ688vkydV_xNpPzKkMAiI5_g0V-1x9orU_3e3TBfmsavlMkvAi_3tTJ1mAKxeeos_qQkvZzQ5RdcPxVRWamgVt7gpo4cUb88IlA',
  },
];

const CheckoutPage = () => {
  const subtotal = checkoutItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = 6.16;
  const total = subtotal + tax;

  return (
    <div className="bg-background text-on-surface font-body selection:bg-tertiary selection:text-on-tertiary pb-28 md:pb-0">
      <main className="pt-8 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface mb-2">Secure Checkout</h1>
          <p className="text-primary-fixed-dim font-body">Your premium cocoa experience is just a few steps away.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-12">
            <section className="bg-surface-container-low rounded-xl p-8 shadow-sm">
              <h2 className="font-headline text-xl font-bold text-tertiary mb-8 uppercase tracking-widest">01. Your Selection</h2>
              <div className="space-y-8">
                {checkoutItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-6 items-center">
                    <div className="w-24 h-24 rounded-lg bg-surface-container-highest shrink-0 overflow-hidden">
                      <img className="w-full h-full object-cover" src={item.image} alt={item.name} />
                    </div>
                    <div className="grow text-center sm:text-left">
                      <h3 className="font-headline text-lg font-bold text-on-surface">{item.name}</h3>
                      <p className="text-on-surface-variant text-sm">{item.details}</p>
                      <button className="text-error text-xs font-semibold mt-2 hover:opacity-80 transition-opacity" type="button">Remove</button>
                    </div>
                    <div className="flex items-center gap-4 bg-surface-container-highest px-4 py-2 rounded-full">
                      <button className="material-symbols-outlined text-sm text-primary hover:text-tertiary transition-colors" type="button">remove</button>
                      <span className="font-bold text-on-surface w-4 text-center">{item.qty}</span>
                      <button className="material-symbols-outlined text-sm text-primary hover:text-tertiary transition-colors" type="button">add</button>
                    </div>
                    <div className="text-right min-w-20">
                      <span className="font-headline font-bold text-on-surface text-lg">${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-surface-container-low rounded-xl p-8">
              <h2 className="font-headline text-xl font-bold text-tertiary mb-8 uppercase tracking-widest">02. Shipping Destination</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">First Name</label>
                  <input className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-tertiary/50 transition-all" placeholder="Julian" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Last Name</label>
                  <input className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-tertiary/50 transition-all" placeholder="Voss" type="text" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Address</label>
                  <input className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-tertiary/50 transition-all" placeholder="123 Luxury Lane" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">City</label>
                  <input className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-tertiary/50 transition-all" placeholder="New York" type="text" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">State</label>
                    <input className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-tertiary/50 transition-all" placeholder="NY" type="text" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Zip</label>
                    <input className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-tertiary/50 transition-all" placeholder="10001" type="text" />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-surface-container-low rounded-xl p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-headline text-xl font-bold text-tertiary uppercase tracking-widest">03. Secure Payment</h2>
                <div className="flex gap-2">
                  <span className="material-symbols-outlined text-on-surface-variant text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                  <span className="text-xs font-bold text-on-surface-variant uppercase self-center">SSL Encrypted</span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-surface-container-highest p-6 rounded-lg border border-tertiary/20">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-on-surface">Credit / Debit Card</span>
                    <div className="flex gap-2 opacity-70">
                      <div className="w-8 h-5 bg-surface-container rounded-sm border border-outline-variant/30"></div>
                      <div className="w-8 h-5 bg-surface-container rounded-sm border border-outline-variant/30"></div>
                      <div className="w-8 h-5 bg-surface-container rounded-sm border border-outline-variant/30"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <input className="w-full bg-surface border-none rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-tertiary/50 transition-all" placeholder="Card Number" type="text" />
                    <div className="grid grid-cols-2 gap-4">
                      <input className="w-full bg-surface border-none rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-tertiary/50 transition-all" placeholder="MM / YY" type="text" />
                      <input className="w-full bg-surface border-none rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-tertiary/50 transition-all" placeholder="CVC" type="text" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-surface-container-highest p-4 rounded-lg cursor-pointer hover:bg-surface-container-high transition-colors">
                  <div className="w-5 h-5 rounded-full border-2 border-outline-variant"></div>
                  <span className="font-semibold text-on-surface-variant">Pay with PayPal</span>
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 sticky top-32 space-y-8">
            <div className="bg-surface-container-low rounded-xl p-8 shadow-2xl border border-outline-variant/10">
              <h2 className="font-headline text-xl font-bold text-on-surface mb-6">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal</span>
                  <span className="font-bold text-on-surface">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Shipping</span>
                  <span className="text-tertiary font-bold">Complimentary</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Estimated Tax</span>
                  <span className="font-bold text-on-surface">${tax.toFixed(2)}</span>
                </div>
                <div className="pt-4 border-t border-outline-variant/20 flex justify-between items-end">
                  <div>
                    <span className="text-xs font-bold text-tertiary uppercase tracking-widest">Total Due</span>
                    <div className="text-3xl font-headline font-extrabold text-on-surface">${total.toFixed(2)}</div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex gap-2">
                  <input className="grow bg-surface-container-highest border-none rounded-full px-4 py-3 text-sm text-on-surface focus:ring-1 focus:ring-tertiary/50" placeholder="Promo Code" type="text" />
                  <button className="bg-surface-container-highest text-tertiary px-6 py-3 rounded-full text-sm font-bold hover:bg-surface-container-high transition-colors" type="button">Apply</button>
                </div>
              </div>

              <button className="w-full bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] text-on-tertiary-fixed font-bold py-5 rounded-full shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3" type="button">
                Complete Purchase
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <p className="text-[10px] text-center text-on-surface-variant/60 mt-6 leading-relaxed">
                By completing your order, you agree to Balpro Life&apos;s <a className="underline" href="#">Terms of Service</a> and <a className="underline" href="#">Privacy Policy</a>.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-4 rounded-lg flex flex-col items-center text-center gap-2">
                <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">Money Back Guarantee</span>
              </div>
              <div className="bg-surface-container-low p-4 rounded-lg flex flex-col items-center text-center gap-2">
                <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
                <span className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">100% Organic Cacao</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-on-surface-variant hover:text-tertiary cursor-pointer transition-colors group">
              <span className="material-symbols-outlined text-sm">help</span>
              <span className="text-xs font-bold uppercase tracking-widest">Need assistance?</span>
            </div>
          </aside>
        </div>
      </main>

      <footer className="w-full rounded-t-[3rem] mt-24 bg-[#221a17] dark:bg-[#221a17] shadow-[0_-20px_50px_rgba(0,0,0,0.2)]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-12 py-20 max-w-7xl mx-auto font-['Plus_Jakarta_Sans'] leading-relaxed">
          <div className="md:col-span-1">
            <div className="text-3xl font-bold text-[#efbf70] mb-6">BALPRO LIFE</div>
            <p className="text-[#e2bfb2]/70 text-sm">Elevating the everyday ritual through functional, premium ingredients.</p>
          </div>

          <div>
            <h4 className="text-[#efbf70] font-bold mb-6 uppercase text-xs tracking-widest">Shop</h4>
            <ul className="space-y-4">
              <li><Link className="text-[#e2bfb2]/70 hover:text-[#efbf70] transition-all duration-300 hover:translate-x-1 inline-block" to="/products">All Products</Link></li>
              <li><a className="text-[#e2bfb2]/70 hover:text-[#efbf70] transition-all duration-300 hover:translate-x-1 inline-block" href="#">Subscriptions</a></li>
              <li><a className="text-[#e2bfb2]/70 hover:text-[#efbf70] transition-all duration-300 hover:translate-x-1 inline-block" href="#">Bundles</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#efbf70] font-bold mb-6 uppercase text-xs tracking-widest">Support</h4>
            <ul className="space-y-4">
              <li><a className="text-[#e2bfb2]/70 hover:text-[#efbf70] transition-all duration-300 hover:translate-x-1 inline-block" href="#">Shipping &amp; Returns</a></li>
              <li><a className="text-[#e2bfb2]/70 hover:text-[#efbf70] transition-all duration-300 hover:translate-x-1 inline-block" href="#">Wholesale</a></li>
              <li><Link className="text-[#e2bfb2]/70 hover:text-[#efbf70] transition-all duration-300 hover:translate-x-1 inline-block" to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#efbf70] font-bold mb-6 uppercase text-xs tracking-widest">Legal</h4>
            <ul className="space-y-4">
              <li><a className="text-[#e2bfb2]/70 hover:text-[#efbf70] transition-all duration-300 hover:translate-x-1 inline-block" href="#">Privacy Policy</a></li>
              <li><a className="text-[#e2bfb2]/70 hover:text-[#efbf70] transition-all duration-300 hover:translate-x-1 inline-block" href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="px-12 pb-12 border-t border-[#4f4440]/20 pt-8 text-center">
          <p className="text-[10px] text-[#e2bfb2]/40 tracking-widest uppercase">© 2024 BALPRO LIFE. CRAFTED FOR THE INDULGENT.</p>
        </div>
      </footer>

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
