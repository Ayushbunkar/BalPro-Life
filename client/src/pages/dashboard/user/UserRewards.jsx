import React from 'react';
import DashboardLayout from '../../DashboardLayout';
import UserSidebar from './UserSidebar';

const UserRewards = () => {
  return (
    <DashboardLayout sidebar={<UserSidebar />} title="Rewards">
      <div className="space-y-6">
        <div className="bg-white border rounded-lg p-5">
          <p className="text-sm text-slate-500">Available Balance</p>
          <h3 className="text-3xl font-extrabold text-slate-900 mt-1">2,450 Drops</h3>
          <p className="text-sm text-slate-600 mt-2">Use your points to redeem premium perks and product rewards.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border rounded-lg p-4">
            <h4 className="font-bold mb-2">Free Tetra Pack</h4>
            <p className="text-sm text-slate-600 mb-3">500 Drops</p>
            <button type="button" className="px-4 py-2 rounded bg-slate-900 text-white text-sm">Redeem</button>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <h4 className="font-bold mb-2">Priority Shipping</h4>
            <p className="text-sm text-slate-600 mb-3">250 Drops</p>
            <button type="button" className="px-4 py-2 rounded bg-slate-900 text-white text-sm">Redeem</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserRewards;
