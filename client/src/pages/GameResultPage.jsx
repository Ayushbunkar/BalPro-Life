import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RotateCcw, Heart, QrCode, Share2, Wallet, Trophy, PartyPopper } from 'lucide-react';

const GameResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, gameData } = location.state || {};

  const handleTryAgain = () => {
    navigate('/enter-code');
  };

  const handleShare = () => {
    const message = result === 'win' 
      ? `I just won a ${gameData.reward}! 🎉 Try your luck with BalPro Life!`
      : `I just played the lucky number game! Try your luck with BalPro Life! 🎯`;
    
    if (navigator.share) {
      navigator.share({
        title: 'BalPro Life Lucky Number Game',
        text: message,
      });
    } else {
      alert(message);
    }
  };

  const handleSaveToWallet = () => {
    alert('Feature coming soon: Save to Apple Wallet / Google Pay');
  };

  if (result === 'win') {
    return (
      <div className="bg-[#19120f] text-[#efdfd9] font-body selection:bg-tertiary selection:text-on-tertiary pt-24 min-h-screen">
        <main className="relative">
          {/* Background Glow */}
          <div className="fixed inset-0 radial-gradient pointer-events-none opacity-30"></div>

          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24 text-center relative z-10">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-[#3c332f]/50 border border-[#4f4440]/15">
              <span className="text-[#efbf70] font-label text-xs uppercase tracking-widest font-bold">🎉 You Won!</span>
            </div>

            <h1 className="font-['Epilogue'] text-5xl md:text-7xl font-black tracking-tighter mb-8 max-w-4xl mx-auto">
              Congratulations! <span className="text-[#efbf70] italic">You Matched the Number!</span>
            </h1>

            <p className="font-body text-[#e2bfb2] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Your lucky number {gameData.userNumber} matched the winning number! Claim your exclusive reward now.
            </p>
          </section>

          {/* Game Result Display */}
          <section className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32 relative z-10">
            {/* Number Comparison */}
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <p className="text-[#d3c3be] text-sm uppercase tracking-wider font-label">Game Results</p>
                
                <div className="grid grid-cols-2 gap-6">
                  {/* User Number */}
                  <div className="bg-[#261e1a]/70 backdrop-blur-[20px] rounded-lg p-8 border border-[#4f4440]/15">
                    <p className="text-[#d3c3be] text-sm uppercase tracking-wider mb-4">Your Number</p>
                    <p className="font-['Epilogue'] text-5xl font-black text-blue-400">
                      {gameData.userNumber}
                    </p>
                  </div>

                  {/* Winning Number */}
                  <div className="bg-[#261e1a]/70 backdrop-blur-[20px] rounded-lg p-8 border border-[#efbf70]/50 ring-2 ring-[#efbf70]/30">
                    <p className="text-[#efbf70] text-sm uppercase tracking-wider font-bold mb-4">Winning Number</p>
                    <p className="font-['Epilogue'] text-5xl font-black text-[#efbf70]">
                      {gameData.winningNumber}
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <span className="px-4 py-2 rounded-full gold-shimmer text-[#432c00] font-bold text-sm uppercase">
                    ✓ Perfect Match!
                  </span>
                </div>
              </div>
            </div>

            {/* Reward Details */}
            <div className="space-y-8">
              <div className="bg-[#261e1a]/70 backdrop-blur-[20px] rounded-xl p-8 md:p-12 border border-[#4f4440]/15 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#efbf70]/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="relative z-10 space-y-8">
                  {/* Reward Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Trophy size={32} className="text-[#efbf70]" />
                      <h2 className="font-['Epilogue'] text-3xl font-bold">Your Reward</h2>
                    </div>

                    <div className="bg-[#1a1410] rounded-lg p-6 border border-[#efbf70]/20">
                      <p className="text-[#d3c3be] text-sm uppercase tracking-wider mb-2">Prize</p>
                      <p className="font-['Epilogue'] text-2xl font-bold text-[#efbf70]">
                        {gameData.reward}
                      </p>
                    </div>
                  </div>

                  {/* Reward ID */}
                  <div className="space-y-3">
                    <p className="text-[#d3c3be] text-sm uppercase tracking-wider font-label">Claim Code</p>
                    <div className="font-mono text-[#efbf70] text-lg text-center py-3 px-4 rounded-lg bg-[#1a1410] border border-[#4f4440]/30 break-words">
                      {gameData.rewardId}
                    </div>
                  </div>

                  {/* Expiry */}
                  <div className="bg-orange-950/30 border border-orange-500/30 rounded-lg py-3 px-4">
                    <p className="text-orange-300 text-sm">
                      ⏱️ <strong>Valid for 48 hours</strong> from now
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Redemption Instructions */}
          <section className="max-w-6xl mx-auto px-6 md:px-12 bg-[#221a17] rounded-xl p-8 md:p-12 mb-24 relative z-10">
            <h3 className="font-['Epilogue'] text-3xl font-bold mb-12 text-center">How to Claim Your Reward</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="w-16 h-16 rounded-full bg-[#3c332f] flex items-center justify-center mx-auto mb-6 border border-[#4f4440]/20 group-hover:border-[#efbf70]/40 transition-colors">
                  <QrCode size={28} className="text-[#efbf70]" />
                </div>
                <h4 className="font-bold mb-4 text-lg">Show Your Code</h4>
                <p className="text-sm text-[#d3c3be] leading-relaxed">Show this claim code or QR  to store staff during checkout.</p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 rounded-full bg-[#3c332f] flex items-center justify-center mx-auto mb-6 border border-[#4f4440]/20 group-hover:border-[#efbf70]/40 transition-colors">
                  <PartyPopper size={28} className="text-[#efbf70]" />
                </div>
                <h4 className="font-bold mb-4 text-lg">Visit Any Store</h4>
                <p className="text-sm text-[#d3c3be] leading-relaxed">Visit any authorized BalPro Life or Velvet Cocoa boutique.</p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 rounded-full bg-[#3c332f] flex items-center justify-center mx-auto mb-6 border border-[#4f4440]/20 group-hover:border-[#efbf70]/40 transition-colors">
                  <Wallet size={28} className="text-[#efbf70]" />
                </div>
                <h4 className="font-bold mb-4 text-lg">Redeem & Enjoy</h4>
                <p className="text-sm text-[#d3c3be] leading-relaxed">Redeem your reward and enjoy your premium drink or discount!</p>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <section className="max-w-3xl mx-auto px-6 md:px-12 mb-24 relative z-10">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSaveToWallet}
                className="flex-1 rounded-full gold-shimmer py-5 px-8 text-[#432c00] font-bold text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl"
              >
                <Wallet size={20} />
                Save to Wallet
              </button>

              <button
                onClick={handleShare}
                className="flex-1 rounded-full border border-[#4f4440]/30 py-5 px-8 text-[#e2bfb2] font-bold text-sm uppercase tracking-widest hover:bg-white/5 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Share2 size={20} />
                Share
              </button>

              <button
                onClick={handleTryAgain}
                className="flex-1 rounded-full border border-[#4f4440]/30 py-5 px-8 text-[#e2bfb2] font-bold text-sm uppercase tracking-widest hover:bg-white/5 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <RotateCcw size={20} />
                Try Again
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  } else {
    // LOSE Screen
    return (
      <div className="bg-[#140d0a] text-[#efdfd9] font-body selection:bg-tertiary selection:text-on-tertiary pt-24 min-h-screen pb-12">
        <main className="max-w-2xl mx-auto px-6 text-center relative z-10 space-y-8">
          {/* Status Badge */}
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#3c332f]/50 border border-[#4f4440]/15 mb-6">
            <span className="text-[#d3c3be] font-label text-xs uppercase tracking-widest font-bold">Game Result</span>
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
              Your number didn't match this time, but your support means everything to us. Try another bottle!
            </p>

            {/* Number Comparison */}
            <div className="bg-[#261e1a]/70 backdrop-blur-[20px] rounded-lg p-8 border border-[#4f4440]/15 grid grid-cols-2 gap-4 mt-8">
              <div>
                <p className="text-[#d3c3be] text-sm uppercase tracking-wider mb-3">Your Number</p>
                <p className="font-['Epilogue'] text-4xl font-black text-blue-400 mb-2">
                  {gameData.userNumber}
                </p>
              </div>

              <div>
                <p className="text-[#d3c3be] text-sm uppercase tracking-wider mb-3">Winning Number</p>
                <p className="font-['Epilogue'] text-4xl font-black text-[#efbf70] mb-2">
                  {gameData.winningNumber}
                </p>
              </div>

              <div className="col-span-2 pt-4 border-t border-[#4f4440]/30">
                <p className="text-sm text-[#d3c3be] italic">No match - thank you for playing!</p>
              </div>
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
              className="w-full max-w-md mx-auto rounded-full border border-[#4f4440]/30 py-5 px-8 text-[#e2bfb2] font-bold text-lg uppercase tracking-widest hover:bg-white/5 active:scale-95 transition-all duration-300"
            >
              Shop Our Products
            </button>
          </div>

          {/* Encouragement Section */}
          <div className="mt-16 pt-8 border-t border-[#4f4440]/15 space-y-4 max-w-md mx-auto">
            <h3 className="font-['Epilogue'] font-bold text-lg text-[#efbf70]">Keep the Ritual Alive 🌟</h3>
            <p className="text-[#d3c3be] text-sm leading-relaxed">
              Every bottle of BalPro Life Cacao Gold contains a code. Keep collecting – your lucky number is just around the corner!
            </p>
            
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="bg-[#221a17] p-3 rounded-lg border border-[#4f4440]/15">
                <p className="text-xs uppercase tracking-widest text-[#efbf70] font-bold">1 in 100</p>
                <p className="text-xs text-[#d3c3be]">Odds</p>
              </div>
              <div className="bg-[#221a17] p-3 rounded-lg border border-[#4f4440]/15">
                <p className="text-xs uppercase tracking-widest text-[#efbf70] font-bold">7 Rewards</p>
                <p className="text-xs text-[#d3c3be]">To Win</p>
              </div>
              <div className="bg-[#221a17] p-3 rounded-lg border border-[#4f4440]/15">
                <p className="text-xs uppercase tracking-widest text-[#efbf70] font-bold">48 Hours</p>
                <p className="text-xs text-[#d3c3be]">To Redeem</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
};

export default GameResultPage;
