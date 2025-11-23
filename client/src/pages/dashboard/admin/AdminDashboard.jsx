import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import AdminSidebar from '../../components/dashboard/AdminSidebar';

const AdminDashboard = () => {
  return (
    <DashboardLayout sidebar={<AdminSidebar />} title="Admin Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-green-50 rounded-lg">Users: <strong>124</strong></div>
        <div className="p-4 bg-yellow-50 rounded-lg">Orders: <strong>56</strong></div>
        <div className="p-4 bg-slate-50 rounded-lg">Revenue: <strong>₹12,450</strong></div>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-bold mb-3">Recent Orders</h2>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-sm text-slate-600">No real orders in demo mode. Connect backend to populate.</p>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default AdminDashboard;
