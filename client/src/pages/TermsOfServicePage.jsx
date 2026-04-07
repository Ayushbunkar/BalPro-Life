import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { legalAPI } from '../utils/api';

const TermsOfServicePage = () => {
  const [termsMeta, setTermsMeta] = useState(null);
  const [loadingMeta, setLoadingMeta] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmError, setConfirmError] = useState('');

  useEffect(() => {
    let active = true;

    const loadMeta = async () => {
      setLoadingMeta(true);
      try {
        const res = await legalAPI.getTermsOfService();
        if (active) {
          setTermsMeta(res?.data || null);
        }
      } catch {
        if (active) {
          setTermsMeta(null);
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
    if (!termsMeta?.lastUpdated) return 'N/A';
    const date = new Date(termsMeta.lastUpdated);
    if (Number.isNaN(date.getTime())) return 'N/A';
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }, [termsMeta?.lastUpdated]);

  const handleConfirmAgreement = async () => {
    setConfirmError('');
    setConfirmMessage('');

    try {
      setConfirming(true);
      const res = await legalAPI.confirmTermsAgreement({
        source: 'terms-page-cta',
        termsVersion: termsMeta?.termsVersion || '2026.04',
      });
      setConfirmMessage(res?.message || 'Agreement confirmed successfully.');
    } catch (err) {
      setConfirmError(err?.message || 'Unable to confirm agreement right now. Please try again.');
    } finally {
      setConfirming(false);
    }
  };

  return (
    <div className="bg-background text-on-surface font-body selection:bg-tertiary selection:text-on-tertiary">
      <main className="pt-8">
        <section className="px-6 md:px-12 mb-20 md:mb-28">
          <div className="max-w-6xl mx-auto flex justify-between items-center gap-4 bg-[#19120f]/70 backdrop-blur-xl rounded-full border border-outline-variant/20 px-6 py-4">
            <div className="text-xl md:text-2xl font-black tracking-tighter text-[#efbf70] font-headline uppercase">BALPRO LIFE</div>
            <Link className="group flex items-center gap-2 text-[#efbf70] font-headline tracking-tight text-xs md:text-sm uppercase transition-transform hover:scale-105 active:scale-95" to="/">
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Return to Ritual
            </Link>
          </div>
        </section>

        <section className="px-6 md:px-12 mb-24 md:mb-32">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-tertiary font-label font-semibold tracking-[0.2em] uppercase text-xs mb-6 block">Legal Integrity</span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline font-black tracking-tighter text-on-surface mb-8 leading-[0.9]">
              The Terms of the <span className="text-tertiary">Ritual</span>
            </h1>
            <p className="text-primary-fixed-dim text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
              At BALPRO LIFE, excellence is not just in our ingredients, but in our commitment to transparency. These terms define the foundation of our shared journey towards peak performance.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-12 pb-24">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
            <aside className="md:col-span-3 hidden md:block sticky top-32 h-fit">
              <nav className="space-y-6">
                <a className="block text-tertiary font-medium border-l-2 border-tertiary pl-4" href="#acceptance">Acceptance</a>
                <a className="block text-on-surface-variant hover:text-tertiary transition-colors pl-4 border-l-2 border-transparent" href="#product-use">Product Safety</a>
                <a className="block text-on-surface-variant hover:text-tertiary transition-colors pl-4 border-l-2 border-transparent" href="#user-accounts">The Rewards Game</a>
                <a className="block text-on-surface-variant hover:text-tertiary transition-colors pl-4 border-l-2 border-transparent" href="#intellectual-property">Property</a>
                <a className="block text-on-surface-variant hover:text-tertiary transition-colors pl-4 border-l-2 border-transparent" href="#billing">Billing Rituals</a>
                <a className="block text-on-surface-variant hover:text-tertiary transition-colors pl-4 border-l-2 border-transparent" href="#shipping">Shipping</a>
                <a className="block text-on-surface-variant hover:text-tertiary transition-colors pl-4 border-l-2 border-transparent" href="#liability">Liability</a>
                <a className="block text-on-surface-variant hover:text-tertiary transition-colors pl-4 border-l-2 border-transparent" href="#governing-law">Governing Law</a>
              </nav>
            </aside>

            <div className="md:col-span-9 space-y-20 md:space-y-24">
              <div className="scroll-mt-32" id="acceptance">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-tertiary-fixed-dim text-4xl font-headline font-black opacity-20">01</span>
                  <h2 className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-tight">Acceptance of Terms</h2>
                </div>
                <div className="bg-surface-container/60 backdrop-blur-xl p-8 md:p-10 rounded-xl border border-outline-variant/15">
                  <p className="text-primary-fixed-dim leading-relaxed mb-6">
                    By accessing the BALPRO LIFE digital ecosystem or purchasing our curated functional blends, you are entering a binding agreement. You acknowledge that you have read, understood, and agreed to be bound by these terms. If you do not agree, we respectfully ask that you refrain from the ritual.
                  </p>
                  <p className="text-primary-fixed-dim leading-relaxed">
                    We reserve the right to evolve these terms as our brand grows. Continued use of the platform following updates constitutes acceptance of the new framework.
                  </p>
                </div>
              </div>

              <div className="scroll-mt-32" id="product-use">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-tertiary-fixed-dim text-4xl font-headline font-black opacity-20">02</span>
                  <h2 className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-tight">Product Use &amp; Safety</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-surface-container-low p-8 rounded-lg">
                    <h3 className="text-tertiary font-headline font-bold mb-4 uppercase text-sm tracking-widest">Intended Use</h3>
                    <p className="text-on-surface-variant text-sm leading-loose">
                      Our functional cacao is designed for performance enhancement through bio-available nutrients. It is a dietary supplement, not a replacement for medical treatment or a varied diet.
                    </p>
                  </div>
                  <div className="bg-surface-container-low p-8 rounded-lg border border-outline-variant/10">
                    <h3 className="text-tertiary font-headline font-bold mb-4 uppercase text-sm tracking-widest">Consultation</h3>
                    <p className="text-on-surface-variant text-sm leading-loose">
                      Individuals with pre-existing conditions, pregnancy, or specific medical histories should consult a healthcare professional before beginning the BALPRO ritual.
                    </p>
                  </div>
                </div>
              </div>

              <div className="scroll-mt-32" id="user-accounts">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-tertiary-fixed-dim text-4xl font-headline font-black opacity-20">03</span>
                  <h2 className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-tight">User Accounts &amp; The Rewards Game</h2>
                </div>
                <div className="bg-surface-container/60 backdrop-blur-xl p-8 md:p-10 rounded-xl relative overflow-hidden border border-outline-variant/15">
                  <div className="relative z-10">
                    <p className="text-primary-fixed-dim leading-relaxed mb-6">
                      Creating an account unlocks the BALPRO inner circle. You are responsible for maintaining the confidentiality of your credentials. Any Rewards or Performance Points earned through our loyalty program are non-transferable and hold no cash value outside the ecosystem.
                    </p>
                    <div className="flex items-center gap-3 py-4 px-6 rounded-full bg-tertiary-container/30 border border-tertiary/20 w-fit">
                      <span className="material-symbols-outlined text-tertiary">military_tech</span>
                      <span className="text-tertiary text-xs font-bold tracking-widest uppercase">Member-Only Access Enabled</span>
                    </div>
                  </div>
                  <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-tertiary/5 rounded-full blur-3xl"></div>
                </div>
              </div>

              <div className="scroll-mt-32" id="intellectual-property">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-tertiary-fixed-dim text-4xl font-headline font-black opacity-20">04</span>
                  <h2 className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-tight">Intellectual Property</h2>
                </div>
                <div className="space-y-6 text-primary-fixed-dim leading-relaxed">
                  <p>
                    Every visual asset, formula description, and editorial narrative within this domain is the exclusive property of BALPRO LIFE. The Velvet Cocoa Monolith aesthetic and our proprietary blend ratios are protected by global intellectual property laws.
                  </p>
                  <p className="italic text-on-surface-variant border-l-4 border-tertiary/30 pl-6">
                    Unauthorized reproduction, modification, or distribution of our brand elements for commercial use is strictly prohibited and will be met with rigorous legal action.
                  </p>
                </div>
              </div>

              <div className="scroll-mt-32" id="billing">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-tertiary-fixed-dim text-4xl font-headline font-black opacity-20">05</span>
                  <h2 className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-tight">Billing &amp; Subscription Rituals</h2>
                </div>
                <div className="bg-surface-container-highest/30 p-8 md:p-12 rounded-xl border border-outline-variant/15">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <h4 className="text-on-surface font-headline font-bold mb-4">Subscription Continuity</h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed">
                        Choose the subscription model for uninterrupted flow. Your selected payment method will be billed at the frequency chosen until you choose to pause or end the ritual through your dashboard.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-on-surface font-headline font-bold mb-4">The Cleanse (Cancellation)</h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed">
                        You may pause or cancel your subscription at any time. To avoid the next billing cycle, cancellations must be processed at least 48 hours prior to the renewal date.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="scroll-mt-32" id="shipping">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-tertiary-fixed-dim text-4xl font-headline font-black opacity-20">06</span>
                  <h2 className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-tight">Shipping &amp; Fulfillment</h2>
                </div>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-1/3 aspect-square rounded-lg overflow-hidden bg-surface-container-high">
                    <img
                      alt="Logistics"
                      className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-all duration-700"
                      src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1000&q=80"
                    />
                  </div>
                  <div className="w-full md:w-2/3 space-y-6">
                    <p className="text-primary-fixed-dim leading-relaxed">
                      We partner with elite logistics providers to ensure your ritual arrives with its potency intact. While we strive for precision, delivery times are estimates.
                    </p>
                    <ul className="space-y-4">
                      <li className="flex gap-4 items-start">
                        <span className="material-symbols-outlined text-tertiary mt-1">check_circle</span>
                        <span className="text-on-surface-variant text-sm">Domestic orders typically arrive within 3-5 business days.</span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="material-symbols-outlined text-tertiary mt-1">check_circle</span>
                        <span className="text-on-surface-variant text-sm">International shipping may vary based on local customs and regulatory checks.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="scroll-mt-32" id="liability">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-tertiary-fixed-dim text-4xl font-headline font-black opacity-20">07</span>
                  <h2 className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-tight">Limitation of Liability</h2>
                </div>
                <div className="bg-surface-container-lowest p-8 md:p-10 rounded-xl border border-tertiary/10">
                  <p className="text-primary-fixed-dim leading-relaxed uppercase tracking-tighter text-sm">
                    To the maximum extent permitted by law, BALPRO LIFE shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our products or services. Our total liability shall not exceed the total amount paid by you for the specific product or service in question.
                  </p>
                </div>
              </div>

              <div className="scroll-mt-32" id="governing-law">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-tertiary-fixed-dim text-4xl font-headline font-black opacity-20">08</span>
                  <h2 className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-tight">Governing Law</h2>
                </div>
                <p className="text-primary-fixed-dim leading-relaxed mb-6">
                  These terms are governed by and construed in accordance with the laws of {termsMeta?.governingJurisdiction || 'Maharashtra, India'}. Any disputes arising from these terms shall be settled through binding arbitration in the same jurisdiction.
                </p>
                <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/20">
                  <p className="text-on-surface-variant text-xs uppercase tracking-widest mb-2">Last Updated</p>
                  <p className="text-tertiary text-sm font-bold tracking-wide">{loadingMeta ? 'Loading...' : lastUpdatedLabel}</p>
                  <p className="text-on-surface-variant text-xs uppercase tracking-widest mt-4 mb-2">Legal Contact</p>
                  <p className="text-primary-fixed-dim text-sm">{termsMeta?.legalEmail || 'legal@balpro.life'}</p>
                </div>

                <div className="pt-10 border-t border-outline-variant/20 flex flex-col items-center">
                  <button
                    className="bg-linear-to-br from-[#efbf70] to-[#a77e36] text-on-primary px-12 py-4 rounded-full font-headline font-black uppercase text-sm tracking-widest hover:scale-105 active:scale-95 transition-transform shadow-xl disabled:opacity-70"
                    onClick={handleConfirmAgreement}
                    type="button"
                    disabled={confirming}
                  >
                    {confirming ? 'Confirming...' : 'Confirm Agreement'}
                  </button>
                  {confirmMessage && <p className="mt-4 text-sm text-tertiary">{confirmMessage}</p>}
                  {confirmError && <p className="mt-4 text-sm text-error">{confirmError}</p>}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TermsOfServicePage;
