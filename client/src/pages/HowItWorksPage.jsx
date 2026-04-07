import React, { useState } from 'react';
import { ThumbsDown, AlertCircle, Lock, HelpCircle } from 'lucide-react';

const HowItWorksPage = () => {
  const [expandedGuide, setExpandedGuide] = useState(null);

  return (
    <div className="bg-[#19120f] text-[#efdfd9] font-body selection:bg-tertiary selection:text-on-tertiary pt-24">
      <main className="min-h-screen pb-24 px-6 flex flex-col items-center justify-center">
        {/* Title & Subtitle */}
        <header className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-[#efbf70] font-label uppercase tracking-widest text-xs mb-4 block">Cacao Gold Rewards</span>
          <h1 className="font-['Epilogue'] text-5xl md:text-6xl font-extrabold tracking-tighter mb-6 text-[#efdfd9]">The Alchemist's Portal</h1>
          <p className="text-[#e2bfb2] text-lg leading-relaxed">Seek your fortune within the golden tin. Every code is a doorway to a new ritual, though some paths may be hidden or already trodden.</p>
        </header>

        {/* How to Extract Code Guide */}
        <section className="max-w-4xl w-full mb-20">
          <div className="mb-12">
            <h2 className="font-['Epilogue'] text-3xl md:text-4xl font-bold mb-8 text-[#efbf70]">How to Extract Your Code</h2>
            <p className="text-[#d3c3be] text-lg mb-8">Follow these steps to reveal your unique ritual code hidden within your Cacao Gold tetra pack:</p>
          </div>

          {/* Step by Step Guide */}
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-[#221a17] rounded-xl p-8 border border-[#4f4440]/30 hover:border-[#efbf70]/30 transition-all duration-300">
              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 rounded-full bg-[#efbf70] flex items-center justify-center shrink-0 shadow-lg shadow-[#efbf70]/20">
                  <span className="text-[#432c00] font-['Epilogue'] text-3xl font-bold">1</span>
                </div>
                <div className="grow">
                  <h3 className="font-['Epilogue'] text-2xl font-bold mb-3 text-[#efdfd9]">Locate the Golden Wax Seal</h3>
                  <p className="text-[#d3c3be] leading-relaxed mb-4">
                    Examine the top of your Cacao Gold tetra pack. You will find an embossed golden wax seal or foil cap. This is the signature mark of authenticity and conceals your hidden code.
                  </p>
                  <div className="bg-[#19120f] rounded-lg p-4 border border-[#efbf70]/20">
                    <p className="text-sm text-[#e2bfb2] italic flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#efbf70] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                      <span>Tip: The seal is typically located at the apex of the package, marked with the Cacao Gold emblem.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#221a17] rounded-xl p-8 border border-[#4f4440]/30 hover:border-[#efbf70]/30 transition-all duration-300">
              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 rounded-full bg-[#efbf70] flex items-center justify-center shrink-0 shadow-lg shadow-[#efbf70]/20">
                  <span className="text-[#432c00] font-['Epilogue'] text-3xl font-bold">2</span>
                </div>
                <div className="grow">
                  <h3 className="font-['Epilogue'] text-2xl font-bold mb-3 text-[#efdfd9]">Carefully Peel Back the Label</h3>
                  <p className="text-[#d3c3be] leading-relaxed mb-4">
                    Using gentle, deliberate motions, peel back the protective label directly beneath the golden wax seal. The label is designed to reveal without tearing. Work slowly to avoid damage to the code printed underneath.
                  </p>
                  <div className="bg-[#19120f] rounded-lg p-4 border border-[#efbf70]/20">
                    <p className="text-sm text-[#e2bfb2] italic flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#efbf70] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                      <span>Tip: Start from one corner and peel at a 45-degree angle for the cleanest reveal.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#221a17] rounded-xl p-8 border border-[#4f4440]/30 hover:border-[#efbf70]/30 transition-all duration-300">
              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 rounded-full bg-[#efbf70] flex items-center justify-center shrink-0 shadow-lg shadow-[#efbf70]/20">
                  <span className="text-[#432c00] font-['Epilogue'] text-3xl font-bold">3</span>
                </div>
                <div className="grow">
                  <h3 className="font-['Epilogue'] text-2xl font-bold mb-3 text-[#efdfd9]">Reveal Your Unique Sequence</h3>
                  <p className="text-[#d3c3be] leading-relaxed mb-4">
                    Once the label is fully peeled, you will see your unique 12-digit ritual code printed in elegant gold foil. This sequence is one-of-a-kind and can only be redeemed once. Record it carefully for entry into the portal.
                  </p>
                  <div className="bg-[#efbf70]/10 rounded-lg p-4 border border-[#efbf70]/30">
                    <p className="text-sm text-[#e2bfb2] font-['Epilogue'] font-bold">Example Format: XXXX - XXXX - XXXX</p>
                    <p className="text-xs text-[#d3c3be] mt-2">Your personal code will follow this 12-digit pattern with letters and numbers.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#221a17] rounded-xl p-8 border border-[#4f4440]/30 hover:border-[#efbf70]/30 transition-all duration-300">
              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 rounded-full bg-[#efbf70] flex items-center justify-center shrink-0 shadow-lg shadow-[#efbf70]/20">
                  <span className="text-[#432c00] font-['Epilogue'] text-3xl font-bold">4</span>
                </div>
                <div className="grow">
                  <h3 className="font-['Epilogue'] text-2xl font-bold mb-3 text-[#efdfd9]">Enter Your Code in the Portal</h3>
                  <p className="text-[#d3c3be] leading-relaxed mb-4">
                    Return to the Cacao Gold rewards portal and submit your code. The system will validate the sequence and instantly reveal your reward—whether it's an exclusive artisanal blend, ritual points, or a rare collector's item.
                  </p>
                  <div className="bg-[#19120f] rounded-lg p-4 border border-[#efbf70]/20">
                    <p className="text-sm text-[#e2bfb2] italic flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#efbf70] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                      <span>Tip: Keep your code secure. Each code can only be redeemed once and is tied to your account.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Different Possible Outcomes */}
        <section className="max-w-7xl w-full">
          <h2 className="font-['Epilogue'] text-3xl md:text-4xl font-bold mb-8 text-[#efbf70]">Possible Outcomes</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Outcome 1: Winning */}
            <div className="bg-[#221a17] rounded-xl p-8 flex flex-col justify-between border border-[#4f4440]/30 hover:border-[#efbf70]/30 transition-all duration-300 group">
              <div className="mb-12">
                <div className="w-16 h-16 rounded-full bg-[#efbf70] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-[#efbf70]/20">
                  <span className="text-3xl">🎁</span>
                </div>
                <h3 className="font-['Epilogue'] text-2xl font-bold mb-4 text-[#efdfd9]">Grand Prize Winner</h3>
                <p className="text-[#d3c3be] leading-relaxed">Fortune has smiled upon you! Your code grants access to an exclusive reward or rare collection item from The Vault. Claim your prize instantly.</p>
              </div>
              <button className="gold-shimmer text-[#432c00] font-['Epilogue'] font-bold py-3 px-6 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg">
                View My Reward
              </button>
            </div>

            {/* Outcome 2: Losing */}
            <div className="bg-[#221a17] rounded-xl p-8 flex flex-col justify-between border border-[#4f4440]/30 hover:border-[#efbf70]/30 transition-all duration-300 group">
              <div className="mb-12">
                <div className="w-16 h-16 rounded-full bg-[#9c8e89] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <ThumbsDown size={28} className="text-[#19120f]" />
                </div>
                <h3 className="font-['Epilogue'] text-2xl font-bold mb-4 text-[#efdfd9]">Next Time, Perhaps</h3>
                <p className="text-[#d3c3be] leading-relaxed">This code did not unlock a prize today. Every bottle is another chance. Persistence rewards the devoted.</p>
              </div>
              <button className="gold-shimmer text-[#432c00] font-['Epilogue'] font-bold py-3 px-6 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg">
                Try Another Code
              </button>
            </div>

            {/* Outcome 3: Already Claimed */}
            <div className="bg-[#221a17] rounded-xl p-8 flex flex-col justify-between border border-[#4f4440]/30 hover:border-[#efbf70]/30 transition-all duration-300">
              <div className="mb-12">
                <div className="w-16 h-16 rounded-full bg-[#3c332f] flex items-center justify-center mb-8">
                  <Lock size={28} className="text-[#efbf70]" />
                </div>
                <h3 className="font-['Epilogue'] text-2xl font-bold mb-4 text-[#efdfd9]">Already Claimed</h3>
                <p className="text-[#d3c3be] leading-relaxed">This code has already been redeemed. Each essence can only be distilled once. Seek another golden vessel.</p>
              </div>
              <button className="px-6 py-3 rounded-full border border-[#efbf70]/50 font-['Epilogue'] font-bold hover:bg-[#261e1a] transition-all duration-300">
                Explore Vault
              </button>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <div className="mt-24 max-w-3xl w-full">
          <div className="relative group cursor-help">
            <div className="flex items-center gap-4 p-8 bg-[#221a17] rounded-xl border border-[#4f4440]/30 transition-all duration-300 group-hover:border-[#efbf70]/30 group-hover:bg-[#261e1a]">
              <div className="w-12 h-12 gold-shimmer rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-[#efbf70]/20">
                <HelpCircle size={24} className="text-[#432c00]" />
              </div>
              <div>
                <h4 className="font-['Epilogue'] font-bold text-lg text-[#efbf70]">Need Assistance, Alchemist?</h4>
                <p className="text-[#d3c3be] text-sm">If you believe there is a celestial error with your code or package, our curators are standing by 24/7.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HowItWorksPage;
