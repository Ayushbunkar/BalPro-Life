import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../DashboardLayout';
import AdminSidebar from './AdminSidebar';
import ConfirmDialog from '../../../components/ConfirmDialog';
import orderService from '../../../services/orderService';
import useDebounce from '../../../hooks/useDebounce';
import useApiRequest from '../../../hooks/useApiRequest';

const STATUS_OPTIONS = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { loading, error, execute, setError } = useApiRequest();
  const debouncedSearch = useDebounce(search.trim(), 450);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const params = { page, limit };
        if (debouncedSearch) params.q = debouncedSearch;
        const data = await execute(() => orderService.getOrders(params));
        setOrders(data.data || []);
        setTotalPages(data.pagination?.pages || 1);
      } catch (_err) {
        // handled by hook
      }
    };

    loadOrders();
  }, [debouncedSearch, execute, limit, page]);

  const filteredOrders = orders.filter((order) => {
    if (selectedStatus === 'all') return true;
    return String(order.status || '').toLowerCase() === selectedStatus;
  });

  const formatMoney = (value) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value || 0));

  const updateStatus = async (orderId, status) => {
    const prevOrders = orders;
    setOrders((current) => current.map((order) => (order._id === orderId ? { ...order, status } : order)));

    try {
      await execute(() => orderService.updateOrderStatus(orderId, { status }));
    } catch (_err) {
      setOrders(prevOrders);
    }
  };

  const confirmCancel = (id) => {
    setSelectedOrderId(id);
    setConfirmOpen(true);
  };

  const onConfirmCancel = async () => {
    if (!selectedOrderId) return;
    await updateStatus(selectedOrderId, 'cancelled');
    setSelectedOrderId(null);
    setConfirmOpen(false);
  };

  const openOrderDetails = async (id) => {
    setError('');
    try {
      const res = await execute(() => orderService.getOrder(id));
      setSelectedOrder(res.data || null);
      setDetailsOpen(true);
    } catch (_err) {
      // handled by hook
    }
  };

  return (
    <DashboardLayout sidebar={<AdminSidebar />}>
      <div className="space-y-8">
        <header className="bg-[rgba(250,249,247,0.8)] backdrop-blur-xl rounded-2xl flex justify-between items-center px-8 py-4 border border-outline-variant/10 gap-4">
          <div className="relative w-full max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-lg">search</span>
            <input
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              className="w-full bg-surface-container-highest border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary-container transition-all"
              placeholder="Search orders..."
              type="text"
            />
          </div>
          <select
            className="rounded-lg border border-outline-variant/20 bg-surface-container-lowest px-3 py-2 text-sm"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All status</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </header>

        {error && <div className="text-sm text-red-600">{error}</div>}

        <section className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50">
                  <th className="px-6 py-4 text-xs font-bold uppercase">Order</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase">Total</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase">Date</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                {!loading && filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="px-6 py-4 font-semibold">#{order._id?.slice(-8)?.toUpperCase()}</td>
                    <td className="px-6 py-4 text-sm">{order.user?.name || order.user?.email || 'Guest User'}</td>
                    <td className="px-6 py-4 text-sm font-bold">{formatMoney(order.totalPrice || order.total)}</td>
                    <td className="px-6 py-4 text-sm">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '—'}</td>
                    <td className="px-6 py-4">
                      <select
                        className="rounded-lg border border-outline-variant/30 bg-white px-2 py-1 text-xs"
                        value={order.status || 'pending'}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="px-3 py-1 text-xs rounded border" type="button" onClick={() => openOrderDetails(order._id)}>Details</button>
                        {String(order.status || '').toLowerCase() !== 'cancelled' && (
                          <button
                            className="px-3 py-1 text-xs rounded border border-red-200 text-red-600"
                            type="button"
                            onClick={() => confirmCancel(order._id)}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {loading && (
                  <tr>
                    <td className="px-6 py-8 text-sm text-stone-500" colSpan={6}>Loading orders...</td>
                  </tr>
                )}

                {!loading && filteredOrders.length === 0 && (
                  <tr>
                    <td className="px-6 py-8 text-sm text-stone-500" colSpan={6}>No orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 flex justify-between items-center bg-surface-container-low/10">
            <p className="text-xs text-stone-500">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="w-8 h-8 rounded-full border disabled:opacity-40"
                type="button"
              >
                &lt;
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="w-8 h-8 rounded-full border disabled:opacity-40"
                type="button"
              >
                &gt;
              </button>
            </div>
          </div>
        </section>
      </div>

      {detailsOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Order #{selectedOrder._id?.slice(-8)?.toUpperCase()}</h3>
              <button type="button" className="text-sm" onClick={() => setDetailsOpen(false)}>Close</button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p><strong>Customer:</strong> {selectedOrder.user?.name || selectedOrder.user?.email || 'N/A'}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <p><strong>Total:</strong> {formatMoney(selectedOrder.totalPrice || selectedOrder.total)}</p>
              <p><strong>Date:</strong> {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString() : '—'}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Items</h4>
              <ul className="space-y-1 text-sm">
                {(selectedOrder.orderItems || []).map((item) => (
                  <li key={`${item.product}-${item.name}`}>{item.name} x {item.quantity} - {formatMoney(item.price)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Cancel order"
        message="Are you sure you want to cancel this order?"
        onConfirm={onConfirmCancel}
        onCancel={() => setConfirmOpen(false)}
      />
    </DashboardLayout>
  );
};

export default AdminOrders;
