import React, { useEffect, useState, useRef } from 'react';
import DashboardLayout from '../../DashboardLayout';
import UserSidebar from './UserSidebar';
import { useAuth } from '../../../contexts/AuthContext';
import { ordersAPI, authAPI } from '../../../utils/api';

const UserDashboard = () => {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState(user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');
  const initialLoaded = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!initialLoaded.current) {
        setLoading(true);
      } else {
        setIsRefreshing(true);
      }
      try {
        const me = await authAPI.getMe();
        if (me.data) {
          setProfile(me.data);
          updateUser(me.data);
        }
      } catch (err) {
        // ignore; profile may already be in context
      }

      try {
        const res = await ordersAPI.getUserOrders();
        setOrders(res.data || []);
      } catch (err) {
        setError(err.message || 'Failed to load orders');
      } finally {
        setLoading(false);
        setIsRefreshing(false);
        initialLoaded.current = true;
      }
    };

    fetchData();
  }, [updateUser]);

  return (
    <DashboardLayout sidebar={<UserSidebar />} title="Your Account">
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="space-y-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-lg">Profile</h3>
          <div className="mt-3 text-sm text-slate-700">
            <div><strong>Name:</strong> {profile?.name || 'Guest'}</div>
            <div><strong>Email:</strong> {profile?.email || '-'}</div>
            <div><strong>Phone:</strong> {profile?.phone || '-'}</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-lg">Recent Orders</h3>
          {loading && !isRefreshing ? (
            <div className="mt-3">Loading orders...</div>
          ) : orders.length === 0 ? (
            <p className="mt-3 text-sm text-slate-600">You have no orders yet.</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {orders.map(o => (
                <li key={o._id} className="border rounded p-3 flex justify-between items-center">
                  <div>
                    <div className="font-semibold">Order #{o._id}</div>
                    <div className="text-sm text-slate-500">{new Date(o.createdAt).toLocaleString()}</div>
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
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
