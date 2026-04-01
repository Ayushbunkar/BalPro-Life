import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { authAPI } from '../../../utils/api';
import UserSidebar from './UserSidebar';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    profession: user?.profession || '',
    isProfessional: !!user?.isProfessional,
  });
  const [loading, setLoading] = useState(false);
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
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

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
        fd.append('avatar', form.avatarFile);
        res = await authAPI.updateProfileForm(fd);
      } else {
        const payload = {
          name: form.name,
          email: form.email,
          phone: form.phone,
          profession: form.profession,
          isProfessional: form.isProfessional
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

  

  return (
    <div className="bg-surface text-on-surface min-h-screen overflow-x-hidden">
      <UserSidebar />

      <main className="md:ml-72 min-h-screen p-6 md:p-12 lg:p-20">
        <header className="mb-8 md:mb-16">
          <p className="text-tertiary font-headline text-sm tracking-[0.3em] uppercase mb-4">Account Sanctuary</p>
          <h2 className="text-5xl md:text-6xl font-headline font-black tracking-tighter text-on-surface">Settings</h2>
          {message && <p className="mt-4 text-sm text-green-300">{message}</p>}
          {error && <p className="mt-4 text-sm text-error">{error}</p>}
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <section className="lg:col-span-8 bg-surface-container-low rounded-xl p-8 md:p-12 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start md:items-center">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container-highest">
                  <img alt="User Profile" className="w-full h-full object-cover" src={user?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHtZMA1mNHDiouhNVna3NNLLlUYiXqFpW-bLy4TvvL_3-HhCLlkrETwB5PwjSNkQbYrxu-QNjEbDdcg1gZD7JLJHrEKBPKG_qHgwpiLAU4yyWEVHUdLaqY-AOnMczmfuMOUNp0X0R186vHA5RuI1qRojuLyYBx4ocIDMhTICTZMVJehimLl-IS4Z_cQCoBjqnRaZ_bGoPaLibrYSkg7TFNG-FjJ4YbSSaTEFEIZUD90cuCbj2FMrQj71LBwxhp4ImUnPfI-Sfi3Q'} />
                </div>
                <label className="absolute bottom-0 right-0 bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] p-2 rounded-full text-on-primary shadow-xl cursor-pointer">
                  <span className="material-symbols-outlined text-sm">edit</span>
                  <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                </label>
              </div>

              <div className="flex-1 space-y-6 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <label className="inline-flex items-center gap-2 text-sm text-primary-fixed-dim">
                  <input type="checkbox" name="isProfessional" checked={form.isProfessional} onChange={handleChange} />
                  Professional account
                </label>
              </div>
            </div>
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-tertiary/5 rounded-full blur-3xl"></div>
          </section>

          <section className="lg:col-span-4 bg-surface-container-highest rounded-xl p-8 flex flex-col justify-between border border-outline-variant/10">
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-tertiary">
                <span className="material-symbols-outlined">shield_person</span>
                <h3 className="font-headline font-bold text-lg">Security</h3>
              </div>
              <p className="text-primary-fixed-dim text-sm leading-relaxed">Your data is curated with the same care as our cacao blends. Biometric lock is active.</p>
            </div>
            <div className="space-y-3 mt-8">
              <button type="button" className="w-full text-left px-6 py-4 rounded-lg bg-surface-container flex justify-between items-center hover:bg-surface-bright transition-colors">
                <span className="text-sm font-bold">Change Password</span>
                <span className="material-symbols-outlined text-outline">chevron_right</span>
              </button>
              <button type="button" className="w-full text-left px-6 py-4 rounded-lg bg-surface-container flex justify-between items-center hover:bg-surface-bright transition-colors">
                <span className="text-sm font-bold">Two-Factor Auth</span>
                <div className="w-10 h-5 bg-tertiary/20 rounded-full relative">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-tertiary rounded-full"></div>
                </div>
              </button>
            </div>
          </section>

          <section className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/5">
              <div className="mb-6 flex justify-between items-start">
                <div className="p-3 bg-tertiary-container rounded-lg text-tertiary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] bg-tertiary/10 text-tertiary px-3 py-1 rounded-full font-bold">Active Ritual</span>
              </div>
              <h4 className="font-headline text-xl font-bold mb-2">Frequency</h4>
              <p className="text-outline text-sm mb-6">Your cacao arrives every 14 days to maintain your morning ritual.</p>
              <select className="w-full bg-surface-container border-none rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-tertiary text-on-surface">
                <option>Every 7 Days</option>
                <option defaultValue>Every 14 Days</option>
                <option>Every 30 Days</option>
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
                <span className="text-3xl font-black font-headline text-tertiary">Oct 24</span>
                <span className="text-outline text-xs uppercase tracking-widest">2023</span>
              </div>
              <button type="button" className="text-tertiary text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
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
              <p className="text-outline text-xs uppercase tracking-[0.2em] mb-6">Default Ritual Account</p>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-8 bg-surface-variant rounded flex items-center justify-center">
                  <div className="flex -space-x-2">
                    <div className="w-5 h-5 rounded-full bg-red-500/80"></div>
                    <div className="w-5 h-5 rounded-full bg-amber-500/80"></div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold">•••• 8821</p>
                  <p className="text-[10px] text-outline">Expires 12/26</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/5 blur-3xl -mr-16 -mt-16"></div>
            </div>
          </section>

          <section className="lg:col-span-12 bg-surface-container-low rounded-xl p-8 md:p-12">
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
                    className={`w-12 h-6 rounded-full relative transition-colors ${notifications[key] ? 'bg-tertiary' : 'bg-surface-variant'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${notifications[key] ? 'right-1 bg-on-tertiary' : 'left-1 bg-outline'}`}></div>
                  </button>
                </div>
              ))}
            </div>
          </section>
        </form>

        <footer className="mt-24 pt-12 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h5 className="text-sm font-bold text-error/80 uppercase tracking-widest mb-1">Danger Zone</h5>
            <p className="text-xs text-outline">Pause or permanently deactivate your account sanctuary.</p>
          </div>
          <div className="flex gap-4">
            <button type="button" className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-outline hover:text-on-surface transition-colors">
              Pause Account
            </button>
            <button type="button" className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest border border-error/30 text-error hover:bg-error/5 transition-all">
              Deactivate
            </button>
          </div>
        </footer>
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
