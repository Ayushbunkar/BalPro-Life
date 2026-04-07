import React, { useEffect, useMemo, useState } from 'react';
import { legalAPI } from '../utils/api';

const PrivacyPolicyPage = () => {
  const [policyMeta, setPolicyMeta] = useState(null);
  const [loadingMeta, setLoadingMeta] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [newsletterError, setNewsletterError] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    let active = true;

    const loadMeta = async () => {
      setLoadingMeta(true);
      try {
        const res = await legalAPI.getPrivacyPolicy();
        if (active) {
          setPolicyMeta(res?.data || null);
        }
      } catch {
        if (active) {
          setPolicyMeta(null);
        }
      } finally {
        if (active) {
          setLoadingMeta(false);
        }
      }
    };

    loadMeta();

    return () => {
      active = false;
    };
  }, []);

  const lastUpdatedLabel = useMemo(() => {
    if (!policyMeta?.lastUpdated) return 'N/A';
    const date = new Date(policyMeta.lastUpdated);
    if (Number.isNaN(date.getTime())) return 'N/A';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }, [policyMeta?.lastUpdated]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setNewsletterError('');
    setNewsletterMessage('');

    if (!newsletterEmail.trim()) {
      setNewsletterError('Please enter your email.');
      return;
    }

    try {
      setSubscribing(true);
      const res = await legalAPI.subscribeNewsletter({
        email: newsletterEmail.trim(),
        source: 'privacy-policy',
      });
      setNewsletterMessage(res?.message || 'Subscribed successfully.');
      setNewsletterEmail('');
    } catch (err) {
      setNewsletterError(err?.message || 'Subscription failed. Please try again.');
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-tertiary selection:text-on-tertiary">
      <main className="pt-24">
        <section className="relative h-[620px] flex items-center justify-center overflow-hidden px-6">
          <div className="absolute inset-0 z-0">
            <img
              alt="Swirling chocolate background"
              className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkqcQjvQLIAgILMwrgoW0jldsHcuH2ScUjPPziT3Ohccg8qrt155V14hlegCC9JMeyU9jrXCIlFw2VF4pdL090ekgPIVMKeFjJvJgAxKCjXdgJJ8KVWwekhobdWDJ6FHhlrMuOO8omofoPrfRk0vcIpo1Hd_GQUrbsaEIITxRoDD5sg7AD34vOtEL7AYuBChiTX_0fE0tpDzlObWmQkpRim4mgCN1lnkK5nClo7kdQqiovCx_RtoDJ4mXeuFaw3BsfupUbIVqKyA"
            />
            <div className="absolute inset-0 bg-linear-to-b from-surface/20 via-surface/60 to-surface"></div>
          </div>
          <div className="relative z-10 text-center max-w-4xl">
            <span className="text-tertiary font-bold tracking-[0.3em] uppercase text-sm mb-6 block">The Liquid Curator</span>
            <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter text-on-surface leading-tight mb-8">
              Your Privacy is <br />
              <span className="italic font-light">our Ritual</span>
            </h1>
            <p className="text-primary-fixed-dim text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Protecting your journey into functional indulgence. We curate your data with the same precision we apply to our cacao blends.
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-tertiary mt-6">Last Updated: {loadingMeta ? 'Loading...' : lastUpdatedLabel}</p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-40 space-y-4">
                <p className="text-tertiary text-xs font-bold tracking-widest uppercase mb-6">In this policy</p>
                <nav className="flex flex-col space-y-4 text-sm font-medium border-l border-outline-variant/20 pl-6">
                  <a className="text-tertiary border-l-2 border-tertiary -ml-[1.65rem] pl-6 transition-all" href="#intro">Overview</a>
                  <a className="text-on-surface-variant hover:text-tertiary transition-colors" href="#collection">Data Collection</a>
                  <a className="text-on-surface-variant hover:text-tertiary transition-colors" href="#usage">How We Use Data</a>
                  <a className="text-on-surface-variant hover:text-tertiary transition-colors" href="#sharing">Data Sharing</a>
                  <a className="text-on-surface-variant hover:text-tertiary transition-colors" href="#rights">Your Rights</a>
                  <a className="text-on-surface-variant hover:text-tertiary transition-colors" href="#cookies">Cookies Policy</a>
                  <a className="text-on-surface-variant hover:text-tertiary transition-colors" href="#security">Security Rituals</a>
                  <a className="text-on-surface-variant hover:text-tertiary transition-colors" href="#contact">Contact Legal</a>
                </nav>
              </div>
            </aside>

            <div className="lg:col-span-9 space-y-24">
              <article className="space-y-8" id="intro">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="w-12 h-px bg-tertiary/40"></span>
                  <h2 className="text-3xl font-bold text-on-surface tracking-tight font-headline">Overview &amp; Commitment</h2>
                </div>
                <div className="max-w-none text-primary-fixed-dim leading-relaxed font-light text-lg space-y-6">
                  <p>
                    At BALPRO LIFE, we believe transparency is foundational to every meaningful ritual. Your personal data is the digital essence of your experience with us, and we treat it with the highest standards of stewardship.
                  </p>
                  <p>
                    By engaging with our shop, ritual guides, and sustainability journals, you entrust us with your details. In return, we use this information only to enhance your wellness journey and provide seamless premium service.
                  </p>
                </div>
              </article>

              <article className="space-y-12" id="collection">
                <div className="flex items-center space-x-4">
                  <span className="w-12 h-px bg-tertiary/40"></span>
                  <h2 className="text-3xl font-bold text-on-surface tracking-tight font-headline">Data Collection</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-surface-container-low p-10 rounded-lg border border-outline-variant/10 group hover:bg-surface-container transition-all duration-500">
                    <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center mb-6 text-tertiary group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                    <h3 className="text-xl font-bold text-on-surface mb-4 font-headline">Personal Identity</h3>
                    <p className="text-on-surface-variant leading-relaxed text-sm">
                      Full name, shipping address, billing details, email address, and phone number collected during checkout or account creation.
                    </p>
                  </div>
                  <div className="bg-surface-container-low p-10 rounded-lg border border-outline-variant/10 group hover:bg-surface-container transition-all duration-500">
                    <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center mb-6 text-tertiary group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">analytics</span>
                    </div>
                    <h3 className="text-xl font-bold text-on-surface mb-4 font-headline">Usage &amp; Tracking</h3>
                    <p className="text-on-surface-variant leading-relaxed text-sm">
                      IP address, device type, browser preferences, and behavioral data around interactions with rituals and product pages.
                    </p>
                  </div>
                </div>
              </article>

              <article className="space-y-8 bg-surface-container-lowest p-12 rounded-xl" id="usage">
                <div className="flex items-center space-x-4 mb-8">
                  <span className="w-12 h-px bg-tertiary/40"></span>
                  <h2 className="text-3xl font-bold text-on-surface tracking-tight font-headline">How We Use Your Data</h2>
                </div>
                <ul className="grid grid-cols-1 gap-6">
                  {[
                    ['01.', 'Fulfillment of Rituals', 'Processing orders, ensuring precise delivery, and handling returns or exchanges.'],
                    ['02.', 'Curated Marketing', 'Sending personalized updates for drops, sustainability reports, and curated journal insights.'],
                    ['03.', 'Ecosystem Security', 'Monitoring for fraud and protecting shop and rewards infrastructure.'],
                  ].map((item) => (
                    <li key={item[0]} className="flex items-start space-x-6 pb-6 border-b border-outline-variant/10 last:border-b-0 last:pb-0">
                      <span className="text-tertiary font-bold text-xl">{item[0]}</span>
                      <div>
                        <h4 className="font-bold text-on-surface mb-1">{item[1]}</h4>
                        <p className="text-on-surface-variant text-sm">{item[2]}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <article className="space-y-6" id="sharing">
                  <h3 className="text-2xl font-bold text-on-surface font-headline">Data Sharing</h3>
                  <p className="text-on-surface-variant leading-relaxed font-light">
                    We share data only with trusted logistics and payment partners required to fulfill your orders securely. We never sell personal data to brokers.
                  </p>
                </article>
                <article className="space-y-6" id="rights">
                  <h3 className="text-2xl font-bold text-on-surface font-headline">Your Rights</h3>
                  <p className="text-on-surface-variant leading-relaxed font-light">
                    You may request access, correction, or deletion of your data, and withdraw consent for marketing communications any time.
                  </p>
                </article>
              </div>

              <article className="relative overflow-hidden bg-linear-to-br from-[#3c332f] to-[#221a17] p-12 rounded-xl border border-white/5 shadow-2xl" id="cookies">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-tertiary/10 rounded-full blur-[80px]"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-8">
                    <span className="w-12 h-px bg-tertiary/40"></span>
                    <h2 className="text-3xl font-bold text-on-surface tracking-tight font-headline">Cookies Policy</h2>
                  </div>
                  <p className="text-primary-fixed-dim mb-8 max-w-2xl font-light italic">
                    We use cookies to preserve session continuity, cart state, and performance analytics for a better ritual experience.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
                      <span className="text-on-surface font-medium">Essential Cookies</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-tertiary bg-tertiary/10 px-3 py-1 rounded-full">Always Active</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
                      <span className="text-on-surface font-medium">Analytics Cookies</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Opt-out Available</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
                      <span className="text-on-surface font-medium">Marketing Pixels</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Opt-out Available</span>
                    </div>
                  </div>
                </div>
              </article>

              <article className="text-center space-y-8 py-16 border-y border-outline-variant/10" id="security">
                <h2 className="text-4xl font-bold text-on-surface font-headline">Protecting the Liquid Gold</h2>
                <p className="text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
                  We employ strong encryption and continuous security monitoring to protect personal records and transaction integrity.
                </p>
                <div className="flex justify-center space-x-12 pt-4">
                  <div className="flex flex-col items-center">
                    <span className="material-symbols-outlined text-tertiary text-4xl mb-2">lock_person</span>
                    <span className="text-[10px] uppercase tracking-widest font-bold">256-bit AES</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="material-symbols-outlined text-tertiary text-4xl mb-2">verified_user</span>
                    <span className="text-[10px] uppercase tracking-widest font-bold">Secure Gateway</span>
                  </div>
                </div>
              </article>

              <article className="flex flex-col md:flex-row justify-between items-start gap-12" id="contact">
                <div className="space-y-6 max-w-md">
                  <h2 className="text-3xl font-bold text-on-surface font-headline">Reach Out</h2>
                  <p className="text-on-surface-variant font-light">
                    If you have questions about data practices or rights requests, contact our legal curator directly.
                  </p>
                </div>
                <div className="bg-surface-container p-10 rounded-lg w-full md:w-auto min-w-[320px]">
                  <div className="space-y-6">
                    <div>
                      <p className="text-[10px] font-bold text-tertiary uppercase tracking-widest mb-1">Legal Inquiry</p>
                      <p className="text-on-surface font-medium">{policyMeta?.legalEmail || 'privacy@balpro.life'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-tertiary uppercase tracking-widest mb-1">Global HQ</p>
                      <p className="text-on-surface font-medium leading-relaxed">
                        112 Cacao Boulevard,<br />
                        The Liquid District,<br />
                        San Francisco, CA 94103
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low mx-6 md:mx-12 py-24 rounded-xl text-center mb-24 px-6">
          <h2 className="text-4xl font-bold text-on-surface mb-6 font-headline">Stay within the ritual.</h2>
          <p className="text-on-surface-variant mb-12 max-w-lg mx-auto">Join our private list for editorial cacao insights and sustainable living guides.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <input
              className="w-full bg-surface-container-highest border-none rounded-full px-8 py-4 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-tertiary/50"
              placeholder="Your email essence"
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
            />
            <button
              className="w-full md:w-auto bg-linear-to-br from-[#efbf70] to-[#a77e36] text-[#432c00] font-bold px-10 py-4 rounded-full hover:scale-105 transition-transform whitespace-nowrap shadow-xl disabled:opacity-70"
              type="submit"
              disabled={subscribing}
            >
              {subscribing ? 'Securing...' : 'Secure Invite'}
            </button>
          </form>
          {newsletterMessage && <p className="mt-4 text-sm text-tertiary">{newsletterMessage}</p>}
          {newsletterError && <p className="mt-4 text-sm text-error">{newsletterError}</p>}
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;
