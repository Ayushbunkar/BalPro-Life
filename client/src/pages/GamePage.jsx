import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dices, ArrowRight, AlertCircle, Loader } from 'lucide-react';
import { codesAPI } from '../utils/rewardApi.js';

const GamePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const code = location.state?.code;

  const [userNumber, setUserNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hoveredNumber, setHoveredNumber] = useState(null);
  const numberGridRef = useRef(null);

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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && userNumber && !loading) {
      handlePlayGame();
    }
  };

  // Generate number grid (1-100)
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <div className="bg-[#140d0a] text-[#efdfd9] font-body selection:bg-tertiary selection:text-on-tertiary min-h-screen pt-24 pb-12">
      <main className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <section className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#3c332f]/50 border border-[#4f4440]/15 mb-4">
            <span className="text-[#efbf70] font-label text-xs uppercase tracking-widest font-bold">
              Step 2: Play the Game
            </span>
          </div>

          <h1 className="font-['Epilogue'] text-5xl md:text-6xl font-black tracking-tighter">
            Spin the <span className="text-[#efbf70]">Lucky Wheel</span>
          </h1>

          <p className="text-[#d3c3be] max-w-2xl mx-auto text-lg">
            Select a number between 1 and 100. If your number matches the winning number, you'll win a premium reward! 🎯
          </p>

          {/* Code verification badge */}
          <div className="bg-green-950/30 border border-green-500/30 rounded-lg py-3 px-4 inline-block mt-4">
            <p className="text-green-300 text-sm font-bold">
              ✅ Code Verified: <span className="font-mono">{code}</span>
            </p>
          </div>
        </section>

        {/* Number Grid */}
        <div className="mb-12 bg-[#261e1a]/70 backdrop-blur-[20px] rounded-xl p-8 border border-[#4f4440]/15">
          <p className="text-center text-[#d3c3be] text-sm uppercase tracking-wider font-bold mb-8">
            Select Your Lucky Number
          </p>

          <div
            ref={numberGridRef}
            className="grid grid-cols-5 md:grid-cols-10 gap-3 md:gap-4 mb-8"
          >
            {numbers.map((num) => (
              <button
                key={num}
                onClick={() => handleNumberSelect(num)}
                onMouseEnter={() => setHoveredNumber(num)}
                onMouseLeave={() => setHoveredNumber(null)}
                className={`relative group aspect-square rounded-lg font-bold text-lg transition-all duration-300 ${
                  userNumber === num.toString()
                    ? 'bg-[#efbf70] text-[#432c00] ring-4 ring-[#efbf70]/50 shadow-lg'
                    : hoveredNumber === num
                    ? 'bg-[#4f4440] text-[#efbf70] ring-2 ring-[#efbf70]/30'
                    : 'bg-[#3c332f] text-[#efdfd9] border border-[#4f4440]/30'
                }`}
              >
                {num}
                {userNumber === num.toString() && (
                  <div className="absolute inset-0 rounded-lg bg-[#efbf70]/20 blur-md -z-10"></div>
                )}
              </button>
            ))}
          </div>

          {/* Selected Number Display */}
          <div className="text-center space-y-4">
            <div className="bg-[#1a1410] rounded-lg p-6 border border-[#4f4440]/30">
              <p className="text-[#d3c3be] text-sm uppercase tracking-wider mb-2">Your Selected Number</p>
              <p className="font-['Epilogue'] text-5xl md:text-6xl font-black text-[#efbf70]">
                {userNumber || '--'}
              </p>
            </div>

            {error && (
              <div className="flex items-center justify-center gap-2 text-red-300 text-sm bg-red-950/40 border border-red-500/30 rounded-lg py-3 px-4">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/enter-code')}
            disabled={loading}
            className="rounded-full border border-[#4f4440]/30 py-5 px-8 text-[#e2bfb2] font-bold text-lg uppercase tracking-widest hover:bg-white/5 active:scale-95 transition-all duration-300"
          >
            Go Back
          </button>

          <button
            onClick={handlePlayGame}
            disabled={!userNumber || loading}
            className="rounded-full gold-shimmer py-5 px-12 text-[#432c00] font-bold text-lg uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <Loader size={20} className="animate-spin" />
                Playing...
              </>
            ) : (
              <>
                <Dices size={20} />
                Play & Reveal Result
              </>
            )}
          </button>
        </div>

        {/* Info Section */}
        <section className="mt-20 bg-[#221a17] rounded-xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#3c332f] flex items-center justify-center text-[#efbf70] mx-auto mb-4">
                🎯
              </div>
              <h3 className="font-bold mb-2">50/50 Chance</h3>
              <p className="text-sm text-[#d3c3be]">Every number has equal probability of winning</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#3c332f] flex items-center justify-center text-[#efbf70] mx-auto mb-4">
                🏆
              </div>
              <h3 className="font-bold mb-2">Limited Rewards</h3>
              <p className="text-sm text-[#d3c3be]">Only matching numbers win premium rewards</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#3c332f] flex items-center justify-center text-[#efbf70] mx-auto mb-4">
                ⏱️
              </div>
              <h3 className="font-bold mb-2">One Try Per Code</h3>
              <p className="text-sm text-[#d3c3be]">Each bottle code can only be played once</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default GamePage;
