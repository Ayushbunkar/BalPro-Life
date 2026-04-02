import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../DashboardLayout';
import AdminSidebar from './AdminSidebar';
import { adminAPI } from '../../../utils/api';
import dashboardService from '../../../services/dashboardService';

const formatMoney = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const [statsRes, metricsRes] = await Promise.all([
          dashboardService.getStats(),
          adminAPI.getMetrics()
        ]);

        const d = statsRes.data || {};
        const metrics = metricsRes?.data || {};
        setStats({
          users: d.totalUsers || 0,
          products: metrics.productsCount || 0,
          orders: d.totalOrders || 0,
          revenue: d.totalRevenue || 0
        });
        setRecentOrders(metrics.recentOrders || []);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <DashboardLayout sidebar={<AdminSidebar />}>
      {error && <div className="text-red-600 mb-4">{error}</div>}

      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-on-surface font-headline">Operations Overview</h2>
            <p className="text-on-tertiary-container mt-1">Detailed real-time metrics for Balpro Life ecosystem.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 rounded-full border border-outline-variant/30 text-sm font-medium hover:bg-surface-container-low transition-colors flex items-center gap-2" type="button">
              <span className="material-symbols-outlined text-lg">calendar_today</span>
              Last 30 Days
            </button>
            <button className="px-6 py-2.5 rounded-full bg-primary-container text-on-primary-fixed text-sm font-bold shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2" type="button">
              <span className="material-symbols-outlined text-lg">download</span>
              Export Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-surface-container-lowest p-6 rounded-lg shadow-[0_20px_40px_-12px_rgba(26,28,27,0.06)]">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-2xl bg-surface-container-low">
                <span className="material-symbols-outlined text-[#7C5812]">group</span>
              </div>
              <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full">+12.5%</span>
            </div>
            <p className="text-stone-500 text-sm font-medium uppercase tracking-widest">Total Users</p>
            <h3 className="text-3xl font-extrabold text-on-surface mt-1">{loading ? '—' : stats.users}</h3>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-lg shadow-[0_20px_40px_-12px_rgba(26,28,27,0.06)]">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-2xl bg-surface-container-low">
                <span className="material-symbols-outlined text-[#7C5812]">payments</span>
              </div>
              <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full">+8.2%</span>
            </div>
            <p className="text-stone-500 text-sm font-medium uppercase tracking-widest">Revenue</p>
            <h3 className="text-3xl font-extrabold text-on-surface mt-1">{loading ? '—' : formatMoney(stats.revenue)}</h3>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-lg shadow-[0_20px_40px_-12px_rgba(26,28,27,0.06)]">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-2xl bg-surface-container-low">
                <span className="material-symbols-outlined text-[#7C5812]">shopping_bag</span>
              </div>
              <span className="text-rose-500 text-xs font-bold bg-rose-50 px-2 py-1 rounded-full">-2.4%</span>
            </div>
            <p className="text-stone-500 text-sm font-medium uppercase tracking-widest">Orders</p>
            <h3 className="text-3xl font-extrabold text-on-surface mt-1">{loading ? '—' : stats.orders}</h3>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-lg shadow-[0_20px_40px_-12px_rgba(26,28,27,0.06)]">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-2xl bg-surface-container-low">
                <span className="material-symbols-outlined text-[#7C5812]">inventory_2</span>
              </div>
              <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full">+4.1%</span>
            </div>
            <p className="text-stone-500 text-sm font-medium uppercase tracking-widest">Products</p>
            <h3 className="text-3xl font-extrabold text-on-surface mt-1">{loading ? '—' : stats.products}</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-lg shadow-[0_20px_40px_-12px_rgba(26,28,27,0.06)]">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h4 className="text-xl font-bold font-headline">Revenue Performance</h4>
                <p className="text-sm text-stone-500">Yearly trends and fiscal movement</p>
              </div>
              <div className="flex gap-2">
                <span className="flex items-center gap-2 text-xs font-medium text-stone-500">
                  <span className="w-3 h-3 rounded-full bg-[#D4A65A]"></span> Projection
                </span>
                <span className="flex items-center gap-2 text-xs font-medium text-stone-500">
                  <span className="w-3 h-3 rounded-full bg-stone-300"></span> Actual
                </span>
              </div>
            </div>

            <div className="relative h-[300px] w-full mt-4">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1080 300">
                <line stroke="#D2C3C0" strokeOpacity="0.1" x1="0" x2="100%" y1="0" y2="0"></line>
                <line stroke="#D2C3C0" strokeOpacity="0.1" x1="0" x2="100%" y1="25%" y2="25%"></line>
                <line stroke="#D2C3C0" strokeOpacity="0.1" x1="0" x2="100%" y1="50%" y2="50%"></line>
                <line stroke="#D2C3C0" strokeOpacity="0.1" x1="0" x2="100%" y1="75%" y2="75%"></line>
                <line stroke="#D2C3C0" strokeOpacity="0.1" x1="0" x2="100%" y1="100%" y2="100%"></line>
                <defs>
                  <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#D4A65A" stopOpacity="0.2"></stop>
                    <stop offset="100%" stopColor="#D4A65A" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
                <path d="M0,250 L120,220 L240,240 L360,180 L480,200 L600,120 L720,150 L840,80 L960,100 L1080,40 V300 H0 Z" fill="url(#areaGradient)"></path>
                <polyline fill="none" points="0,250 120,220 240,240 360,180 480,200 600,120 720,150 840,80 960,100 1080,40" stroke="#7C5812" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></polyline>
                <circle cx="600" cy="120" fill="#7C5812" r="6"></circle>
                <circle cx="840" cy="80" fill="#7C5812" r="6"></circle>
              </svg>
              <div className="flex justify-between mt-6 text-[10px] font-bold text-stone-400 uppercase tracking-widest px-2">
                <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-8 rounded-lg flex flex-col">
            <div className="mb-8">
              <h4 className="text-xl font-bold font-headline">User Conversion</h4>
              <p className="text-sm text-on-tertiary-container">Monthly acquisition rates</p>
            </div>
            <div className="flex-1 flex items-end justify-between gap-3 px-2">
              {[40, 65, 85, 55, 70].map((h, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 w-full">
                  <div
                    className={`${idx === 2 ? 'bg-[#7C5812] shadow-lg' : 'bg-[#D4A65A]/40'} w-full rounded-t-lg`}
                    style={{ height: `${h}%` }}
                  ></div>
                  <span className={`text-[10px] font-bold uppercase ${idx === 2 ? 'text-[#7C5812]' : 'text-stone-500'}`}>
                    {['Apr', 'May', 'Jun', 'Jul', 'Aug'][idx]}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/10">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-on-surface">Target Efficiency</p>
                <p className="text-xs font-bold text-emerald-600">92%</p>
              </div>
              <div className="mt-2 h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-lg shadow-[0_20px_40px_-12px_rgba(26,28,27,0.06)] overflow-hidden">
          <div className="px-8 py-6 border-b border-surface-container flex justify-between items-center bg-surface-container-low/30">
            <div>
              <h4 className="text-xl font-bold font-headline">Recent Activity</h4>
              <p className="text-sm text-stone-500">Monitor latest transactions and user events</p>
            </div>
            <button className="text-[#7C5812] text-sm font-bold hover:underline" type="button">View All Activities</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-stone-500 font-bold border-b border-surface-container">
                  <th className="px-8 py-4">User</th>
                  <th className="px-8 py-4">Activity Type</th>
                  <th className="px-8 py-4">Timestamp</th>
                  <th className="px-8 py-4">Amount</th>
                  <th className="px-8 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {(recentOrders || []).slice(0, 5).map((order) => (
                  <tr key={order._id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center">
                          <span className="material-symbols-outlined text-stone-400">person</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-on-surface">{order?.user?.name || 'Customer'}</p>
                          <p className="text-[10px] text-stone-500">{order?.user?.email || 'Member'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm text-on-tertiary-container">Order Placement</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-xs text-stone-500">
                        {order?.createdAt ? new Date(order.createdAt).toLocaleString() : '—'}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-bold text-[#1A1C1B]">{formatMoney(order?.total)}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700">
                        {order?.status || 'Completed'}
                      </span>
                    </td>
                  </tr>
                ))}
                {!loading && recentOrders.length === 0 && (
                  <tr>
                    <td className="px-8 py-8 text-sm text-stone-500" colSpan={5}>No recent activity found.</td>
                  </tr>
                )}
                {loading && (
                  <tr>
                    <td className="px-8 py-8 text-sm text-stone-500" colSpan={5}>Loading activity...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
