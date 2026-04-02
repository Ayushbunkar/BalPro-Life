import React, { useState } from 'react';
import DashboardLayout from '../../DashboardLayout';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '../../../contexts/AuthContext';
import adminService from '../../../services/adminService';

const AdminSettings = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    profession: user?.profession || '',
    isProfessional: !!user?.isProfessional
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [interfaceMode, setInterfaceMode] = useState('light');
  const [layoutMode, setLayoutMode] = useState('sidebar');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setForm(prev => ({ ...prev, avatarFile: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let res;
      if (form.avatarFile) {
        setError('Avatar upload is currently available via auth profile endpoint only. Remove avatar change to update admin profile fields.');
        setLoading(false);
        return;
      } else {
        const payload = {
          name: form.name,
          email: form.email,
          phone: form.phone,
          profession: form.profession,
          isProfessional: form.isProfessional
        };
        res = await adminService.updateProfile(payload);
      }

      setMessage(res.message || 'Profile updated');
      if (res.data) updateUser(res.data);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }

    try {
      setLoading(true);
      const res = await adminService.updatePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      setMessage(res.message || 'Password updated successfully');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError(err.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout sidebar={<AdminSidebar />}>
      <div className="space-y-8">
        <header className="bg-[rgba(250,249,247,0.8)] backdrop-blur-xl rounded-2xl flex justify-between items-center px-8 py-4 border border-outline-variant/10">
          <div className="flex items-center flex-1">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">search</span>
              <input className="w-full bg-surface-container-high border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-container transition-all outline-none" placeholder="Search parameters..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-stone-500 hover:text-[#D4A65A] transition-all" type="button">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border-2 border-surface"></span>
            </button>
            <div className="h-8 w-px bg-outline-variant/20 mx-2"></div>
            <span className="text-sm font-semibold text-[#1A1C1B]">Settings</span>
          </div>
        </header>

        {message && <div className="text-sm text-green-700 font-semibold">{message}</div>}
        {error && <div className="text-sm text-red-600 font-semibold">{error}</div>}

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          <form id="admin-settings-form" onSubmit={handleSubmit} className="flex-1 space-y-12">
            <section>
              <div className="mb-8">
                <h2 className="text-2xl font-bold font-headline tracking-tight text-on-surface">Profile Details</h2>
                <p className="text-on-tertiary-container font-body text-sm mt-1">Manage your public identity and contact information.</p>
              </div>
              <div className="bg-surface-container-lowest rounded-lg p-8 space-y-8 shadow-sm">
                <div className="flex items-center gap-8">
                  <div className="relative group">
                    <img alt="Profile" className="w-24 h-24 rounded-full border-4 border-surface-container-low object-cover" src={form.avatarFile ? URL.createObjectURL(form.avatarFile) : (user?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBm0MF2-_lPYdiX5V0VP7KIRCcfA8qpJprL-l8WTIpOMXqmSCG23ZISXD6sfV82sZPXjWjJ12a_plZp5TKRTBZ6GBNrc4ugrt9JqjwvhIVGn661aFdEi50yIrfIzEDBzLQUbtbTCGvYIrYDxBOQPsWQWZn9cHqzsZfdlNDkis3AtIhitnAUeGQWBLf8for9bsezXSkC4_Cy5WHuGOn3ct2iMOS2Gq5SPcg69gra03K5fUiRGNBe2gS8Jmj0IM6utAMW7y2IMkbEYg')} />
                    <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer">
                      <span className="material-symbols-outlined text-sm">photo_camera</span>
                      <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                    </label>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-on-surface">Your Photo</h4>
                    <p className="text-xs text-on-tertiary-container mt-1">JPG or PNG. Max size 2MB.</p>
                    <div className="mt-3 flex gap-3">
                      <label className="bg-surface-container-low px-4 py-2 rounded-full text-xs font-semibold text-on-surface hover:bg-surface-container-highest transition-colors cursor-pointer">
                        Upload New
                        <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                      </label>
                      <button type="button" onClick={() => setForm((prev) => ({ ...prev, avatarFile: null }))} className="px-4 py-2 rounded-full text-xs font-semibold text-error hover:bg-error-container transition-colors">Delete</button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-tertiary-fixed-variant block">Full Name</label>
                    <input name="name" value={form.name} onChange={handleChange} className="w-full bg-surface-container-highest border-none rounded-lg py-3 px-4 text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all" type="text" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-tertiary-fixed-variant block">Email Address</label>
                    <input name="email" value={form.email} onChange={handleChange} className="w-full bg-surface-container-highest border-none rounded-lg py-3 px-4 text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all" type="email" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-tertiary-fixed-variant block">Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} className="w-full bg-surface-container-highest border-none rounded-lg py-3 px-4 text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all" type="text" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-tertiary-fixed-variant block">Profession</label>
                    <input name="profession" value={form.profession} onChange={handleChange} className="w-full bg-surface-container-highest border-none rounded-lg py-3 px-4 text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all" type="text" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-tertiary-fixed-variant block">Biography</label>
                    <textarea name="profession" value={form.profession} onChange={handleChange} className="w-full bg-surface-container-highest border-none rounded-lg py-3 px-4 text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all resize-none" rows="4"></textarea>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="mb-8">
                <h2 className="text-2xl font-bold font-headline tracking-tight text-on-surface">Appearance</h2>
                <p className="text-on-tertiary-container font-body text-sm mt-1">Customize the visual landscape of your portal.</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-surface-container-lowest rounded-lg p-6 flex flex-col justify-between">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="material-symbols-outlined text-primary">dark_mode</span>
                      <button type="button" onClick={() => setInterfaceMode((prev) => (prev === 'light' ? 'dark' : 'light'))} className={`w-12 h-6 rounded-full relative cursor-pointer ${interfaceMode === 'light' ? 'bg-surface-container-highest' : 'bg-primary-container'}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${interfaceMode === 'light' ? 'left-1' : 'right-1'}`}></div>
                      </button>
                    </div>
                    <h4 className="font-bold text-on-surface">Interface Mode</h4>
                    <p className="text-xs text-on-tertiary-container mt-1">Switch between light and dark themes.</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setInterfaceMode('light')} className={`flex-1 p-2 rounded-lg text-center cursor-pointer ${interfaceMode === 'light' ? 'bg-surface-container-low border-2 border-primary-container text-primary' : 'bg-surface-container-low opacity-50'}`}>
                      <p className="text-[10px] font-bold">Light</p>
                    </button>
                    <button type="button" onClick={() => setInterfaceMode('dark')} className={`flex-1 p-2 rounded-lg text-center cursor-pointer ${interfaceMode === 'dark' ? 'bg-surface-container-low border-2 border-primary-container text-primary' : 'bg-surface-container-low opacity-50'}`}>
                      <p className="text-[10px] font-bold">Dark</p>
                    </button>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-lg p-6 flex flex-col justify-between">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="material-symbols-outlined text-primary">dashboard_customize</span>
                      <span className="text-[10px] font-bold bg-primary-container/20 text-primary px-2 py-0.5 rounded uppercase">{layoutMode}</span>
                    </div>
                    <h4 className="font-bold text-on-surface">Navigation Layout</h4>
                    <p className="text-xs text-on-tertiary-container mt-1">Choose your primary navigation anchor.</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setLayoutMode('sidebar')} className={`flex-1 p-2 rounded-lg text-center cursor-pointer ${layoutMode === 'sidebar' ? 'bg-surface-container-low border-2 border-primary-container text-primary' : 'bg-surface-container-low opacity-50'}`}>
                      <p className="text-[10px] font-bold">Sidebar</p>
                    </button>
                    <button type="button" onClick={() => setLayoutMode('topbar')} className={`flex-1 p-2 rounded-lg text-center cursor-pointer ${layoutMode === 'topbar' ? 'bg-surface-container-low border-2 border-primary-container text-primary' : 'bg-surface-container-low opacity-50'}`}>
                      <p className="text-[10px] font-bold">TopBar</p>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="mb-8">
                <h2 className="text-2xl font-bold font-headline tracking-tight text-on-surface">Security</h2>
                <p className="text-on-tertiary-container font-body text-sm mt-1">Protect your account with advanced authentication measures.</p>
              </div>
              <div className="bg-surface-container-lowest rounded-lg p-8 space-y-6">
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary-container/20 p-2 rounded-full">
                      <span className="material-symbols-outlined text-primary">vibration</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-on-surface">Two-Factor Authentication</h4>
                      <p className="text-[10px] text-on-tertiary-container">Secure your login with an SMS or authenticator code.</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => setTwoFactorEnabled((prev) => !prev)} className={`w-12 h-6 rounded-full relative cursor-pointer ${twoFactorEnabled ? 'bg-primary-container' : 'bg-surface-container-highest'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${twoFactorEnabled ? 'right-1' : 'left-1'}`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-surface-container-highest p-2 rounded-full">
                      <span className="material-symbols-outlined text-on-surface">lock</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-on-surface">Password Management</h4>
                      <p className="text-[10px] text-on-tertiary-container">Last changed 45 days ago.</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-primary">Secure</span>
                </div>

                <form onSubmit={handlePasswordChange} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="password"
                    className="rounded-lg bg-surface-container-highest px-3 py-2 text-sm"
                    placeholder="Current password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
                    required
                  />
                  <input
                    type="password"
                    className="rounded-lg bg-surface-container-highest px-3 py-2 text-sm"
                    placeholder="New password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                    required
                  />
                  <input
                    type="password"
                    className="rounded-lg bg-surface-container-highest px-3 py-2 text-sm"
                    placeholder="Confirm password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                  />
                  <div className="md:col-span-3 flex justify-end">
                    <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold" disabled={loading}>
                      {loading ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
                </form>

                <div className="pt-4 border-t border-outline-variant/10">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-on-tertiary-fixed-variant mb-4">Active Sessions</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-on-tertiary-container">laptop_mac</span>
                        <div>
                          <p className="text-xs font-bold">MacBook Pro 16\" — London, UK</p>
                          <p className="text-[10px] text-on-tertiary-container">Current Session • Chrome</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-[#D4A65A]">Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-on-tertiary-container">smartphone</span>
                        <div>
                          <p className="text-xs font-bold">iPhone 15 Pro — Paris, FR</p>
                          <p className="text-[10px] text-on-tertiary-container">2 hours ago • iOS App</p>
                        </div>
                      </div>
                      <button className="text-[10px] font-bold text-error" type="button">Logout</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </form>

          <div className="w-full lg:w-80">
            <div className="sticky top-24 bg-[#1A1311] text-white rounded-lg p-6 shadow-xl overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#D4A65A] blur-[60px] opacity-30"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-[#D4A65A]">auto_awesome</span>
                  <h3 className="font-bold font-headline text-lg">Review Changes</h3>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                    <p className="text-[10px] text-stone-500 uppercase tracking-widest mb-1">Pending Updates</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4A65A]"></span>
                        Profile details updated
                      </li>
                      <li className="flex items-center gap-2 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4A65A]"></span>
                        Appearance: Mode set to {interfaceMode}
                      </li>
                    </ul>
                  </div>
                  <p className="text-[10px] text-stone-400 italic">Changes will take effect immediately across all synchronized devices.</p>
                </div>
                <div className="space-y-3">
                  <button form="admin-settings-form" type="submit" disabled={loading} className="w-full bg-[#D4A65A] hover:bg-[#D4A65A]/90 text-[#281900] font-bold py-3 px-4 rounded-full transition-all flex items-center justify-center gap-2 group shadow-lg hover:-translate-y-0.5 disabled:opacity-60">
                    {loading ? 'Saving...' : 'Save Settings'}
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                  <button type="button" onClick={() => setForm({
                    name: user?.name || '',
                    email: user?.email || '',
                    phone: user?.phone || '',
                    profession: user?.profession || '',
                    isProfessional: !!user?.isProfessional,
                    avatarFile: null,
                  })} className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-3 px-4 rounded-full transition-all text-sm border border-white/10">
                    Discard Changes
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-8 p-6 bg-surface-container-low rounded-lg">
              <h4 className="text-xs font-bold uppercase tracking-widest text-on-tertiary-fixed-variant mb-2">Need help?</h4>
              <p className="text-[10px] text-on-tertiary-container mb-4 leading-relaxed">If you're having trouble with account settings, support is available 24/7 for security and profile audits.</p>
              <a className="text-xs font-bold text-primary flex items-center gap-2" href="#">
                Open Support Ticket
                <span className="material-symbols-outlined text-xs">open_in_new</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
