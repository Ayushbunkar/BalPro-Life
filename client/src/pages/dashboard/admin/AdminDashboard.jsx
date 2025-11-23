import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../DashboardLayout';
import AdminSidebar from './AdminSidebar';
import { adminAPI } from '../../../utils/api';
import OrdersChart from '../../../components/OrdersChart';

const StatCard = ({ title, value, className }) => (
  <div className={`p-6 rounded-xl shadow-md ${className}`}>
    <div className="text-sm text-slate-500">{title}</div>
    <div className="mt-2 text-2xl font-extrabold">{value}</div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await adminAPI.getMetrics();
        const d = res.data || {};
        setStats({ users: d.usersCount || 0, products: d.productsCount || 0, orders: d.ordersCount || 0, revenue: d.totalRevenue || 0 });
        setRecentOrders(d.recentOrders || []);
        setSeries(d.ordersSeries || []);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <DashboardLayout sidebar={<AdminSidebar />} title="Admin Dashboard">
      {error && <div className="text-red-600 mb-4">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard title="Total Users" value={loading ? '—' : stats.users} className="bg-linear-to-br from-emerald-50 to-white" />
        <StatCard title="Total Products" value={loading ? '—' : stats.products} className="bg-linear-to-br from-amber-50 to-white" />
        <StatCard title="Total Orders" value={loading ? '—' : stats.orders} className="bg-linear-to-br from-sky-50 to-white" />
        <StatCard title="Revenue (this fetch)" value={loading ? '—' : `₹${stats.revenue.toFixed(2)}`} className="bg-linear-to-br from-rose-50 to-white" />
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Recent Orders</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow">
            {loading ? (
              <div>Loading recent orders...</div>
            ) : recentOrders.length === 0 ? (
              <p className="text-sm text-slate-600">No orders found.</p>
            ) : (
              <ul className="space-y-3">
                {recentOrders.map(o => (
                  <li key={o._id} className="border rounded-md p-3 flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Order #{o._id}</div>
                      <div className="text-sm text-slate-500">{o.user?.name || o.user} • {new Date(o.createdAt).toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">₹{o.total}</div>
                      <div className="text-sm text-slate-500">{o.status}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="font-semibold mb-2">Orders & Revenue (last 14 days)</h3>
            <OrdersChart series={series} />
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default AdminDashboard;
