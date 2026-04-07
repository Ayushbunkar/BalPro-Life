import React from 'react';
import { Link } from 'react-router-dom';

const ShippingReturnsPage = () => {
  return (
    <div className="bg-background text-on-surface font-body">
      <main>
        <section className="relative h-[820px] flex items-center px-6 md:px-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover opacity-40"
              alt="Luxurious dark chocolate liquid"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8Gx0hEHWTzjnthFNhFl6AwaQvfoU0TMvPv2qGy7JgeFfDfU2594Z1Dguxl-nTPksmx8Pep9F32OE8JVwodcwqv6aK9XZTBz1xF9fzoxYl3TXX3AGJS-OdJbdI-MA8OwQwYyRnAA20bCrih7Ni53jA4eF6_haSC5zEE_bPLNZ5nQPTt7PUEFsQxb_6OxMTEvvdUViPpNekM6t4nvZ093Glfn1qdqhcFmh9t82VO16NTxEDGQlpXxIXgIuIQJ7WRzcMHPLiYRfsNQ"
            />
          </div>
          <div className="relative z-10 max-w-4xl">
            <span className="text-tertiary font-bold tracking-[0.2em] uppercase text-sm mb-6 block">Care &amp; Commitment</span>
            <h1 className="text-6xl md:text-8xl font-headline font-black tracking-tight leading-[0.9] text-on-surface mb-8">
              Delivering <br />
              <span className="text-tertiary">Pure Indulgence</span>
            </h1>
            <p className="text-xl text-primary-fixed-dim max-w-xl leading-relaxed">
              From our curation facility to your doorstep, every logistics step is handled with the same precision as our cacao roasting.
            </p>
          </div>
        </section>

        <section className="py-32 px-6 md:px-12 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-20 items-center mb-24">
              <div className="lg:w-1/2">
                <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8">The Shipping Ritual</h2>
                <p className="text-on-surface-variant text-lg mb-12">
                  We believe the experience of luxury begins long before the first sip. Our packaging is engineered to preserve structure and consistency across climates.
                </p>
                <div className="space-y-6">
                  <div className="bg-[rgba(60,51,47,0.4)] backdrop-blur-[20px] border border-outline-variant/15 p-8 rounded-xl flex items-start gap-6">
                    <div className="w-12 h-12 rounded-full bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-on-tertiary">local_shipping</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-headline font-bold text-tertiary mb-2">Domestic Expedited</h4>
                      <p className="text-on-surface-variant">2-3 Business Days. Complimentary for orders over $75.</p>
                    </div>
                  </div>
                  <div className="bg-[rgba(60,51,47,0.4)] backdrop-blur-[20px] border border-outline-variant/15 p-8 rounded-xl flex items-start gap-6">
                    <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-tertiary">public</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-headline font-bold text-primary mb-2">Global Transit</h4>
                      <p className="text-on-surface-variant">7-10 Business Days. Fully insured delivery to over 40 countries.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <img
                  className="rounded-xl shadow-2xl relative z-10 w-full object-cover"
                  alt="Premium tetra pack render"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBniAiOxGPnQfy2lfTj7BZUHO6dnOMzC6zxjZ2oVAO2r14P-qsKo0pnzXZtvXNhhxIT4cS9Rzf4Vv_mwjpSducjw6filNY4zxI2mOjwmyPOuvs38ZDYPVJ11T1R-CmMJB8rmgW4BKXydvAoFl8GdDlzex8ceZlRB5IAjaEQB1gO_l5EyC8Z4K-Zr1erszg5b0-34OOali9jMEDqOzNwYqDxqprCtLJt1YMIUUzDL28k_QvxLQGx4AdsPAUvv_cEcJbTww4CdwfLw"
                />
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-tertiary/10 blur-[100px] rounded-full"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-surface-container-low p-10 rounded-xl">
                <span className="material-symbols-outlined text-tertiary mb-6">qr_code_scanner</span>
                <h3 className="text-2xl font-headline font-bold mb-4">Real-Time Tracking</h3>
                <p className="text-on-surface-variant leading-relaxed">Receive a personalized tracking portal link once your batch leaves the curator's desk.</p>
              </div>
              <div className="bg-surface-container-low p-10 rounded-xl md:col-span-2 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-headline font-bold mb-4">Climate Control Packaging</h3>
                  <p className="text-on-surface-variant leading-relaxed max-w-md">Our sustainable insulated inserts keep your Liquid Cacao at optimal consistency despite external temperature shifts.</p>
                </div>
                <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-20">
                  <img
                    className="w-full h-full object-cover"
                    alt="Packaging texture"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvz_8O3nG53tnJSy1GWK8Hlr7DdC5rqBcwjO38cGU13HvYn0ZhkwzIYAa409P7YxQJIVIQD_nmlOsIeXiWJCU9O5xcjoCMt8cfa5kuNX-iLNxZUlSKEiqdby0qSM06t7hv6z_5iau-PNulGPQUivakUTQFQQBosF3_shtEWOnXLssrLA-QAPz81CQXTpnz3j90R0aiEAFvsITfHW4zvx7pmKcVnzDaMTIcYKdc82qXi2auwJ8bm0SNoZGIrot6OKS4ArAmiugUmw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 px-6 md:px-12 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <span className="text-tertiary font-bold tracking-widest uppercase text-xs mb-4 block">Satisfaction Guaranteed</span>
              <h2 className="text-5xl md:text-6xl font-headline font-black mb-8 text-on-surface">The Return Promise</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">If the ritual does not meet your highest expectations, we are committed to making it right.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-12">
                {[
                  ['01', '30-Day Evaluation', 'If within 30 days you are not satisfied, we offer a full refund or exchange.'],
                  ['02', 'Hassle-Free Process', 'Contact our Concierge team and we provide a prepaid return label for domestic orders.'],
                  ['03', 'Refund Fulfillment', 'Once received, refunds are processed within 48 hours to your original payment method.'],
                ].map((item) => (
                  <div key={item[0]} className="flex gap-8">
                    <div className="text-4xl font-headline font-black text-outline-variant/30 shrink-0">{item[0]}</div>
                    <div>
                      <h4 className="text-2xl font-headline font-bold mb-4">{item[1]}</h4>
                      <p className="text-on-surface-variant leading-relaxed">{item[2]}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[rgba(60,51,47,0.4)] backdrop-blur-[20px] border border-outline-variant/15 p-12 rounded-xl relative overflow-hidden group">
                <h3 className="text-3xl font-headline font-bold mb-8">Initiate a Return</h3>
                <p className="text-on-surface-variant mb-10">Enter your order number and email to begin your concierge-guided return process.</p>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <input className="w-full bg-surface-container p-5 rounded-md border-none ring-1 ring-outline-variant/20 focus:ring-tertiary focus:outline-none transition-all placeholder:text-outline" placeholder="Order Number" type="text" />
                  <input className="w-full bg-surface-container p-5 rounded-md border-none ring-1 ring-outline-variant/20 focus:ring-tertiary focus:outline-none transition-all placeholder:text-outline" placeholder="Email Address" type="email" />
                  <button className="w-full py-5 rounded-full bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] text-on-tertiary font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform duration-300" type="submit">
                    Verify Order
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 px-6 md:px-12 bg-surface">
          <div className="max-w-7xl mx-auto bg-[rgba(60,51,47,0.4)] backdrop-blur-[20px] border border-outline-variant/15 rounded-xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 p-16">
              <h2 className="text-4xl font-headline font-black mb-6">Concierge Support</h2>
              <p className="text-on-surface-variant mb-12 text-lg">Have a specific request about delivery or international shipping? Our specialists are ready to help.</p>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <span className="material-symbols-outlined text-tertiary">mail</span>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-outline">Email Inquiries</p>
                    <p className="text-lg font-bold">concierge@theliquidcurator.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="material-symbols-outlined text-tertiary">support_agent</span>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-outline">Live Ritualist</p>
                    <p className="text-lg font-bold">Mon-Fri, 9am - 6pm EST</p>
                  </div>
                </div>
                <Link to="/contact" className="inline-flex px-7 py-3 rounded-full border border-outline-variant/30 text-on-surface hover:bg-surface-container-highest transition-colors">
                  Contact Support
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative min-h-[400px]">
              <img
                className="w-full h-full object-cover"
                alt="Concierge desk"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd6yq1GNa-jKVZk6ckLN6PwXfDiRKOhk7O33T8HixgqiPhzUQzyZP5IEFxAVuvAuwiIgd8STK1A8sBCoyjS9BDc9U3yDVl7KzqH1yP_jxak6IT8nCpllcxz2-4PBrwImCY7nbAdz5POwDeAvJftWed_eElm3LqRBwwAMrxl7YDiv2oI03TcpyhosKEiTdCIufmznaynVIBjfUnZzag8Nm73o80lzBR7bqlVnrZMvlCPmxvMFci5z5_RcA2S2BHloBqt541GOYRzg"
              />
              <div className="absolute inset-0 bg-linear-to-r from-surface to-transparent md:block hidden"></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ShippingReturnsPage;
