import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import UserSidebar from './UserSidebar';
import { authAPI } from '../../../utils/api';
import bottleChocolateImage from '../../../assets/bottleechoclate.jpg';
import vanillaChocolateImage from '../../../assets/vanillachoclate.jpg';

const formatDate = (value) => {
  if (!value) return 'N/A';
  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const resolveRewardImage = (rawUrl, rewardKey) => {
  const source = String(rawUrl || '').trim();
  const fallback = rewardKey === 'VANILLA_SINGLE' ? vanillaChocolateImage : bottleChocolateImage;
  if (!source) return fallback;
  if (/^https?:\/\//i.test(source)) return source;

  if (source.startsWith('/uploads/')) {
    if (typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname)) {
      return `http://localhost:5000${source}`;
    }
    return source;
  }

  if (source.startsWith('/assets/')) {
    return fallback;
  }

  return source || fallback;
};

const UserRewards = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dashboardData, setDashboardData] = useState(null);
  const [redeemModalOpen, setRedeemModalOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [redeeming, setRedeeming] = useState(false);
  const [redeemMessage, setRedeemMessage] = useState('');

  const loadDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await authAPI.getLoyaltyDashboard();
      setDashboardData(res?.data || null);
    } catch (err) {
      setError(err?.message || 'Unable to load rewards data right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const summary = dashboardData?.summary || {
    currentPoints: 0,
    lifetimePoints: 0,
    freeDrinkThreshold: 100,
    redeemableFreeDrinks: 0,
    currentCyclePoints: 0,
    progressPercent: 0,
    nextMilestone: 100,
    pointsToNextMilestone: 100,
  };

  const availableRewards = dashboardData?.availableRewards || [];
  const rewardHistory = dashboardData?.rewardHistory || [];

  const circleDashArray = 552.92;
  const circleDashOffset = useMemo(() => {
    const clamped = Math.max(0, Math.min(100, Number(summary.progressPercent || 0)));
    return circleDashArray - (circleDashArray * clamped / 100);
  }, [summary.progressPercent]);

  const openRedeemModal = () => {
    setRedeemMessage('');
    setSelectedReward(availableRewards[0] || null);
    setRedeemModalOpen(true);
  };

  const handleRedeem = async () => {
    if (!selectedReward) return;

    setRedeeming(true);
    setRedeemMessage('');
    try {
      const res = await authAPI.redeemFreeDrink({ rewardItem: selectedReward.rewardKey });
      const code = res?.data?.redemptionCode || 'N/A';
      setRedeemMessage(`Redeemed successfully. Use code: ${code}`);
      await loadDashboardData();
    } catch (err) {
      setRedeemMessage(err?.message || 'Unable to redeem now. Please try again.');
    } finally {
      setRedeeming(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <UserSidebar />

      <main className="md:ml-72 min-h-screen p-12 bg-surface">
        <header className="flex justify-between items-end mb-16">
          <div>
            <span className="text-tertiary font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">Loyalty Program</span>
            <h2 className="text-6xl font-black font-headline tracking-tighter leading-none">Liquid Gold Rewards</h2>
          </div>
          <div className="text-right">
            <p className="text-primary-fixed-dim text-sm uppercase tracking-widest mb-1">Status</p>
            <p className="text-2xl font-bold font-headline text-tertiary">Loyal Member</p>
          </div>
        </header>

        {loading && <div className="rounded-xl bg-surface-container-low p-8 text-primary-fixed-dim mb-8">Loading rewards dashboard...</div>}
        {!loading && error && <div className="rounded-xl bg-surface-container-low p-8 text-error mb-8">{error}</div>}

        <div className="grid grid-cols-12 gap-8 mb-24">
          <div className="col-span-12 lg:col-span-7 relative overflow-hidden rounded-xl bg-surface-container-low p-12 flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-tertiary/5 rounded-full blur-[100px] -mr-32 -mt-32 transition-all group-hover:bg-tertiary/10"></div>
            <div>
              <p className="text-primary-fixed-dim uppercase tracking-widest text-xs mb-2">Available Balance</p>
              <div className="flex items-baseline gap-4">
                <span className="text-8xl font-black font-headline tracking-tighter text-tertiary">{Number(summary.currentPoints || 0).toLocaleString('en-IN')}</span>
                <span className="text-2xl font-bold text-on-surface-variant uppercase tracking-widest">Points</span>
              </div>
            </div>
            <div className="mt-12 flex gap-8">
              <button
                className="bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] text-on-tertiary px-8 py-4 rounded-full font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={openRedeemModal}
                disabled={Number(summary.currentPoints || 0) < Number(summary.freeDrinkThreshold || 100)}
                type="button"
              >
                <span className="material-symbols-outlined text-sm">redeem</span>
                Redeem Now
              </button>
              <div className="border border-outline-variant/30 text-on-surface px-6 py-4 rounded-full text-sm font-bold">
                Lifetime: {Number(summary.lifetimePoints || 0).toLocaleString('en-IN')} pts
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 rounded-xl bg-surface-container-high p-12 flex flex-col items-center justify-center relative group">
            <div className="relative w-48 h-48 mb-8">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 192 192">
                <circle className="text-surface-variant" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="8"></circle>
                <circle className="text-tertiary" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeDasharray={circleDashArray} strokeDashoffset={circleDashOffset} strokeLinecap="round" strokeWidth="8"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black font-headline">{Number(summary.progressPercent || 0)}%</span>
                <span className="text-[10px] uppercase tracking-widest text-primary-fixed-dim">To Free Drink</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium mb-1">{Number(summary.pointsToNextMilestone || 0)} points to next free drink</p>
              <p className="text-xs text-primary-fixed-dim leading-relaxed">Rule: every {Number(summary.freeDrinkThreshold || 100)} points = 1 free drink</p>
            </div>
          </div>
        </div>

        <section className="mb-24">
          <div className="flex justify-between items-end mb-12">
            <h3 className="text-3xl font-black font-headline tracking-tight">Available Rewards</h3>
            <Link className="text-tertiary text-sm font-bold uppercase tracking-widest hover:underline" to="/products">View Products</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {availableRewards.map((item) => (
              <div key={item.rewardKey} className="group rounded-lg bg-surface-container-low overflow-hidden hover:-translate-y-2 transition-all duration-500">
                <div className={`h-64 overflow-hidden relative flex items-center justify-center ${item.rewardKey === 'VANILLA_SINGLE' ? 'bg-[#6f532f]' : 'bg-[#4a342d]'}`}>
                  {item.rewardKey === 'VANILLA_SINGLE' && (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_44%,rgba(255,234,186,0.26),transparent_58%)]"></div>
                  )}
                  <img
                    alt=""
                    aria-hidden="true"
                    className={`absolute inset-0 w-full h-full object-cover scale-110 blur-[3px] opacity-55 ${item.rewardKey === 'VANILLA_SINGLE' ? 'object-[60%_center] saturate-110' : 'object-center'}`}
                    src={resolveRewardImage(item.image, item.rewardKey)}
                  />
                  <img
                    alt={item.title}
                    className={`relative z-10 w-full h-full transition-all duration-700 ${item.rewardKey === 'VANILLA_SINGLE' ? 'object-contain scale-[1.08] object-[58%_center] drop-shadow-[0_14px_28px_rgba(0,0,0,0.30)]' : 'object-contain object-center'}`}
                    src={resolveRewardImage(item.image, item.rewardKey)}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = item.rewardKey === 'VANILLA_SINGLE' ? vanillaChocolateImage : bottleChocolateImage;
                    }}
                  />
                  <div className={`absolute inset-0 ${item.rewardKey === 'VANILLA_SINGLE' ? 'bg-[linear-gradient(180deg,rgba(201,160,93,0.34)_0%,rgba(20,12,8,0.18)_100%)]' : 'bg-[linear-gradient(180deg,rgba(112,84,74,0.30)_0%,rgba(20,12,8,0.26)_100%)]'}`}></div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4 gap-3">
                    <h4 className="text-xl font-bold font-headline leading-tight">{item.title}</h4>
                    <span className="text-tertiary font-bold shrink-0">{item.pointsRequired} pts</span>
                  </div>
                  <p className="text-sm text-primary-fixed-dim mb-8">{item.description}</p>
                  <button
                    type="button"
                    className="w-full border border-outline-variant/20 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] group-hover:bg-tertiary group-hover:text-on-tertiary transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={!item.canRedeem}
                    onClick={() => {
                      setSelectedReward(item);
                      setRedeemModalOpen(true);
                      setRedeemMessage('');
                    }}
                  >
                    {item.canRedeem ? 'Redeem' : `Need ${item.pointsRequired} Points`}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl">
          <div className="flex justify-between items-end mb-12">
            <h3 className="text-3xl font-black font-headline tracking-tight">Reward History</h3>
            <span className="text-primary-fixed-dim text-[10px] uppercase tracking-widest">Live from your account</span>
          </div>
          <div className="space-y-4">
            {rewardHistory.length === 0 && (
              <div className="p-6 rounded-xl bg-surface-container-low text-primary-fixed-dim">No reward activity yet. Complete a payment to start earning points.</div>
            )}
            {rewardHistory.map((row) => {
              const isEarned = row.type === 'EARNED';
              const displayValue = `${isEarned ? '+' : ''}${row.pointsChange} pts`;
              const valueClass = isEarned ? 'text-tertiary' : 'text-on-surface-variant';
              const icon = isEarned ? 'shopping_basket' : 'redeem';
              const iconBg = isEarned ? 'bg-tertiary/10' : 'bg-primary-container';
              const iconClass = isEarned ? 'text-tertiary' : 'text-primary';

              return (
              <div key={row.id} className="flex items-center justify-between p-6 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center`}>
                    <span className={`material-symbols-outlined ${iconClass}`}>{icon}</span>
                  </div>
                  <div>
                    <p className="font-bold">{row.label}</p>
                    <p className="text-xs text-primary-fixed-dim uppercase tracking-tighter">{formatDate(row.date)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-black font-headline ${valueClass}`}>{displayValue}</p>
                  <p className="text-[10px] text-primary-fixed-dim uppercase tracking-widest">{row.sub}</p>
                </div>
              </div>
            );})}
          </div>
        </section>

        {redeemModalOpen && (
          <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setRedeemModalOpen(false)}>
            <div className="w-full max-w-xl rounded-xl bg-surface-container-low border border-outline-variant/20 shadow-2xl" onClick={(event) => event.stopPropagation()}>
              <div className="px-6 py-5 border-b border-outline-variant/20 flex items-center justify-between">
                <h3 className="font-headline text-2xl font-bold text-on-surface">Redeem Free Drink</h3>
                <button type="button" className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface" onClick={() => setRedeemModalOpen(false)}>
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-sm text-primary-fixed-dim">Choose one single bottle reward. Cost: {summary.freeDrinkThreshold} points.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableRewards.map((reward) => (
                    <button
                      key={reward.rewardKey}
                      type="button"
                      className={`p-4 rounded-lg border text-left transition-all ${selectedReward?.rewardKey === reward.rewardKey ? 'border-tertiary bg-surface-container-high' : 'border-outline-variant/20 bg-surface-container-highest'}`}
                      onClick={() => setSelectedReward(reward)}
                    >
                      <p className="font-bold text-on-surface">{reward.title}</p>
                      <p className="text-xs text-primary-fixed-dim mt-1">{reward.pointsRequired} points</p>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="w-full bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] text-on-tertiary py-3 rounded-full font-bold disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={handleRedeem}
                  disabled={redeeming || !selectedReward || Number(summary.currentPoints || 0) < Number(summary.freeDrinkThreshold || 100)}
                >
                  {redeeming ? 'Redeeming...' : 'Confirm Redeem'}
                </button>

                {redeemMessage && <p className="text-sm text-primary-fixed-dim">{redeemMessage}</p>}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserRewards;
