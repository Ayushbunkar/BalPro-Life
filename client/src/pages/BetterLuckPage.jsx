import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RotateCcw, Heart, Sparkles } from 'lucide-react';

const BetterLuckPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const code = location.state?.code || 'CXG-992-B82-VAL';

  const handleTryAgain = () => {
    navigate('/enter-code');
  };

  return (
    <div className="bg-[#140d0a] text-[#efdfd9] font-body selection:bg-tertiary selection:text-on-tertiary pt-24">
      <main className="relative min-h-screen flex items-center justify-center px-6 pb-12">
        {/* Background Glow */}
        <div className="fixed inset-0 radial-gradient pointer-events-none opacity-30"></div>

        <section className="max-w-2xl w-full relative z-10 text-center space-y-8">
          {/* Status Badge */}
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#3c332f]/50 border border-[#4f4440]/15 mb-6">
            <span className="text-[#efbf70] font-label text-xs uppercase tracking-widest font-bold">Try Again</span>
          </div>

          {/* Main Message */}
          <div className="space-y-6">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 rounded-full bg-[#3c332f]/40 border-2 border-[#4f4440]/30 flex items-center justify-center">
                <Heart size={48} className="text-[#d97706] opacity-70" />
              </div>
            </div>

            <h1 className="font-['Epilogue'] text-5xl md:text-6xl font-black tracking-tighter">
              Better Luck <span className="text-[#efbf70] italic">Next Time</span>
            </h1>

            <p className="text-[#e2bfb2] text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
              Thank you for participating in the BalPro Life Ritual! This code didn't win a prize, but your support means everything to us.
            </p>

            {/* Code Display */}
            <div className="bg-[#261e1a]/70 backdrop-blur-[20px] rounded-lg p-8 border border-[#4f4440]/15 max-w-md mx-auto">
              <p className="text-[#d3c3be] text-sm uppercase tracking-wider mb-3 font-label">Code Used</p>
              <p className="font-mono text-[#efbf70] tracking-[0.4em] text-lg break-words">{code}</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4 pt-8">
            <button
              onClick={handleTryAgain}
              className="w-full max-w-md mx-auto gold-shimmer rounded-full py-5 px-8 text-[#432c00] font-bold text-lg uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <RotateCcw size={20} />
              Try Another Code
            </button>

            <button
              onClick={() => navigate('/products')}
              className="w-full max-w-md mx-auto rounded-full border border-[#4f4440]/30 py-5 px-8 text-[#e2bfb2] font-bold text-lg uppercase tracking-widest hover:bg-white/5 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Sparkles size={20} />
              Shop Our Products
            </button>
          </div>

          {/* Encouragement Section */}
          <div className="mt-16 pt-8 border-t border-[#4f4440]/15 space-y-4">
            <h3 className="font-['Epilogue'] font-bold text-lg text-[#efbf70]">Keep the Ritual Alive 🌟</h3>
            <p className="text-[#d3c3be] text-sm leading-relaxed max-w-xl mx-auto">
              Every bottle of BalPro Life Cacao Gold contains a code. Keep collecting and trying – your perfect ritual is just a bottle away!
            </p>
            
            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mt-6">
              <div className="bg-[#221a17] p-4 rounded-lg border border-[#4f4440]/15">
                <p className="text-xs uppercase tracking-widest text-[#efbf70] font-bold mb-1">30% Chance</p>
                <p className="text-sm text-[#d3c3be]">Win a prize</p>
              </div>
              <div className="bg-[#221a17] p-4 rounded-lg border border-[#4f4440]/15">
                <p className="text-xs uppercase tracking-widest text-[#efbf70] font-bold mb-1">7 Rewards</p>
                <p className="text-sm text-[#d3c3be]">To discover</p>
              </div>
              <div className="bg-[#221a17] p-4 rounded-lg border border-[#4f4440]/15">
                <p className="text-xs uppercase tracking-widest text-[#efbf70] font-bold mb-1">48 Hours</p>
                <p className="text-sm text-[#d3c3be]">To redeem</p>
              </div>
            </div>
          </div>

          {/* Help Text */}
          <p className="mt-12 text-xs text-[#d3c3be] italic">
            Questions? Contact our concierge at <span className="text-[#efbf70] underline cursor-pointer">concierge@balpro.life</span>
          </p>
        </section>

        {/* Background Imagery (Bottom Left) */}
        <div className="absolute -left-32 bottom-0 w-80 h-80 pointer-events-none opacity-10 blur-3xl bg-[#efbf70] rounded-full"></div>
      </main>
    </div>
  );
};

export default BetterLuckPage;
