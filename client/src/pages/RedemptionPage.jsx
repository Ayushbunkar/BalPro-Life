import React from 'react';
import { useLocation } from 'react-router-dom';
import { MapPin, Qr, Celebration, Share2, Wallet } from 'lucide-react';

const RedemptionPage = () => {
  const location = useLocation();
  const code = location.state?.code || 'CXG-992-B82-VAL';

  const handleSaveToWallet = () => {
    alert('Feature coming soon: Save to Apple Wallet / Google Pay');
  };

  const handleShare = () => {
    const shareText = `I won a premium Cacao Gold reward! Redemption Code: ${code}`;
    if (navigator.share) {
      navigator.share({
        title: 'Cacao Gold Reward',
        text: shareText,
      });
    } else {
      alert(shareText);
    }
  };

  return (
    <div className="bg-[#19120f] text-[#efdfd9] font-body selection:bg-tertiary selection:text-on-tertiary pt-24">
      <main className="relative min-h-screen">
        {/* Background Glow */}
        <div className="fixed inset-0 radial-gradient pointer-events-none opacity-30"></div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24 text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-[#3c332f]/50 border border-[#4f4440]/15">
            <span className="text-[#efbf70] font-label text-xs uppercase tracking-widest font-bold">Premium Redemption</span>
          </div>
          <h1 className="font-['Epilogue'] text-5xl md:text-7xl font-black tracking-tighter mb-8 max-w-4xl mx-auto">
            The Ritual is Yours. <span className="text-[#efbf70] italic">Claim Your Prize.</span>
          </h1>
          <p className="font-body text-[#e2bfb2] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Present this unique code at any participating boutique or retail partner to redeem your complimentary Cacao Gold Tetra Pack.
          </p>
        </section>

        {/* Redemption Canvas */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32 relative z-10">
          {/* Left: Product Visual */}
          <div className="lg:col-span-5 relative group order-2 lg:order-1">
            <div className="absolute -inset-10 bg-[#efbf70]/10 rounded-full blur-[80px] group-hover:bg-[#efbf70]/20 transition-all duration-700"></div>
            <div className="relative z-0 flex justify-center">
              <img
                alt="Cacao Gold Tetra Pack"
                className="w-full max-w-sm rounded-xl transform -rotate-6 hover:rotate-0 transition-transform duration-700 drop-shadow-[0_40px_60px_rgba(0,0,0,0.5)]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuARZNXQDGB-IkyuctMi8etKFOucYV1ol8ZXGhFMDQE21zTWA_aujvOZZldg9LLuUIl6kdzw5O-PoMdJ8FkKD-gc-i1Stn1BICvzx3E19bEBHC5hSdgg905Fno6ZNpctg_upA4hK3zuFYl5XI_Z_Er4ZiiwdhK-jXUCsjeMsGlh2_eJ-sFVD-bbd-w3LeWX8aBgWEVycs5IVKE6kUJjqFaeLf3r15cOtynlbVjH8mQpW75adjZEww33AGDQfCiFmDWu88AbqDvlg2Q"
              />
            </div>

            {/* Floating Info Badge */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 bg-[#261e1a]/70 backdrop-blur-[20px] p-6 rounded-lg border border-[#4f4440]/15 flex items-center gap-4 shadow-2xl z-20">
              <div className="w-12 h-12 rounded-full gold-shimmer flex items-center justify-center text-[#432c00] font-bold">
                ✓
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[#efbf70] font-bold">Authentic Reward</p>
                <p className="text-sm text-[#e2bfb2]">Verified Balpro Life Partner</p>
              </div>
            </div>
          </div>

          {/* Right: QR Code & Controls */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="bg-[#261e1a]/70 backdrop-blur-[20px] rounded-xl p-8 md:p-12 border border-[#4f4440]/15 relative overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                  <h2 className="font-['Epilogue'] text-3xl font-bold mb-2">Redeem In-Store</h2>
                  <p className="text-[#d3c3be] font-label text-sm uppercase tracking-wider">Scan at register</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="px-3 py-1 rounded-full bg-green-900/30 text-green-400 text-[10px] font-black uppercase tracking-widest border border-green-500/20 mb-2">
                    STATUS: Active Reward
                  </span>
                  <span className="text-[#ffb4ab] text-[10px] font-bold uppercase tracking-widest">EXPIRATION: Valid for 48 hours</span>
                </div>
              </div>

              {/* QR Code Area */}
              <div className="flex flex-col items-center justify-center py-12 bg-white/5 rounded-lg mb-12 border border-white/5 relative group">
                {/* Corner Brackets */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#efbf70] m-4"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#efbf70] m-4"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#efbf70] m-4"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#efbf70] m-4"></div>

                <img
                  alt="Redemption QR Code"
                  className="w-48 h-48 md:w-64 md:h-64 object-contain mix-blend-screen brightness-125"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAH2xfc-R_2DFcWqiv9XQqLKai2j9ASEHYBw7NgccxjFA3_pA_GpSJm_bzSHM9MpMcgrFqrQ5YyO24MX19BbTU8RcDiFLbobC-9qPyAjqtrCGNVylRqwhMlwB_cZK59V4X_562P61Uz9QfHzItUnN9tNHF56zzM4R9swIX_-1ZVjd66RncUWfJ1hGKR_b2jusqh23Jk42RDudBehVA0ZhhYKBqrMGQ_yH4gwX30NClfyPv41m1_xiqrdJCDORDMNwBZK4_xjKH6w"
                />
                <p className="mt-8 font-mono text-[#efbf70] tracking-[0.4em] text-sm md:text-lg">{code}</p>
              </div>

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
                  className="rounded-full border border-[#4f4440]/30 py-5 px-8 text-[#e2bfb2] font-bold text-sm uppercase tracking-widest hover:bg-white/5 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Share2 size={20} />
                  Share
                </button>
              </div>
            </div>

            {/* Helper Text */}
            <p className="mt-6 text-center text-xs text-[#d3c3be] italic px-4">
              Problems redeeming? Contact our concierge at <span className="text-[#efbf70] underline cursor-pointer">concierge@balpro.life</span> or show this screen to a store manager.
            </p>
          </div>
        </section>

        {/* Redemption Steps */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 mb-24 bg-[#221a17] rounded-xl relative z-10">
          <h3 className="font-['Epilogue'] text-3xl font-bold mb-16 text-center">How to Claim</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-16 h-16 rounded-full bg-[#3c332f] flex items-center justify-center mx-auto mb-6 border border-[#4f4440]/20 group-hover:border-[#efbf70]/40 transition-colors">
                <MapPin size={28} className="text-[#efbf70]" />
              </div>
              <h4 className="font-bold mb-4">Find a Boutique</h4>
              <p className="text-sm text-[#d3c3be] leading-relaxed">Visit any authorized Velvet Cocoa or Balpro Life retail location.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 rounded-full bg-[#3c332f] flex items-center justify-center mx-auto mb-6 border border-[#4f4440]/20 group-hover:border-[#efbf70]/40 transition-colors">
                <Qr size={28} className="text-[#efbf70]" />
              </div>
              <h4 className="font-bold mb-4">Present Code</h4>
              <p className="text-sm text-[#d3c3be] leading-relaxed">Show your unique QR code to the staff during checkout.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 rounded-full bg-[#3c332f] flex items-center justify-center mx-auto mb-6 border border-[#4f4440]/20 group-hover:border-[#efbf70]/40 transition-colors">
                <Celebration size={28} className="text-[#efbf70]" />
              </div>
              <h4 className="font-bold mb-4">Enjoy the Ritual</h4>
              <p className="text-sm text-[#d3c3be] leading-relaxed">Receive your premium Cacao Gold Tetra Pack and elevate your wellness.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RedemptionPage;
