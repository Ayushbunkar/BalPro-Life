import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Keyboard, Gift } from 'lucide-react';

const CodeEntryPage = () => {
  const [codeInput, setCodeInput] = useState('');
  const navigate = useNavigate();

  const handleReveal = () => {
    if (codeInput.replace(/\s/g, '').length === 12) {
      navigate('/redemption', { state: { code: codeInput } });
      setCodeInput('');
    } else {
      alert('Please enter a valid 12-digit code');
    }
  };

  const formatCode = (value) => {
    const cleaned = value.replace(/\D/g, '').substring(0, 12);
    if (cleaned.length <= 4) return cleaned;
    if (cleaned.length <= 8) return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}-${cleaned.slice(8)}`;
  };

  const handleInputChange = (e) => {
    setCodeInput(formatCode(e.target.value));
  };

  return (
    <div className="bg-[#140d0a] text-[#efdfd9] font-body selection:bg-tertiary selection:text-on-tertiary overflow-x-hidden">
      {/* Main Entry Portal Canvas */}
      <main className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 bg-gradient-to-b from-[#3c332f] via-[#140d0a] to-[#140d0a] overflow-hidden">
        {/* Floating Ambient Particles */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#efbf70] rounded-full blur-sm"></div>
          <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-[#ffdead] rounded-full blur-md"></div>
          <div className="absolute top-1/2 right-1/2 w-1 h-1 bg-white rounded-full"></div>
        </div>

        <div className="max-w-4xl w-full flex flex-col items-center gap-12 relative z-10">
          {/* Hero Container: Glassmorphism Card */}
          <section className="glass-panel w-full rounded-xl p-8 md:p-16 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] text-center relative overflow-hidden bg-[#261e1a]/60 backdrop-blur-[20px] border border-[#efbf70]/15">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#efbf70] to-[#a77e36] opacity-50"></div>

            <header className="mb-10 space-y-4">
              <span className="text-[#efbf70] font-['Epilogue'] font-bold tracking-[0.2em] text-xs uppercase block">Access The Treasury</span>
              <h1 className="text-4xl md:text-6xl font-['Epilogue'] font-extrabold tracking-tight text-[#efdfd9] leading-tight">
                Enter Your <span className="text-[#efbf70]">Ritual Code</span>
              </h1>
              <p className="text-[#d3c3be] max-w-xl mx-auto text-lg font-light leading-relaxed">
                Peel back the label of your Cacao Gold elixir to reveal your unique 12-digit sequence.
              </p>
            </header>

            <div className="max-w-md mx-auto space-y-8">
              {/* Input Field */}
              <div className="group relative">
                <input
                  value={codeInput}
                  onChange={handleInputChange}
                  onKeyPress={(e) => e.key === 'Enter' && handleReveal()}
                  className="w-full bg-[#3c332f] border-2 border-[#4f4440] rounded-lg py-6 px-4 text-lg md:text-xl text-center font-['Epilogue'] font-bold tracking-wider text-[#efbf70] placeholder:text-[#9c8e89]/30 focus:outline-none focus:border-[#efbf70] focus:ring-4 focus:ring-[#efbf70]/10 transition-all duration-500 uppercase overflow-hidden"
                  maxLength="14"
                  placeholder="XXXX-XXXX-XXXX"
                  type="text"
                />
                <div className="absolute -inset-1 rounded-lg bg-[#efbf70]/20 blur opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
              </div>

              {/* Primary Action */}
              <button
                onClick={handleReveal}
                className="gold-shimmer w-full py-5 rounded-full font-['Epilogue'] font-bold text-[#432c00] text-xl tracking-wide shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                Reveal My Reward
              </button>

              {/* Secondary Action */}
              <a className="inline-block text-[#d3c3be] hover:text-[#efbf70] transition-colors text-sm underline underline-offset-4 cursor-pointer">
                I can't read my code
              </a>
            </div>
          </section>

          {/* Quick Guide Bento Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
            <div className="bg-[#221a17] p-6 rounded-lg flex flex-col items-center text-center gap-4 transition-all hover:bg-[#261e1a]">
              <div className="w-12 h-12 rounded-full bg-[#3c332f] flex items-center justify-center text-[#efbf70]">
                <Search size={24} />
              </div>
              <div>
                <h3 className="font-['Epilogue'] font-bold text-[#efdfd9]">Find Code</h3>
                <p className="text-sm text-[#d3c3be] mt-1">Check beneath the golden wax seal</p>
              </div>
            </div>

            <div className="bg-[#221a17] p-6 rounded-lg flex flex-col items-center text-center gap-4 transition-all hover:bg-[#261e1a]">
              <div className="w-12 h-12 rounded-full bg-[#3c332f] flex items-center justify-center text-[#efbf70]">
                <Keyboard size={24} />
              </div>
              <div>
                <h3 className="font-['Epilogue'] font-bold text-[#efdfd9]">Enter Code</h3>
                <p className="text-sm text-[#d3c3be] mt-1">Submit your unique 12-digit key</p>
              </div>
            </div>

            <div className="bg-[#221a17] p-6 rounded-lg flex flex-col items-center text-center gap-4 transition-all hover:bg-[#261e1a]">
              <div className="w-12 h-12 rounded-full bg-[#3c332f] flex items-center justify-center text-[#efbf70]">
                <Gift size={24} />
              </div>
              <div>
                <h3 className="font-['Epilogue'] font-bold text-[#efdfd9]">Win Rare Cacao</h3>
                <p className="text-sm text-[#d3c3be] mt-1">Unlock exclusive ritual blends</p>
              </div>
            </div>
          </section>
        </div>

        {/* Background Imagery (Asymmetric) */}
        <div className="absolute -right-24 bottom-0 w-96 h-[600px] pointer-events-none hidden lg:block opacity-40 mix-blend-screen">
          <img
            alt="Premium Dark Chocolate"
            className="w-full h-full object-cover rounded-tl-[10rem]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2RwT0FtIUnqiva_TfsgK19lAYI7O0qeqLymCs9oE3KiQ9DYPqYRmKuWWC3_XAmu3gYUi8Beb0wjxHPEQBeFgJPtuIu_9yEYeTf_5mjjsSzfKR_EAOdlPgDoQc2teTm7bRncVwc-oJuDSRS5VF9Mbe4FFoVXpx7sGzoGxg2Xf9mF6Y4017tuo6pdd1l77fUfgOvnc22PuPhX4zzxarf7HIpDqyMyUvrCXKtJTXNT-dMsxzyPUQ6QnHKYmMyNDF1wG_wq0HVaxChw"
          />
        </div>

        <div className="absolute -left-24 top-24 w-64 h-64 pointer-events-none opacity-20 blur-2xl bg-[#efbf70] rounded-full"></div>
      </main>
    </div>
  );
};

export default CodeEntryPage;
