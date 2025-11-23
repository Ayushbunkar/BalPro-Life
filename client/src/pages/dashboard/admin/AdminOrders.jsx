import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../DashboardLayout';
import AdminSidebar from './AdminSidebar';
import { ordersAPI } from '../../../utils/api';
import Button from '../../../components/Button';
import ConfirmDialog from '../../../components/ConfirmDialog';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await ordersAPI.getAllOrders();
        setOrders(data.data || []);
      } catch (err) {
        setError(err.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const confirmCancel = (id) => {
    setSelectedOrderId(id);
    setConfirmOpen(true);
  };

  const onConfirmCancel = async () => {
    if (!selectedOrderId) return;
    try {
      await ordersAPI.updateOrderStatus(selectedOrderId, { status: 'cancelled' });
      setOrders(prev => prev.map(o => o._id === selectedOrderId ? { ...o, status: 'cancelled' } : o));
    } catch (err) {
      setError(err.message || 'Failed to cancel order');
    } finally {
      setSelectedOrderId(null);
      setConfirmOpen(false);
    }
  };

  return (
    <DashboardLayout sidebar={<AdminSidebar />} title="Orders">
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading ? (
        <div>Loading orders...</div>
      ) : (
        <div className="bg-white rounded-lg shadow p-4">
          {orders.length === 0 ? (
            <p className="text-sm text-slate-600">No orders available in demo mode.</p>
          ) : (
            <ul className="space-y-3">
              {orders.map(o => (
                <li key={o._id} className="border rounded p-3">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-bold">Order #{o._id}</div>
                      <div className="text-sm text-slate-500">User: {o.user?.name || o.user}</div>
                    </div>
                    <div className="text-sm flex flex-col items-end gap-2">
                      <div>₹{o.total}</div>
                      <div>
                        {o.status !== 'cancelled' && (
                          <Button variant="danger" onClick={() => confirmCancel(o._id)}>Cancel</Button>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <ConfirmDialog open={confirmOpen} title="Cancel order" message="Are you sure you want to cancel this order?" onConfirm={onConfirmCancel} onCancel={() => setConfirmOpen(false)} />
    </DashboardLayout>
  );
};

export default AdminOrders;
