import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import UserSidebar from '../../components/dashboard/UserSidebar';
import { useAuth } from '../../contexts/AuthContext';

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout sidebar={<UserSidebar />} title="Your Account">
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold">Profile</h3>
          <p className="text-sm text-slate-600">Name: {user?.name || 'Guest'}</p>
          <p className="text-sm text-slate-600">Email: {user?.email || '-'}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold">Recent Orders</h3>
          <p className="text-sm text-slate-600">No orders yet in demo mode.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
