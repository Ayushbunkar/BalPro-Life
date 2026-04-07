import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ordersAPI } from '../utils/api';

const formatCurrency = (value) => {
  const amount = Number(value || 0);
  return `₹${amount.toFixed(2)}`;
};

const formatAddress = (shippingAddress = {}) => {
  const nested = shippingAddress?.address || {};
  const street = nested?.street || shippingAddress?.street || shippingAddress?.address || '';
  const city = nested?.city || shippingAddress?.city || '';
  const state = nested?.state || shippingAddress?.state || '';
  const zipCode = nested?.zipCode || shippingAddress?.zipCode || shippingAddress?.postalCode || '';
  const country = nested?.country || shippingAddress?.country || '';

  return [street, city, state, zipCode, country].filter(Boolean).join(', ');
};

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const loadOrder = async () => {
      setLoading(true);
      setError('');

      try {
        const res = await ordersAPI.getOrder(orderId);
        if (active) {
          setOrder(res?.data || null);
        }
      } catch (err) {
        if (active) {
          setError(err?.message || 'Unable to load confirmation details.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    if (orderId) {
      loadOrder();
    } else {
      setError('Order reference is missing.');
      setLoading(false);
    }

    return () => {
      active = false;
    };
  }, [orderId]);

  const orderDate = useMemo(() => {
    if (!order?.createdAt) return '';
    return new Date(order.createdAt).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }, [order?.createdAt]);

  return (
    <div className="bg-surface text-on-surface min-h-screen font-body pb-24">
      <main className="pt-28 px-6 md:px-10 max-w-5xl mx-auto">
        <section className="mb-10">
          <p className="text-xs uppercase tracking-[0.28em] text-tertiary mb-3">Order Confirmed</p>
          <h1 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tighter">Your ritual is on the way.</h1>
          <p className="text-primary-fixed-dim mt-4 max-w-2xl">We verified your order from backend records. You can track status and shipment details anytime.</p>
        </section>

        {loading ? (
          <section className="rounded-xl border border-outline-variant/20 bg-surface-container-low p-8">
            <p className="text-on-surface-variant">Loading order confirmation...</p>
          </section>
        ) : error ? (
          <section className="rounded-xl border border-error/30 bg-error-container/20 p-8">
            <p className="text-error font-semibold">{error}</p>
            <div className="mt-6 flex gap-3">
              <Link to="/dashboard/orders" className="px-6 py-3 rounded-full bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] text-on-tertiary-fixed font-semibold">Go To Orders</Link>
              <Link to="/products" className="px-6 py-3 rounded-full border border-outline-variant/30 text-on-surface font-semibold">Continue Shopping</Link>
            </div>
          </section>
        ) : (
          <section className="space-y-8">
            <div className="rounded-xl border border-outline-variant/20 bg-surface-container-low p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-1">Order ID</p>
                  <p className="font-semibold break-all">{order?._id || orderId}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-1">Order Date</p>
                  <p className="font-semibold">{orderDate || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-1">Payment Status</p>
                  <p className="font-semibold text-tertiary">{order?.isPaid ? 'Paid' : 'Pending'}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-outline-variant/20 bg-surface-container-low p-8">
              <h2 className="font-headline text-2xl font-bold mb-6">Items</h2>
              <div className="space-y-4">
                {(order?.orderItems || []).map((item, idx) => (
                  <div key={`${item?.product || item?.name || 'item'}-${idx}`} className="flex items-center justify-between gap-4 border-b border-outline-variant/10 pb-4">
                    <div>
                      <p className="font-semibold">{item?.name || 'Balpro Item'}</p>
                      <p className="text-sm text-on-surface-variant">Qty {item?.quantity || 1}</p>
                    </div>
                    <p className="font-semibold">{formatCurrency((item?.price || 0) * (item?.quantity || 1))}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-outline-variant/20 bg-surface-container-low p-8">
              <h2 className="font-headline text-2xl font-bold mb-6">Delivery Address</h2>
              <p className="font-semibold">{order?.shippingAddress?.name || 'Recipient'}</p>
              <p className="text-on-surface-variant mt-1">{order?.shippingAddress?.phone || '-'}</p>
              <p className="text-on-surface-variant mt-2">{formatAddress(order?.shippingAddress) || 'Address unavailable'}</p>
            </div>

            <div className="rounded-xl border border-outline-variant/20 bg-surface-container-low p-8">
              <h2 className="font-headline text-2xl font-bold mb-6">Billing Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-on-surface-variant"><span>Items Total</span><span>{formatCurrency(Number(order?.totalPrice || 0) - Number(order?.taxPrice || 0) - Number(order?.shippingPrice || 0))}</span></div>
                <div className="flex justify-between text-on-surface-variant"><span>Tax</span><span>{formatCurrency(order?.taxPrice)}</span></div>
                <div className="flex justify-between text-on-surface-variant"><span>Shipping</span><span>{formatCurrency(order?.shippingPrice)}</span></div>
                <div className="border-t border-outline-variant/20 pt-3 flex justify-between font-headline text-2xl"><span>Total</span><span className="text-tertiary">{formatCurrency(order?.totalPrice)}</span></div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pb-6">
              <Link to="/dashboard/orders" className="px-7 py-3 rounded-full bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] text-on-tertiary-fixed font-bold">Track Order</Link>
              <Link to="/products" className="px-7 py-3 rounded-full border border-outline-variant/30 text-on-surface font-bold hover:bg-surface-container-highest transition-colors">Continue Shopping</Link>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default OrderConfirmationPage;
