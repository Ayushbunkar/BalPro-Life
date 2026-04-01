import React from 'react';
import DashboardLayout from '../../DashboardLayout';
import UserSidebar from './UserSidebar';

const UserRituals = () => {
  return (
    <DashboardLayout sidebar={<UserSidebar />} title="Rituals">
      <div className="space-y-4">
        <div className="bg-white border rounded-lg p-5">
          <h3 className="text-xl font-bold mb-2">Daily Focus Ritual</h3>
          <p className="text-sm text-slate-600">07:30 AM - Cacao Nootropic Activation</p>
        </div>
        <div className="bg-white border rounded-lg p-5">
          <h3 className="text-xl font-bold mb-2">Evening Calm</h3>
          <p className="text-sm text-slate-600">09:30 PM - Magnesium Sleep Synthesis</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserRituals;
