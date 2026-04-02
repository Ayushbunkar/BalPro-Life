import React, { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '../../DashboardLayout';
import AdminSidebar from './AdminSidebar';
import analyticsService from '../../../services/analyticsService';
import useApiRequest from '../../../hooks/useApiRequest';

const AdminAnalytics = () => {
  const [revenue, setRevenue] = useState([]);
  const [users, setUsers] = useState([]);
  const [conversion, setConversion] = useState({ usersCount: 0, ordersCount: 0, conversionRate: 0 });
  const { loading, error, execute } = useApiRequest();

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const [revenueRes, usersRes, conversionRes] = await Promise.all([
          execute(() => analyticsService.getRevenue()),
          execute(() => analyticsService.getUsers()),
          execute(() => analyticsService.getConversion())
        ]);

        setRevenue(revenueRes.data || []);
        setUsers(usersRes.data || []);
        setConversion(conversionRes.data || { usersCount: 0, ordersCount: 0, conversionRate: 0 });
      } catch (_err) {
        // handled by hook
      }
    };

    loadAnalytics();
  }, [execute]);

  const maxRevenue = useMemo(() => Math.max(1, ...revenue.map((r) => Number(r.value || 0))), [revenue]);
  const maxUsers = useMemo(() => Math.max(1, ...users.map((u) => Number(u.value || 0))), [users]);

  return (
    <DashboardLayout sidebar={<AdminSidebar />}>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-on-surface font-headline">Analytics</h2>
          <p className="text-on-tertiary-container">Live data connected to revenue, users, and conversion APIs.</p>
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
            <p className="text-xs uppercase text-stone-500">Total Users</p>
            <h3 className="text-3xl font-bold mt-2">{loading ? '...' : conversion.usersCount}</h3>
          </div>
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
            <p className="text-xs uppercase text-stone-500">Total Orders</p>
            <h3 className="text-3xl font-bold mt-2">{loading ? '...' : conversion.ordersCount}</h3>
          </div>
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
            <p className="text-xs uppercase text-stone-500">Conversion Rate</p>
            <h3 className="text-3xl font-bold mt-2">{loading ? '...' : `${conversion.conversionRate}%`}</h3>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
            <h4 className="font-bold mb-4">Revenue Trend</h4>
            <div className="h-64 flex items-end gap-2">
              {(revenue || []).map((row) => (
                <div key={row.label} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full rounded-t bg-primary-container" style={{ height: `${Math.max(5, (Number(row.value || 0) / maxRevenue) * 100)}%` }}></div>
                  <span className="text-[10px] text-stone-500">{row.label?.slice(5)}</span>
                </div>
              ))}
              {!loading && revenue.length === 0 && <p className="text-sm text-stone-500">No revenue data available.</p>}
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
            <h4 className="font-bold mb-4">User Growth</h4>
            <div className="h-64 flex items-end gap-2">
              {(users || []).map((row) => (
                <div key={row.label} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full rounded-t bg-secondary-container" style={{ height: `${Math.max(5, (Number(row.value || 0) / maxUsers) * 100)}%` }}></div>
                  <span className="text-[10px] text-stone-500">{row.label?.slice(5)}</span>
                </div>
              ))}
              {!loading && users.length === 0 && <p className="text-sm text-stone-500">No user data available.</p>}
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default AdminAnalytics;
