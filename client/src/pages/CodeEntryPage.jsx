import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Loader } from 'lucide-react';
import { codesAPI } from '../utils/rewardApi.js';

const CodeEntryPage = () => {
  const [codeInput, setCodeInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formatCode = (value) => {
    const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 12);
    if (cleaned.length <= 4) return cleaned;
    if (cleaned.length <= 8) return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}-${cleaned.slice(8)}`;
  };

  const handleInputChange = (e) => {
    // Allow letters and digits, then normalize to XXXX-XXXX-XXXX format.
    const value = e.target.value;
    setCodeInput(formatCode(value));
    setError('');
  };

  const handleKeyDown = (e) => {
    // Allow alphanumeric keys and basic editing/navigation keys.
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'];
    const isAlphaNumericKey = /^[a-zA-Z0-9]$/.test(e.key);
    
    if (!isAlphaNumericKey && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
    
    if (e.key === 'Enter' && !loading) {
      handleReveal();
    }
  };

  const handleReveal = async () => {
    setError('');
    setLoading(true);

    try {
      const cleanedCode = codeInput.toUpperCase().replace(/[^A-Z0-9]/g, '');

      if (cleanedCode.length !== 12) {
        setError('Please enter a valid 12-character code');
        return;
      }

      const formattedCode = formatCode(cleanedCode);
      const response = await codesAPI.verifyCode(formattedCode);

      if (response.success) {
       // Code verified! Redirect to game screen
       if (response.code === 'CODE_VERIFIED') {
         navigate('/play-game', {
           state: {
             code: formattedCode,
           },
         });
       } else {
         setError('Unexpected response from server');
       }

        setCodeInput('');
      } else {
        setError(response.message || 'Failed to verify code');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while verifying your code');
      console.error('Code verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-tertiary/30">
      <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 py-16">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-tertiary/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary-container/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="mb-12 text-center z-10">
          <span className="text-tertiary font-label text-xs tracking-[0.3em] uppercase mb-4 block">Access the Ritual</span>
          <h1 className="font-headline text-5xl md:text-7xl font-black text-on-surface tracking-tighter leading-none mb-2">
            BALPRO <span className="text-tertiary">LIFE</span>
          </h1>
          <p className="font-body text-primary-fixed-dim/70 text-lg md:text-xl max-w-md mx-auto">
            Enter your unique code to unlock the sanctuary.
          </p>
        </div>

        <section className="w-full max-w-xl rounded-xl p-8 md:p-16 relative z-10 shadow-2xl overflow-hidden bg-[rgba(34,26,23,0.6)] backdrop-blur-xl border border-outline-variant/20">
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(90deg,transparent,rgba(239,191,112,0.1),transparent)] bg-size-[200%_100%] animate-[shimmer_2s_linear_infinite]"></div>

          <div className="relative z-20 flex flex-col items-center">
            <div className="text-center mb-10">
              <h2 className="font-headline text-2xl font-bold text-on-surface mb-2">Unique Ritual Code</h2>
              <div className="flex items-center justify-center gap-2 group/tooltip cursor-help relative">
                <span className="text-primary-fixed-dim/60 text-sm">Where is my code?</span>
                <span className="material-symbols-outlined text-sm text-tertiary">help</span>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[110%] w-64 p-6 bg-[rgba(34,26,23,0.95)] backdrop-blur-xl border border-outline-variant/20 rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 pointer-events-none text-left">
                  <p className="text-on-surface text-sm leading-relaxed">
                    Your unique 12-digit ritual code can be found inside the foil lid of any limited edition <span className="text-tertiary">Balpro Cacao</span> canister.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full mb-4">
              <div className="relative group">
                <input
                  value={codeInput}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-surface-container-lowest/50 border-0 border-b-2 border-outline-variant/30 text-center text-3xl md:text-4xl font-headline font-bold text-tertiary py-6 tracking-[0.2em] focus:ring-0 focus:border-tertiary transition-all placeholder:text-outline-variant/30 uppercase"
                  maxLength="14"
                  placeholder="BPR-XXXX-XXXX"
                  type="text"
                  inputMode="text"
                  pattern="[A-Za-z0-9\-]*"
                />
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-focus-within:w-full bg-linear-to-r from-transparent via-tertiary to-transparent transition-all duration-500"></div>
              </div>
            </div>

            <p className="w-full text-center text-sm text-primary-fixed-dim/60 mb-6">
              {codeInput.toUpperCase().replace(/[^A-Z0-9]/g, '').length}/12 characters entered
            </p>

            {error && (
              <div className="w-full mb-6 flex items-center justify-center gap-2 text-red-300 text-sm bg-red-950/40 border border-red-500/30 rounded-lg py-3 px-4">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <button
              onClick={handleReveal}
              disabled={loading}
              className="w-full bg-[#efbf70] text-[#2a170f] font-headline font-extrabold py-5 rounded-full text-lg tracking-widest hover:bg-[#f5ca81] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#efbf70]/20 border border-[#a77e36]/40 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader size={20} className="animate-spin" />
                  VERIFYING...
                </span>
              ) : (
                'VERIFY MY CODE'
              )}
            </button>

            <div className="mt-8 flex items-center gap-6 text-xs text-outline font-label tracking-widest uppercase">
              <Link className="hover:text-tertiary transition-colors" to="/contact">Help Center</Link>
              <div className="w-1 h-1 bg-outline-variant rounded-full"></div>
              <Link className="hover:text-tertiary transition-colors" to="/products">Buy Balpro</Link>
            </div>
          </div>

          <div className="absolute -bottom-12 -right-12 w-32 h-32 opacity-10 rotate-12 pointer-events-none">
            <span className="material-symbols-outlined text-[120px] text-tertiary">auto_awesome</span>
          </div>
        </section>

        <div className="mt-16 text-center max-w-xs z-10">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-px bg-outline-variant/30"></div>
            <p className="font-body text-primary-fixed-dim/40 text-xs leading-relaxed">
              Designed for the intentional consumer.
              <br />
              Experience the pour, embrace the ritual.
            </p>
          </div>
        </div>

        <div className="fixed inset-0 z-[-1] opacity-30 grayscale contrast-125 mix-blend-overlay pointer-events-none">
          <img
            alt="Luxury dark chocolate texture"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3QjCQjjfzunJN-polI2W6P5k7-8glyjm2OVG2xfSatL8g5HfsHEzLD3yqpT1byFuaku-CcFoJS0SrP_vsYW0MpjBmfIDO1fwjgJIBJHwhqGASBGgVaZGW8xsIJXM7J0xMMT_sSAqDe4EwWnCrcxvDcCfX1ouhEntNRIX2qSj32kk5EfZX9y_LhGdfH2eMt1C9JUoylinUlU12cGx98GPi2fTIRZnCbdd0-sHazn4AH5ZcWroR4LBcUABPHMzUlgfEMp-r4DUoEA"
          />
        </div>
      </main>

      <footer className="w-full py-12 px-8 bg-surface-container-low grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-outline-variant/15">
        <div>
          <p className="text-lg font-bold text-primary-fixed-dim uppercase tracking-tighter">Balpro Life</p>
          <p className="font-body text-sm text-outline mt-2">© 2024 Balpro Life. The Liquid Curator.</p>
        </div>
        <div className="flex flex-wrap gap-6 md:justify-end">
          <a className="text-sm font-body text-outline hover:text-tertiary transition-colors" href="#">Privacy Policy</a>
          <a className="text-sm font-body text-outline hover:text-tertiary transition-colors" href="#">Terms of Play</a>
          <a className="text-sm font-body text-outline hover:text-tertiary transition-colors" href="#">Ingredients</a>
        </div>
      </footer>
    </div>
  );
};

export default CodeEntryPage;
