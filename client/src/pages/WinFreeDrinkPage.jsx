import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

const WinFreeDrinkPage = () => {
  const [codeInput, setCodeInput] = useState('');

  const handleReveal = () => {
    if (codeInput.trim()) {
      alert(`Code submitted: ${codeInput}`);
      setCodeInput('');
    }
  };

  return (
    <div className="bg-[#19120f] text-[#efdfd9] font-body selection:bg-tertiary selection:text-on-tertiary">

      <main className="relative overflow-hidden min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pb-32 px-6">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 z-10">
              <span className="text-[#efbf70] font-bold tracking-[0.2em] text-sm uppercase mb-6 block">FUNCTIONAL CACAO RITUALS</span>
              <h1 className="font-['Epilogue'] text-5xl md:text-7xl lg:text-8xl font-extrabold text-[#efdfd9] leading-[1.1] tracking-tighter mb-8">
                Indulgence is <br/>
                <span className="text-[#efbf70]">Rewarding.</span>
              </h1>
              <p className="text-[#e2bfb2] text-lg md:text-xl max-w-xl mb-12 leading-relaxed">
                Found a code under your gold cap? Enter it to unlock artisanal rewards and exclusive cacao rituals designed for the modern curator.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/enter-code" className="gold-shimmer text-[#432c00] px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-2xl shadow-[#efbf70]/20 text-center">
                  Enter Code
                </Link>
                <Link to="/how-it-works" className="px-10 py-5 rounded-full border border-[#4f4440]/30 font-bold text-lg hover:bg-[#261e1a] transition-colors text-center">
                  How it Works
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-[#efbf70]/20 blur-[120px] rounded-full scale-75"></div>
              <div className="relative z-0 group">
                <img
                  alt="Luxury Cacao Pack"
                  className="w-full h-auto drop-shadow-[0_40px_60px_rgba(0,0,0,0.5)] transform group-hover:rotate-2 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ7B3o83H_I0yhWlo1TqToTiFc8V1s7l5I4znC_9EmC10Yd3G4pJBAftak3CFy0ZifhHWKdT1y_Tc0XIIgU2kZzyct5lrGPUxNuAOsOXVCSwwkVz3GV4JmHg22FDSK63aIo916VRkLZ6qSo5nLkh9PN7LCom2m5i5UhpFSPrEHOTfAdB82qRYBC2z3h1vJ4Jw9AXcVRx6F3-z686YZlu_215ji7F9pqzo9Ubks0I4ZXzxH4ZUsLPAVOYY9PV82213KL5z2zNsC_Q"
                />
                {/* Floating Glass Ingredient Card */}
                <div className="absolute -bottom-8 -left-8 bg-[#19120f]/70 backdrop-blur-[20px] p-6 rounded-lg border border-[#4f4440]/10 shadow-2xl max-w-[200px]">
                  <div className="flex items-center gap-3 mb-2">
                    <Star size={16} className="text-[#efbf70]" fill="currentColor" />
                    <span className="text-xs font-bold tracking-widest uppercase text-[#efbf70]">Rare Batch</span>
                  </div>
                  <p className="text-sm font-medium text-[#ffdbcd]">Unlocking: Peruvian Gold 72% Ritual Set</p>
                </div>
              </div>
            </div>
          </div>
          {/* Background Texture */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#221a17]/50 to-transparent pointer-events-none"></div>
        </section>

        {/* How It Works Section */}
        <section className="py-32 px-6 bg-[#221a17]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="font-['Epilogue'] text-4xl md:text-5xl font-bold mb-6">The Path to Indulgence</h2>
              <div className="w-24 h-1 bg-[#efbf70] mx-auto rounded-full opacity-50"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {/* Step 1 */}
              <div className="relative group">
                <div className="text-8xl font-['Epilogue'] font-black text-[#3c332f]/50 absolute -top-12 -left-4 group-hover:text-[#efbf70]/10 transition-colors">1</div>
                <div className="relative pt-8">
                  <h3 className="text-2xl font-bold mb-4 font-['Epilogue'] text-[#e2bfb2]">Buy</h3>
                  <p className="text-[#d3c3be] leading-relaxed mb-6">Purchase any Cacao Gold elixir featuring the signature embossed gold cap at your local high-end boutique.</p>
                  <div className="rounded-xl overflow-hidden aspect-[4/3]">
                    <img
                      alt="Luxury Store"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0DcaJ8mvKP5Bk9mt58VX9OPsU4Kp-v7iN5iFORwvYoh7m71yA-0tn1G6rFuHrYZI9sQ_ZbElmwhLiTCAdT0DZeb95UDsPysxwRpCWwbJKIEvgqi9EPRLWkGW2LwtUhKj03hXUmArtXcJktodWRm8rEHsdKYo9TFNds7_TtK6BDcy1ga4ilqeDpxRF9YAfZE0S7taPUYxEAKBHeKGX9E3qCYHhz79jAlnVr3dj5D1ysZ_Kb9w7IGGhDOr7Z0bqQMfDtwvd9EtnbA"
                    />
                  </div>
                </div>
              </div>
              {/* Step 2 */}
              <div className="relative group">
                <div className="text-8xl font-['Epilogue'] font-black text-[#3c332f]/50 absolute -top-12 -left-4 group-hover:text-[#efbf70]/10 transition-colors">2</div>
                <div className="relative pt-8">
                  <h3 className="text-2xl font-bold mb-4 font-['Epilogue'] text-[#e2bfb2]">Enter</h3>
                  <p className="text-[#d3c3be] leading-relaxed mb-6">Peel back the label under the cap to reveal your unique ritual code. Enter it into our digital curator portal.</p>
                  <div className="rounded-xl overflow-hidden aspect-[4/3]">
                    <img
                      alt="Digital Portal"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbjm0rjZGvEjGEwOPeOqDHjBRSyYuoGX9hmkWgK11Np0gsU1cjiuyMDQ6NxvjKyumkscIWyo0FQwWHKNUTOTCGs4ovbYwfmypOq6ekQrL5g6PH513gUD2jhKQ15NDFrJ9bYus9cJoLBvnPNr7qwZuJqHuylKmvAeoow-gziRJVO9nA2r8GeEaGodnBy9s48tNB7SLB6F2dzHFAxds9EE0t7nJLV31tCANY2r7XvhxXTI70xSXmInv77cXIJmPgCIrTVtAAl7kJ5Q"
                    />
                  </div>
                </div>
              </div>
              {/* Step 3 */}
              <div className="relative group">
                <div className="text-8xl font-['Epilogue'] font-black text-[#3c332f]/50 absolute -top-12 -left-4 group-hover:text-[#efbf70]/10 transition-colors">3</div>
                <div className="relative pt-8">
                  <h3 className="text-2xl font-bold mb-4 font-['Epilogue'] text-[#e2bfb2]">Indulge</h3>
                  <p className="text-[#d3c3be] leading-relaxed mb-6">Win instant artisanal rewards or collect ritual points for rare batches and limited edition gallery pieces.</p>
                  <div className="rounded-xl overflow-hidden aspect-[4/3]">
                    <img
                      alt="Artisanal Chocolate"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeNghqBPRER5uxRzf-1qOaqFLZKWETDaIyvJVWHjAbOoVA3rFORjxRPJF5aJ-BQSPu6zJzUadJ6VIUaFUBIU_r_JC8pvwY3_7-mwxdvDV3fT_5m-I1yCaP_NudXYGMP0AWMJ-JsDZNIxLE87ePnyt-cg3lJuNvLhgjT0qZT8ovh7OqcHFp4AfMclvIDn_qJuFGPZkQNCfSPXxaTVVWkkju_Mk3LnEYbPdS_fUc3PKVfpZ_fKHoEPpQNPwGy1XlvsqAlLC4sJ0PmQ"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Vault (Rewards Showcase) */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-2xl">
                <span className="text-[#efbf70] font-bold tracking-[0.2em] text-sm uppercase mb-4 block">EXCLUSIVES</span>
                <h2 className="font-['Epilogue'] text-4xl md:text-6xl font-bold">The Vault</h2>
                <p className="text-[#e2bfb2] text-lg mt-6">A curated selection of artisanal rewards available only to the Cacao Gold inner circle.</p>
              </div>
              <a className="group flex items-center gap-2 text-[#efbf70] font-bold hover:translate-x-1 transition-transform cursor-pointer">
                VIEW FULL CATALOGUE 
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            {/* Bento Grid for Rewards */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto">
              {/* Reward 1: Large Asymmetric */}
              <div className="md:col-span-8 group relative rounded-xl overflow-hidden bg-[#261e1a] h-[500px]">
                <img
                  alt="Premium Glassware"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz5NnItXX2r8DRlOfraWZYWo6YPjZSPlA3eL_pE6GrdOZlC_mDTAbuPQJ9F5CYjNkGhbvFVHTudPAAVusyw40RnWr4K-Pfm2r5XU_EvCeE7IV6zJ6TDCDABjkwmLY90KvEEXOYa0Tcp43LFZDs5XGvww7MqlLm27n_vXJfV4vZANlqBd2xg7lb9no9fG_yAlXWRjrM2nIQcd1ABRUgVLiph9CRot7CnNEi5XNuUweDTW95RHnXv-8sFi86TUSfDp0wsAtdsy0gsQ"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#19120f] via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10">
                  <span className="bg-[#efbf70]/20 backdrop-blur-md text-[#efbf70] px-4 py-1 rounded-full text-xs font-bold tracking-widest mb-4 inline-block border border-[#efbf70]/30">CRAFTED</span>
                  <h3 className="text-3xl font-['Epilogue'] font-bold mb-2">The Alchemist's Flute</h3>
                  <p className="text-[#d3c3be] max-w-sm">Hand-blown lead crystal glassware designed to aerate the complex notes of ceremonial cacao.</p>
                </div>
              </div>
              {/* Reward 2: Vertical Small */}
              <div className="md:col-span-4 group relative rounded-xl overflow-hidden bg-[#261e1a] h-[500px]">
                <img
                  alt="Artisanal Chocolate"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIK1Djp3qbqSzCda1Fgg48A7tVeGQjkQQi2fo_Ngu3XaZ79l4ELMd0_PuA0lqD4o9So1sVbZIz2K2h1EpZ7AZ2VGsNUIoZE9D9nimyJ8lMCvK0NyPPcL3n9cK6judvKOW15r8_8qMW4CTZbq4lmMxXl24tGrYh8dU8bAPTg3NE1aD2b6rXUShgpXjzRxFZZjLGJFiWW82b2ZOCY7xQCvfOhl0R7Hc4yFZ9I4IkmTy3WLC059vg0UGkCXZ8YBD9TRJZMTXXsovsoQ"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#19120f] via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10">
                  <span className="bg-[#efbf70]/20 backdrop-blur-md text-[#efbf70] px-4 py-1 rounded-full text-xs font-bold tracking-widest mb-4 inline-block border border-[#efbf70]/30">LIMITED</span>
                  <h3 className="text-2xl font-['Epilogue'] font-bold mb-2">Small Batch No. 04</h3>
                  <p className="text-[#d3c3be] text-sm">A rare blend of Madagascan single-origin beans infused with sea salt and lavender.</p>
                </div>
              </div>
              {/* Reward 3: Square Small */}
              <div className="md:col-span-4 group relative rounded-xl overflow-hidden bg-[#261e1a] h-[400px]">
                <img
                  alt="Ceremonial Whisk"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8v2VOA_QYPVp0gx-huzW9j6XFw8sZP-Y18akmZhO0TO7z1Tl7TJlu8rrVjnX9M8uFkMSB9NAV8eHk5Rdf7FfKyY2F3t4glqJwDIkwr7fdBD5jyDEvhoz4lh0hTUIYwune6VzJPshkd8F_1dwOBeDn__QTLDqH4TnYot9p2gCMXQc9PLPujBLB1c1xh-OqqGE_CxTU2c2-Im7MpnuZGCOlRWL5ZqNIAIBgZkdCs85bDSPgHS38OcVq_OEoQBzR3UWn77h1qL2o2Q"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#19120f] via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10">
                  <h3 className="text-2xl font-['Epilogue'] font-bold mb-2">Gold-Plated Molinillo</h3>
                  <p className="text-[#d3c3be] text-sm">Elevate your frothing ritual with our signature gilded tool.</p>
                </div>
              </div>
              {/* Reward 4: Wide */}
              <div className="md:col-span-8 group relative rounded-xl overflow-hidden bg-[#261e1a] h-[400px]">
                <img
                  alt="Tasting Box"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOko8nmHbESHC_5cT4XF9t-R3VZSRmgwHQhH6awJyRDdYYHWn7waNcG3r6Zk5pRt_goWMDIU9OOGPc4h4Fc8ByINvYhamfd7VT3OEv59o4aj_QtB0QUo1Czwp-GFU8o7kzRM3eRXpJGOc-MAFl6n7Utgw4C1gsgp_XqK_M05L_HUjAb4ynQ2yp1TxlcDcKjU_maNQL2geRIbk9YM-i0VPf_P8zE5EZw9nHGb3b8tvDTQ-dZCZJ0izu5MA7uXMbrt_lLlUQFXWVHA"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#19120f] via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10">
                  <span className="bg-[#efbf70]/20 backdrop-blur-md text-[#efbf70] px-4 py-1 rounded-full text-xs font-bold tracking-widest mb-4 inline-block border border-[#efbf70]/30">TIER 1</span>
                  <h3 className="text-3xl font-['Epilogue'] font-bold mb-2">The Curator's Ritual Box</h3>
                  <p className="text-[#d3c3be] max-w-md">Everything needed for a complete sensory immersion, delivered to your door.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto bg-[#19120f]/70 backdrop-blur-[20px] rounded-xl p-12 md:p-24 text-center relative overflow-hidden border border-[#4f4440]/10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#efbf70]/5 to-transparent pointer-events-none"></div>
            <h2 className="font-['Epilogue'] text-4xl md:text-6xl font-bold mb-8 relative z-10">Ready to Reveal Your Reward?</h2>
            <p className="text-[#e2bfb2] text-lg mb-12 max-w-2xl mx-auto relative z-10">Join thousands of curators who have already unlocked exclusive access to the Cacao Gold reserve.</p>
            <div className="max-w-md mx-auto relative z-10">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
                  onKeyPress={(e) => e.key === 'Enter' && handleReveal()}
                  className="flex-grow bg-[#19120f]/50 border border-[#4f4440]/30 rounded-full px-8 py-5 text-[#efbf70] placeholder:text-[#9c8e89] focus:ring-2 focus:ring-[#efbf70] focus:border-transparent outline-none uppercase font-bold tracking-widest text-center sm:text-left"
                  placeholder="ENTER 12-DIGIT CODE"
                  type="text"
                  maxLength="12"
                />
                <button
                  onClick={handleReveal}
                  className="gold-shimmer text-[#432c00] px-10 py-5 rounded-full font-bold whitespace-nowrap hover:scale-105 transition-transform duration-300 shadow-lg"
                >
                  REVEAL
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#221a17] w-full py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="text-xl font-bold text-[#efbf70] font-['Epilogue']">Cacao Gold</div>
            <p className="font-['Plus_Jakarta_Sans'] text-sm uppercase tracking-widest text-[#4f4440]">© 2024 Cacao Gold Editorial. All Rights Reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="font-['Plus_Jakarta_Sans'] text-sm uppercase tracking-widest text-[#4f4440] hover:text-[#e2bfb2] transition-all duration-200" href="#">Privacy Policy</a>
            <a className="font-['Plus_Jakarta_Sans'] text-sm uppercase tracking-widest text-[#4f4440] hover:text-[#e2bfb2] transition-all duration-200" href="#">Terms of Entry</a>
            <a className="font-['Plus_Jakarta_Sans'] text-sm uppercase tracking-widest text-[#4f4440] hover:text-[#e2bfb2] transition-all duration-200" href="#">Contact Support</a>
            <a className="font-['Plus_Jakarta_Sans'] text-sm uppercase tracking-widest text-[#4f4440] hover:text-[#e2bfb2] transition-all duration-200" href="#">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WinFreeDrinkPage;
