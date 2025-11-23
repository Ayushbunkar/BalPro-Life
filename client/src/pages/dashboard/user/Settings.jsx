import React, { useState } from 'react';
import DashboardLayout from '../../DashboardLayout';
import UserSidebar from './UserSidebar';
import { useAuth } from '../../../contexts/AuthContext';
import { authAPI } from '../../../utils/api';

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
    <DashboardLayout sidebar={<UserSidebar />} title="Settings">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
        <h3 className="font-bold text-lg mb-4">Account Settings</h3>
        {message && <div className="mb-4 text-green-700">{message}</div>}
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input name="email" value={form.email} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Profession</label>
            <input name="profession" value={form.profession} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isProfessional" checked={form.isProfessional} onChange={handleChange} />
              <span className="text-sm">Professional account</span>
            </label>
          </div>

          <div className="mt-2">
            {user?.isPremium ? (
              <div className="inline-block px-3 py-1 bg-yellow-50 text-yellow-800 rounded">Premium member</div>
            ) : (
              <div className="inline-block px-3 py-1 bg-slate-50 text-slate-700 rounded">Not premium</div>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Avatar</label>
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
            {user?.avatar && !form.avatarFile && (
              <div className="mt-2"><img src={user.avatar} alt="avatar" className="w-16 h-16 rounded-full" /></div>
            )}
          </div>

          <div>
            <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
