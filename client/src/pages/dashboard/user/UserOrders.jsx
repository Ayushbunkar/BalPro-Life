import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../DashboardLayout';
import UserSidebar from './UserSidebar';
import { ordersAPI } from '../../../utils/api';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await ordersAPI.getUserOrders();
        setOrders(data.data || []);
      } catch (err) {
        setError(err.message || 'Failed to load your orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <DashboardLayout sidebar={<UserSidebar />} title="My Orders">
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading ? (
        <div>Loading your orders...</div>
      ) : (
        <div className="bg-white rounded-lg shadow p-4">
          {orders.length === 0 ? (
            <p className="text-sm text-slate-600">You have no orders yet.</p>
          ) : (
            <ul className="space-y-3">
              {orders.map(o => (
                <li key={o._id} className="border rounded p-3">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-bold">Order #{o._id}</div>
                      <div className="text-sm text-slate-500">Items: {o.items?.length || 0}</div>
                    </div>
                    <div className="text-sm">₹{o.total}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default UserOrders;
