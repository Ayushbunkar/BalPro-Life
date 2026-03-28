import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertCircle, Loader } from 'lucide-react';
import { codesAPI } from '../utils/rewardApi.js';

const GamePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const code = location.state?.code;

  const [userNumber, setUserNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if no code
  useEffect(() => {
    if (!code) {
      navigate('/enter-code');
    }
  }, [code, navigate]);

  const handleNumberSelect = (num) => {
    setUserNumber(num.toString());
    setError('');
  };

  const handlePlayGame = async () => {
    if (!userNumber) {
      setError('Please select a number to play');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const selectedNumber = parseInt(userNumber, 10);

      // Call game API
      const response = await codesAPI.playGame({
        code,
        userNumber: selectedNumber
      });

      if (response.success) {
        if (response.code === 'WIN') {
          // User won - redirect to result page
          navigate('/game-result', {
            state: {
              result: 'win',
              gameData: response.data,
              code
            }
          });
        } else if (response.code === 'LOSE') {
          // User lost - redirect to result page
          navigate('/game-result', {
            state: {
              result: 'lose',
              gameData: response.data,
              code
            }
          });
        }
      } else {
        setError(response.message || 'Failed to play game');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
      console.error('Game play error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Generate number grid (1-100)
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-tertiary selection:text-on-tertiary min-h-screen">
      <main className="relative min-h-screen pt-8 pb-24 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[60%] bg-tertiary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-surface-container-high text-tertiary font-bold text-xs tracking-[0.2em] mb-6 uppercase">
              The Ritual Game
            </span>
            <h1 className="font-headline text-5xl md:text-7xl font-black text-on-surface tracking-tighter leading-none mb-8">
              Pick Your <span className="text-tertiary">Lucky Number</span>
            </h1>
            <p className="text-primary-fixed-dim text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Manifest your indulgence. Select the digit that speaks to your soul and reveal if the gods of cacao are in your favor today.
            </p>
            <div className="mt-6 inline-flex bg-emerald-950/30 border border-emerald-500/30 rounded-lg py-3 px-4">
              <p className="text-emerald-300 text-sm font-bold">Code Verified: <span className="font-mono">{code}</span></p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-7xl mx-auto">
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="bg-surface-container-low rounded-xl p-2 relative group overflow-hidden h-full min-h-[400px]">
                <img
                  alt="Luxury chocolate drink being poured"
                  className="w-full h-full object-cover rounded-lg saturate-125 contrast-110 brightness-105 transition-all duration-700 scale-110 group-hover:scale-100"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9Qji6Q_J_K7pKkGIQXN_Ve97lwU_dijyPHO8pwVQ6HUnORPVgyDYZinfbhCP7XK4hHy72xrasgnRVj20qrQJDIcQFgZ9eoLNcsZ37eOFvgNxb_blS87yu2U3DHWoJzxleA4QfqrmNIjAUhmTJhI1zHeINg2PCiYdpHiSSqF5mxWfXRMbbj_tujtDQtNp_990aS4ogrzV7Va63yZ0KSDG6OGq6yFsZyeXjDtyiNuZrCoT1UGAYadD4JSR4OC7kPNi6mVYzTrQ0nw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-surface to-transparent opacity-60"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="font-headline text-2xl font-bold text-tertiary mb-2">The Liquid Cure</h3>
                  <p className="text-on-surface-variant text-sm">Winning unlocks our exclusive 85% Dark Reserve batch.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="bg-surface-container-low rounded-xl p-8 md:p-12 border border-outline-variant/15 relative">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                  <div>
                    <h2 className="font-headline text-3xl font-bold text-on-surface">Choose Wisely</h2>
                    <p className="text-on-surface-variant text-sm mt-1">Select 1 number from 100 available slots.</p>
                  </div>
                  <div className="flex items-center gap-2 bg-surface-container-high px-4 py-2 rounded-full border border-outline-variant/30">
                    <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                    <span className="text-tertiary font-bold text-sm tracking-widest uppercase">Premium Entry</span>
                  </div>
                </div>

                <div className="grid grid-cols-5 sm:grid-cols-10 gap-3 md:gap-4 max-h-[400px] overflow-y-auto pr-2 [scrollbar-width:thin] [scrollbar-color:#efbf70_#221a17]">
                  {numbers.map((num) => {
                    const isSelected = userNumber === num.toString();
                    return (
                      <button
                        key={num}
                        onClick={() => handleNumberSelect(num)}
                        className={`aspect-square flex items-center justify-center rounded-lg text-lg transition-all duration-300 ${isSelected
                          ? 'bg-tertiary text-on-tertiary scale-110 shadow-lg shadow-tertiary/20 font-black'
                          : 'bg-surface-container-highest border border-outline-variant/20 hover:border-tertiary hover:bg-tertiary/10 hover:text-tertiary font-bold'
                        }`}
                      >
                        {num.toString().padStart(2, '0')}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-8 pt-8 border-t border-outline-variant/20">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-black font-headline text-tertiary">{userNumber ? userNumber.padStart(2, '0') : '--'}</div>
                    <div className="h-10 w-px bg-outline-variant/30"></div>
                    <div>
                      <div className="text-xs text-on-primary-fixed uppercase tracking-widest font-bold">Selected Number</div>
                      <div className="text-primary-fixed-dim text-sm italic">The Divine Alchemist</div>
                    </div>
                  </div>

                  <button
                    className="w-full sm:w-auto bg-linear-to-br from-[#efbf70] to-[#a77e36] text-[#432c00] px-12 py-5 rounded-full font-bold text-lg hover:scale-105 hover:brightness-110 transition-all duration-300 active:scale-95 uppercase tracking-tighter disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={handlePlayGame}
                    disabled={!userNumber || loading}
                  >
                    {loading ? (
                      <span className="inline-flex items-center gap-2"><Loader size={18} className="animate-spin" /> Playing...</span>
                    ) : (
                      'Try Your Luck'
                    )}
                  </button>
                </div>

                {error && (
                  <div className="mt-6 flex items-center justify-center gap-2 text-red-300 text-sm bg-red-950/40 border border-red-500/30 rounded-lg py-3 px-4">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="bg-surface-container p-8 rounded-xl flex flex-col gap-4">
              <span className="material-symbols-outlined text-4xl text-tertiary">refresh</span>
              <h4 className="font-headline text-xl font-bold">Daily Rituals</h4>
              <p className="text-on-surface-variant leading-relaxed">Play once every 24 hours to claim rewards ranging from free samples to exclusive glassware.</p>
            </div>
            <div className="bg-surface-container p-8 rounded-xl flex flex-col gap-4">
              <span className="material-symbols-outlined text-4xl text-tertiary">workspace_premium</span>
              <h4 className="font-headline text-xl font-bold">Luxury Stakes</h4>
              <p className="text-on-surface-variant leading-relaxed">Grand prizes include a full year of Balpro Life's signature Obsidian Cacao subscription.</p>
            </div>
            <div className="bg-surface-container p-8 rounded-xl flex flex-col gap-4">
              <span className="material-symbols-outlined text-4xl text-tertiary">diversity_3</span>
              <h4 className="font-headline text-xl font-bold">Live Lobby</h4>
              <p className="text-on-surface-variant leading-relaxed">See what other curators are picking in real-time. Join the global Balpro collective.</p>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default GamePage;
