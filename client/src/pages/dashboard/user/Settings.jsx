import React, { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { authAPI, ordersAPI } from '../../../utils/api';
import UserSidebar from './UserSidebar';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    profession: user?.profession || '',
    ritualFrequencyDays: user?.ritualFrequencyDays || 14,
    isProfessional: !!user?.isProfessional,
  });
  const [loading, setLoading] = useState(false);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [latestOrder, setLatestOrder] = useState(null);
  const [nextShipmentDate, setNextShipmentDate] = useState(user?.nextShipmentDate ? new Date(user.nextShipmentDate) : null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState({
    ritualReminders: true,
    exclusiveCuration: true,
    smsTracking: false,
    wellnessJournaling: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : (name === 'ritualFrequencyDays' ? Number(value) : value) }));
  };

  useEffect(() => {
    const loadSettingsData = async () => {
      setSettingsLoading(true);
      try {
        const ordersRes = await ordersAPI.getUserOrders();
        const orders = Array.isArray(ordersRes?.data) ? ordersRes.data : [];
        const mostRecentOrder = orders[0] || null;
        setLatestOrder(mostRecentOrder);
      } catch (err) {
        console.error('Failed to load settings data:', err);
      } finally {
        setSettingsLoading(false);
      }
    };

    loadSettingsData();
  }, [user?.id]);

  useEffect(() => {
    if (!user?.nextShipmentDate && latestOrder?.createdAt) {
      const base = new Date(latestOrder.createdAt);
      const computed = new Date(base);
      computed.setDate(base.getDate() + Number(form.ritualFrequencyDays || 14));
      setNextShipmentDate(computed);
    }
  }, [latestOrder, form.ritualFrequencyDays, user?.nextShipmentDate]);

  useEffect(() => {
    if (user?.nextShipmentDate) {
      setNextShipmentDate(new Date(user.nextShipmentDate));
    }
  }, [user?.nextShipmentDate]);

  const derivedPaymentMethod = useMemo(() => {
    if (!latestOrder?.paymentMethod) return 'Not Set';
    const map = {
      card: 'Card',
      razorpay: 'Razorpay',
      paypal: 'PayPal',
      bank_transfer: 'Bank Transfer'
    };
    return map[latestOrder.paymentMethod] || latestOrder.paymentMethod;
  }, [latestOrder]);

  const derivedCardLast4 = useMemo(() => {
    const source = latestOrder?.paymentResult?.order_id || latestOrder?.paymentResult?.id || latestOrder?._id || '';
    const compact = String(source).replace(/[^a-zA-Z0-9]/g, '');
    if (!compact) return '0000';
    return compact.slice(-4).toUpperCase();
  }, [latestOrder]);

  const shipmentDateLabel = useMemo(() => {
    if (!nextShipmentDate || Number.isNaN(nextShipmentDate.getTime())) return 'Not Scheduled';
    return nextShipmentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }, [nextShipmentDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // send profile update (support avatar upload via FormData)
      let res;
      if (form.avatarFile) {
        const fd = new FormData();
        fd.append('name', form.name);
        fd.append('email', form.email);
        fd.append('phone', form.phone);
        fd.append('profession', form.profession);
        fd.append('isProfessional', form.isProfessional);
        fd.append('ritualFrequencyDays', String(form.ritualFrequencyDays || 14));
        if (nextShipmentDate) fd.append('nextShipmentDate', nextShipmentDate.toISOString());
        fd.append('avatar', form.avatarFile);
        res = await authAPI.updateProfileForm(fd);
      } else {
        const payload = {
          name: form.name,
          email: form.email,
          phone: form.phone,
          profession: form.profession,
          isProfessional: form.isProfessional,
          ritualFrequencyDays: Number(form.ritualFrequencyDays || 14),
          ...(nextShipmentDate ? { nextShipmentDate: nextShipmentDate.toISOString() } : {})
        };
        res = await authAPI.updateProfile(payload);
      }
      setMessage(res.message || 'Profile updated');
      if (res.data) {
        updateUser(res.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setForm(prev => ({ ...prev, avatarFile: file }));
  };

  const handleReschedule = async () => {
    try {
      setLoading(true);
      setError(null);
      const baseDate = (nextShipmentDate && !Number.isNaN(nextShipmentDate.getTime())) ? new Date(nextShipmentDate) : new Date();
      baseDate.setDate(baseDate.getDate() + Number(form.ritualFrequencyDays || 14));
      const res = await authAPI.updateProfile({
        ritualFrequencyDays: Number(form.ritualFrequencyDays || 14),
        nextShipmentDate: baseDate.toISOString()
      });
      setNextShipmentDate(baseDate);
      if (res?.data) updateUser(res.data);
      setMessage('Next shipment rescheduled successfully');
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to reschedule shipment');
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="bg-surface text-on-surface min-h-screen overflow-x-hidden">
      <UserSidebar />

      <main className="md:ml-72 min-h-screen px-4 pt-8 pb-24 sm:px-6 md:px-10 md:pt-12 md:pb-14 lg:px-14">
        <div className="mx-auto w-full max-w-[1200px]">
        <header className="mb-8 md:mb-12">
          <p className="text-tertiary font-headline text-sm tracking-[0.3em] uppercase mb-4">Account Sanctuary</p>
          <h2 className="text-5xl md:text-6xl font-headline font-black tracking-tighter text-on-surface">Settings</h2>
          {message && <p className="mt-4 text-sm text-green-300">{message}</p>}
          {error && <p className="mt-4 text-sm text-error">{error}</p>}
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-8">
          <section className="xl:col-span-8 bg-surface-container-low rounded-xl p-6 md:p-8 lg:p-10 relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[auto,1fr] gap-8 md:gap-10 items-start">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container-highest">
                  <img alt="User Profile" className="w-full h-full object-cover" src={user?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHtZMA1mNHDiouhNVna3NNLLlUYiXqFpW-bLy4TvvL_3-HhCLlkrETwB5PwjSNkQbYrxu-QNjEbDdcg1gZD7JLJHrEKBPKG_qHgwpiLAU4yyWEVHUdLaqY-AOnMczmfuMOUNp0X0R186vHA5RuI1qRojuLyYBx4ocIDMhTICTZMVJehimLl-IS4Z_cQCoBjqnRaZ_bGoPaLibrYSkg7TFNG-FjJ4YbSSaTEFEIZUD90cuCbj2FMrQj71LBwxhp4ImUnPfI-Sfi3Q'} />
                </div>
                <label className="absolute bottom-0 right-0 bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] p-2 rounded-full text-on-primary shadow-xl cursor-pointer">
                  <span className="material-symbols-outlined text-sm">edit</span>
                  <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                </label>
              </div>

              <div className="flex-1 space-y-5 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-widest text-outline">Full Name</label>
                    <input name="name" onChange={handleChange} value={form.name} className="w-full bg-surface-container border-none rounded-lg px-4 py-3 focus:ring-1 focus:ring-tertiary text-on-surface placeholder-outline-variant" type="text" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-widest text-outline">Email Address</label>
                    <input name="email" onChange={handleChange} value={form.email} className="w-full bg-surface-container border-none rounded-lg px-4 py-3 focus:ring-1 focus:ring-tertiary text-on-surface placeholder-outline-variant" type="email" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-widest text-outline">Phone</label>
                    <input name="phone" onChange={handleChange} value={form.phone} className="w-full bg-surface-container border-none rounded-lg px-4 py-3 focus:ring-1 focus:ring-tertiary text-on-surface placeholder-outline-variant" type="text" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-widest text-outline">Profession</label>
                    <input name="profession" onChange={handleChange} value={form.profession} className="w-full bg-surface-container border-none rounded-lg px-4 py-3 focus:ring-1 focus:ring-tertiary text-on-surface placeholder-outline-variant" type="text" />
                  </div>
                </div>
                <label className="inline-flex items-center gap-2.5 text-sm text-primary-fixed-dim">
                  <input type="checkbox" name="isProfessional" checked={form.isProfessional} onChange={handleChange} />
                  Professional account
                </label>
              </div>
            </div>
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-tertiary/5 rounded-full blur-3xl"></div>
          </section>

          <section className="xl:col-span-4 bg-surface-container-highest rounded-xl p-6 md:p-8 flex flex-col justify-between border border-outline-variant/10 min-h-80">
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-tertiary">
                <span className="material-symbols-outlined">shield_person</span>
                <h3 className="font-headline font-bold text-lg">Security</h3>
              </div>
              <p className="text-primary-fixed-dim text-sm leading-relaxed">Your data is curated with the same care as our cacao blends. Biometric lock is active.</p>
            </div>
            <div className="space-y-3 mt-7">
              <button type="button" className="w-full text-left px-6 py-4 rounded-lg bg-surface-container flex justify-between items-center hover:bg-surface-bright transition-colors">
                <span className="text-sm font-bold">Change Password</span>
                <span className="material-symbols-outlined text-outline">chevron_right</span>
              </button>
              <button type="button" className="w-full text-left px-6 py-4 rounded-lg bg-surface-container flex justify-between items-center hover:bg-surface-bright transition-colors">
                <span className="text-sm font-bold">Two-Factor Auth</span>
                <div className="w-10 h-5 rounded-full relative border border-tertiary/40 bg-[#6f5025]">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-[#ffd996] rounded-full shadow-sm"></div>
                </div>
              </button>
            </div>
          </section>

          <section className="xl:col-span-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/5">
              <div className="mb-6 flex justify-between items-start">
                <div className="p-3 bg-tertiary-container rounded-lg text-tertiary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] bg-tertiary/10 text-tertiary px-3 py-1 rounded-full font-bold">Active Ritual</span>
              </div>
              <h4 className="font-headline text-xl font-bold mb-2">Frequency</h4>
              <p className="text-outline text-sm mb-6">Your cacao arrives every {form.ritualFrequencyDays} days to maintain your morning ritual.</p>
              <select
                name="ritualFrequencyDays"
                value={String(form.ritualFrequencyDays)}
                onChange={handleChange}
                className="w-full bg-surface-container border-none rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-tertiary text-on-surface"
              >
                <option value="7">Every 7 Days</option>
                <option value="14">Every 14 Days</option>
                <option value="30">Every 30 Days</option>
              </select>
            </div>

            <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/5 group hover:border-tertiary/20 transition-all">
              <div className="mb-6">
                <div className="p-3 bg-secondary-container rounded-lg text-secondary inline-block">
                  <span className="material-symbols-outlined">local_shipping</span>
                </div>
              </div>
              <h4 className="font-headline text-xl font-bold mb-2">Next Shipment</h4>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-black font-headline text-tertiary">{shipmentDateLabel.split(',')[0] || 'Not Scheduled'}</span>
                <span className="text-outline text-xs uppercase tracking-widest">{shipmentDateLabel.includes(',') ? shipmentDateLabel.split(',')[1]?.trim() : ''}</span>
              </div>
              <button type="button" onClick={handleReschedule} disabled={loading || settingsLoading} className="text-tertiary text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                Reschedule <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            <div className="bg-[#19120f] rounded-xl p-8 border border-tertiary/30 relative overflow-hidden">
              <div className="mb-6 flex justify-between items-start">
                <div className="p-3 bg-tertiary rounded-lg text-on-tertiary inline-block">
                  <span className="material-symbols-outlined">credit_card</span>
                </div>
                <button type="button" className="text-outline hover:text-tertiary transition-colors">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
              <h4 className="font-headline text-xl font-bold mb-1">Payment Method</h4>
              <p className="text-outline text-xs uppercase tracking-[0.2em] mb-6">{derivedPaymentMethod === 'Not Set' ? 'No Recent Payment' : 'Default Ritual Account'}</p>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-8 bg-surface-variant rounded flex items-center justify-center">
                  <div className="flex -space-x-2">
                    <div className="w-5 h-5 rounded-full bg-red-500/80"></div>
                    <div className="w-5 h-5 rounded-full bg-amber-500/80"></div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold">{derivedPaymentMethod}</p>
                  <p className="text-[10px] text-outline">•••• {derivedCardLast4}</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/5 blur-3xl -mr-16 -mt-16"></div>
            </div>
          </section>

          <section className="xl:col-span-12 bg-surface-container-low rounded-xl p-6 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
              <div>
                <h4 className="font-headline text-2xl font-bold mb-2">Communication Preferences</h4>
                <p className="text-outline text-sm">Tailor how the Liquid Curator reaches out to you.</p>
              </div>
              <button type="submit" disabled={loading} className="px-8 py-3 rounded-full border border-outline-variant/30 text-xs font-bold uppercase tracking-widest hover:bg-surface-container transition-colors disabled:opacity-60">
                {loading ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
              {[
                ['ritualReminders', 'Ritual Reminders', 'Notify me 3 days before a shipment.'],
                ['exclusiveCuration', 'Exclusive Curation', 'Early access to limited batch releases.'],
                ['smsTracking', 'SMS Delivery Tracking', 'Real-time mobile updates on your pour.'],
                ['wellnessJournaling', 'Wellness Journaling', 'Weekly tips on functional chocolate usage.']
              ].map(([key, title, subtitle]) => (
                <div key={key} className="flex items-center justify-between py-4 border-b border-outline-variant/10">
                  <div>
                    <p className="font-bold text-sm">{title}</p>
                    <p className="text-xs text-outline">{subtitle}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                    className={`w-12 h-6 rounded-full relative transition-colors border ${notifications[key] ? 'bg-[#d9ab5f] border-[#f0c376]' : 'bg-[#3e2f26] border-[#8b6f57]'}`}
                  >
                    <div className={`absolute top-0.5 w-5 h-5 rounded-full transition-all ${notifications[key] ? 'right-0.5 bg-[#2a1a08]' : 'left-0.5 bg-[#e6d7c4]'}`}></div>
                  </button>
                </div>
              ))}
            </div>
          </section>
        </form>
        </div>

      </main>

      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[rgba(38,30,26,0.6)] backdrop-blur-xl z-50 flex justify-around items-center py-4 px-6 border-t border-outline-variant/10">
        <NavLink to="/dashboard" end className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-tertiary' : 'text-primary-fixed-dim'}`}>
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Home</span>
        </NavLink>
        <NavLink to="/dashboard/rituals" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-tertiary' : 'text-primary-fixed-dim'}`}>
          <span className="material-symbols-outlined">auto_awesome</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Rituals</span>
        </NavLink>
        <NavLink to="/dashboard/settings" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-tertiary' : 'text-primary-fixed-dim'}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Settings</span>
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-tertiary' : 'text-primary-fixed-dim'}`}>
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Profile</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Settings;
