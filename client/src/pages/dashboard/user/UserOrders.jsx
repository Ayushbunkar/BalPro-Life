import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import UserSidebar from './UserSidebar';
import { authAPI, cartAPI, ordersAPI } from '../../../utils/api';
import bottleChocolateImage from '../../../assets/bottleechoclate.jpg';
import vanillaChocolateImage from '../../../assets/vanillachoclate.jpg';
import chocolatePack6Image from '../../../assets/6packchoclate.jpg';
import vanillaPack6Image from '../../../assets/vanilla6pack.png';

const formatCurrency = (value) => `₹${Number(value || 0).toFixed(2)}`;

const formatInvoiceDate = (value) => {
  if (!value) return 'N/A';
  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const formatOrderDate = (order) => {
  const sourceDate = order?.isDelivered
    ? (order?.deliveredAt || order?.updatedAt || order?.createdAt)
    : (order?.createdAt || order?.updatedAt);

  if (!sourceDate) return 'Date unavailable';

  const dateLabel = new Date(sourceDate).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return order?.isDelivered ? `Delivered ${dateLabel}` : `Placed ${dateLabel}`;
};

const inferOrderImageFromItem = (item) => {
  const text = `${item?.name || ''}`.toLowerCase();
  const isVanilla = text.includes('vanilla');
  const isPack6 = text.includes('pack of 6') || text.includes('6 pack') || text.includes('pack6') || text.includes('x6');

  if (isVanilla && isPack6) return vanillaPack6Image;
  if (isVanilla) return vanillaChocolateImage;
  if (isPack6) return chocolatePack6Image;
  return bottleChocolateImage;
};

const resolveOrderImage = (item) => {
  const rawImage = String(item?.image || item?.product?.images?.[0]?.url || '').trim();
  if (/^https?:\/\//i.test(rawImage)) return rawImage;
  if (rawImage.startsWith('/uploads/')) {
    if (typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname)) {
      return `http://localhost:5000${rawImage}`;
    }
    return rawImage;
  }

  return inferOrderImageFromItem(item);
};

const normalizeOrderForCard = (order) => {
  const orderItems = Array.isArray(order?.orderItems) ? order.orderItems : [];
  const firstItem = orderItems.length > 0 ? orderItems[0] : null;
  const quantity = orderItems.reduce((sum, item) => sum + Number(item?.quantity || 0), 0);
  const status = String(order?.status || 'pending').toLowerCase();
  const isShipped = status === 'shipped';

  const detailedItems = orderItems.map((item, index) => ({
    id: `${order?._id || 'order'}-${item?.product?._id || index}`,
    productId: item?.product?._id || item?.product || null,
    name: item?.name || 'Product',
    quantity: Number(item?.quantity || 0),
    unitPrice: Number(item?.price || 0),
    totalPrice: Number(item?.price || 0) * Number(item?.quantity || 0),
    image: resolveOrderImage(item),
  }));

  const shippingAddress = order?.shippingAddress || {};
  const addressBlock = shippingAddress?.address || {};
  const subtotal = detailedItems.reduce((sum, line) => sum + line.totalPrice, 0);
  const tax = Number(order?.taxPrice || 0);
  const shipping = Number(order?.shippingPrice || 0);
  const total = Number(order?.totalPrice || subtotal + tax + shipping);

  return {
    id: order?._id,
    displayId: String(order?._id || '').slice(-6).toUpperCase(),
    title: firstItem?.name || 'Order Item',
    date: formatOrderDate(order),
    total: formatCurrency(order?.totalPrice),
    status: status.charAt(0).toUpperCase() + status.slice(1),
    statusClass: isShipped ? 'text-tertiary' : 'text-primary-fixed-dim',
    dotClass: isShipped ? 'bg-tertiary' : 'bg-primary-fixed-dim',
    qty: `${quantity || 1}x`,
    image: resolveOrderImage(firstItem),
    badgeClass: isShipped ? 'bg-tertiary text-on-tertiary' : 'bg-outline-variant text-on-surface',
    actionText: 'Invoice',
    actionIcon: 'receipt_long',
    items: detailedItems,
    invoice: {
      invoiceNumber: `INV-${String(order?._id || '').slice(-8).toUpperCase() || 'NA'}`,
      orderNumber: `#${String(order?._id || '').slice(-6).toUpperCase() || 'NA'}`,
      date: formatInvoiceDate(order?.createdAt),
      status: status.charAt(0).toUpperCase() + status.slice(1),
      customerName: shippingAddress?.name || 'Customer',
      customerPhone: shippingAddress?.phone || 'N/A',
      shippingAddress: `${addressBlock?.street || ''}${addressBlock?.city ? `, ${addressBlock.city}` : ''}${addressBlock?.state ? `, ${addressBlock.state}` : ''}${addressBlock?.zipCode ? ` - ${addressBlock.zipCode}` : ''}${addressBlock?.country ? `, ${addressBlock.country}` : ''}`.trim() || 'Address not available',
      paymentMethod: String(order?.paymentMethod || 'card').replace('_', ' ').toUpperCase(),
      subtotal,
      tax,
      shipping,
      total,
    },
  };
};

const UserOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);
  const [reorderingId, setReorderingId] = useState('');
  const [pointsSummary, setPointsSummary] = useState({
    currentPoints: 0,
    freeDrinkThreshold: 100,
    redeemableFreeDrinks: 0,
    nextMilestone: 3000,
    pointsToNextMilestone: 3000,
  });
  const [redeemingDrink, setRedeemingDrink] = useState(false);
  const [redeemMessage, setRedeemMessage] = useState('');

  useEffect(() => {
    let active = true;

    const loadOrders = async () => {
      setLoading(true);
      setError('');
      try {
        const [ordersResponse, pointsResponse] = await Promise.all([
          ordersAPI.getUserOrders(),
          authAPI.getPointsSummary(),
        ]);

        const response = ordersResponse;
        const rawOrders = Array.isArray(response?.data) ? response.data : [];
        if (active) {
          setOrders(rawOrders);
          if (pointsResponse?.data) {
            setPointsSummary({
              currentPoints: Number(pointsResponse.data.currentPoints || 0),
              freeDrinkThreshold: Number(pointsResponse.data.freeDrinkThreshold || 100),
              redeemableFreeDrinks: Number(pointsResponse.data.redeemableFreeDrinks || 0),
              nextMilestone: Number(pointsResponse.data.nextMilestone || 100),
              pointsToNextMilestone: Number(pointsResponse.data.pointsToNextMilestone || 100),
            });
          }
        }
      } catch (err) {
        if (active) {
          setOrders([]);
          setError(err?.message || 'Unable to load orders right now.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadOrders();

    return () => {
      active = false;
    };
  }, []);

  const orderCards = useMemo(() => orders.map(normalizeOrderForCard), [orders]);

  const handleRedeemFreeDrink = async () => {
    setRedeemMessage('');
    setRedeemingDrink(true);

    try {
      const res = await authAPI.redeemFreeDrink();
      const code = res?.data?.redemptionCode || 'N/A';
      setRedeemMessage(`Redeemed successfully. Code: ${code}`);

      const summaryRes = await authAPI.getPointsSummary();
      if (summaryRes?.data) {
        setPointsSummary({
          currentPoints: Number(summaryRes.data.currentPoints || 0),
          freeDrinkThreshold: Number(summaryRes.data.freeDrinkThreshold || 100),
          redeemableFreeDrinks: Number(summaryRes.data.redeemableFreeDrinks || 0),
          nextMilestone: Number(summaryRes.data.nextMilestone || 100),
          pointsToNextMilestone: Number(summaryRes.data.pointsToNextMilestone || 100),
        });
      }
    } catch (err) {
      setRedeemMessage(err?.message || 'Unable to redeem free drink right now.');
    } finally {
      setRedeemingDrink(false);
    }
  };

  const handleReorder = async (orderCard) => {
    if (!orderCard?.id) return;

    const validItems = (orderCard.items || []).filter((line) => line.productId && line.quantity > 0);
    if (validItems.length === 0) {
      setError('This order has no valid products to reorder.');
      return;
    }

    setReorderingId(orderCard.id);
    setError('');

    try {
      await cartAPI.clearCart();

      for (const line of validItems) {
        await cartAPI.addToCart(line.productId, line.quantity);
      }

      navigate('/checkout');
    } catch (err) {
      setError(err?.message || 'Failed to reorder this order. Please try again.');
    } finally {
      setReorderingId('');
    }
  };

  return (
    <div className="bg-[#19120f] text-[#efdfd9] font-body min-h-screen">
      <UserSidebar />

      <main className="flex-1 md:mr-72 min-h-screen bg-surface">
        <header className="flex justify-between items-center px-8 py-6 w-full">
          <div>
            <h2 className="font-headline text-3xl font-bold tracking-tight text-on-surface">Your Orders</h2>
            <p className="text-primary-fixed-dim text-sm mt-1">Tracing your liquid curation history</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group hidden lg:block">
              <input className="bg-surface-container border-none rounded-full px-6 py-2.5 text-sm w-64 focus:ring-1 focus:ring-tertiary transition-all" placeholder="Search orders..." type="text" />
              <span className="material-symbols-outlined absolute right-4 top-2.5 text-outline text-lg">search</span>
            </div>
            <div className="flex gap-4">
              <button className="p-2 text-primary-fixed-dim hover:text-tertiary transition-colors" type="button">
                <span className="material-symbols-outlined">shopping_bag</span>
              </button>
              <button className="p-2 text-primary-fixed-dim hover:text-tertiary transition-colors" type="button">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/30">
                <img className="w-full h-full object-cover" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOCAyOyZosHdwLUbzIif7OnO3c2JKhRgmegXBdLi832jtC-4ZEIH7alffpHfmu7UQ0Arh8RqkUyhAmcLvkKhUo16n1b2_SeX9RYDdtmZFCop89u1mFBJT7y2VsDc0xnwmn-3LUa4c_bICkSc87nsZ3q6OGPSzET4V7wTnisayMgKXmwVn737O4hnjPgaOmhz5l84OWk-u2W35MDHk0NEdSoKqJDnZQqoshgt2BD0PunxWfSV-2_nx16nilkcOZFcUseF6jBelQnQ" />
              </div>
            </div>
          </div>
        </header>

        <section className="p-8 space-y-12">
          <div className="space-y-6">
            {loading && (
              <div className="bg-surface-container-low rounded-xl p-8 text-primary-fixed-dim">Loading your orders...</div>
            )}

            {!loading && error && (
              <div className="bg-surface-container-low rounded-xl p-8 text-error">{error}</div>
            )}

            {!loading && !error && orderCards.length === 0 && (
              <div className="bg-surface-container-low rounded-xl p-8 text-primary-fixed-dim">No orders found yet.</div>
            )}

            {!loading && !error && orderCards.map((item) => (
              <div key={item.id} className="bg-surface-container-low rounded-xl overflow-hidden hover:bg-surface-container transition-colors duration-300">
                <div className="p-8 flex flex-col lg:flex-row lg:items-center gap-8">
                  <div className="flex items-center gap-6 flex-1">
                    <button
                      type="button"
                      className="w-24 h-24 bg-surface-container-highest rounded-lg flex items-center justify-center p-2 relative cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => setSelectedOrder(item)}
                      title="View all products in this order"
                    >
                      <img className="w-full h-full object-contain opacity-90" alt={item.title} src={item.image} />
                      <div className={`absolute -top-2 -right-2 ${item.badgeClass} text-[10px] font-bold px-2 py-0.5 rounded-full`}>{item.qty}</div>
                    </button>
                    <div>
                      <span className="text-tertiary text-[10px] font-bold uppercase tracking-widest">Order #{item.displayId}</span>
                      <h3 className="text-xl font-headline font-bold text-on-surface mt-1">{item.title}</h3>
                      <p className="text-primary-fixed-dim text-sm">{item.date}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-12 lg:justify-end">
                    <div className="space-y-1">
                      <p className="text-outline text-xs uppercase tracking-widest">Total</p>
                      <p className="text-on-surface font-bold font-headline">{item.total}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-outline text-xs uppercase tracking-widest">Status</p>
                      <span className={`flex items-center gap-2 text-sm font-bold ${item.statusClass}`}>
                        <span className={`w-2 h-2 rounded-full ${item.dotClass}`}></span>
                        {item.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        className="text-primary-fixed-dim hover:text-tertiary text-sm font-bold flex items-center gap-2 border-b border-transparent hover:border-tertiary transition-all"
                        type="button"
                        onClick={() => setSelectedInvoiceOrder(item)}
                      >
                        <span className="material-symbols-outlined text-lg">{item.actionIcon}</span>
                        {item.actionText}
                      </button>
                      <button
                        className="bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] text-on-tertiary px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        type="button"
                        onClick={() => handleReorder(item)}
                        disabled={reorderingId === item.id}
                      >
                        <span className="material-symbols-outlined text-lg">refresh</span>
                        {reorderingId === item.id ? 'Reordering...' : 'Reorder'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 hover:border-tertiary/30 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-tertiary text-3xl">loyalty</span>
                <span className="text-on-tertiary-container bg-tertiary-container px-2 py-1 rounded text-[10px] font-bold">VIP STATUS</span>
              </div>
              <h4 className="text-outline text-xs uppercase tracking-widest mb-1">Rewards Points</h4>
              <p className="text-3xl font-headline font-black text-on-surface group-hover:text-tertiary transition-colors">{pointsSummary.currentPoints.toLocaleString('en-IN')}</p>
              <p className="text-primary-fixed-dim text-sm mt-2">{pointsSummary.redeemableFreeDrinks > 0 ? `${pointsSummary.redeemableFreeDrinks} free drink(s) available` : `${pointsSummary.pointsToNextMilestone.toLocaleString('en-IN')} pts away from free drink`}</p>
              <button
                type="button"
                className="mt-4 bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] text-on-tertiary px-4 py-2 rounded-full text-xs font-bold disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleRedeemFreeDrink}
                disabled={redeemingDrink || pointsSummary.currentPoints < pointsSummary.freeDrinkThreshold}
              >
                {redeemingDrink ? 'Redeeming...' : 'Redeem 1 Free Drink'}
              </button>
              {redeemMessage && <p className="text-[11px] text-primary-fixed-dim mt-2">{redeemMessage}</p>}
            </div>

            <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 hover:border-tertiary/30 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-tertiary text-3xl">calendar_month</span>
              </div>
              <h4 className="text-outline text-xs uppercase tracking-widest mb-1">Ritual Frequency</h4>
              <p className="text-3xl font-headline font-black text-on-surface group-hover:text-tertiary transition-colors">Every 14 Days</p>
              <p className="text-primary-fixed-dim text-sm mt-2">Managing 2 active rituals</p>
            </div>

            <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 hover:border-tertiary/30 transition-all group relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className="material-symbols-outlined text-tertiary text-3xl">support_agent</span>
                </div>
                <h4 className="text-outline text-xs uppercase tracking-widest mb-1">Need Assistance?</h4>
                <p className="text-xl font-headline font-bold text-on-surface">Concierge Access</p>
                <p className="text-primary-fixed-dim text-sm mt-2">Average response: 12 mins</p>
              </div>
              <div className="absolute -right-8 -bottom-8 opacity-10 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                <span className="material-symbols-outlined text-9xl">verified</span>
              </div>
            </div>
          </div>
        </section>

        {selectedOrder && (
          <div
            className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            onClick={() => setSelectedOrder(null)}
          >
            <div
              className="w-full max-w-3xl rounded-xl bg-surface-container-low border border-outline-variant/20 shadow-2xl max-h-[85vh] overflow-hidden"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="px-6 py-5 border-b border-outline-variant/20 flex items-center justify-between">
                <div>
                  <p className="text-tertiary text-[10px] font-bold uppercase tracking-widest">Order #{selectedOrder.displayId}</p>
                  <h3 className="font-headline text-2xl font-bold text-on-surface">All Products</h3>
                </div>
                <button
                  type="button"
                  className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface hover:text-tertiary transition-colors"
                  onClick={() => setSelectedOrder(null)}
                  aria-label="Close order details"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(85vh-9rem)]">
                {selectedOrder.items.map((orderItem) => (
                  <div key={orderItem.id} className="flex items-center gap-4 rounded-lg bg-surface-container-highest p-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-surface-container p-1 shrink-0">
                      <img src={orderItem.image} alt={orderItem.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-on-surface truncate">{orderItem.name}</p>
                      <p className="text-sm text-primary-fixed-dim">Qty: {orderItem.quantity} x {formatCurrency(orderItem.unitPrice)}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs uppercase tracking-widest text-outline">Line Total</p>
                      <p className="font-headline font-bold text-on-surface">{formatCurrency(orderItem.totalPrice)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedInvoiceOrder && (
          <div
            className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            onClick={() => setSelectedInvoiceOrder(null)}
          >
            <div
              className="w-full max-w-4xl rounded-xl bg-surface-container-low border border-outline-variant/20 shadow-2xl max-h-[90vh] overflow-hidden"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="px-6 py-5 border-b border-outline-variant/20 flex items-center justify-between">
                <div>
                  <p className="text-tertiary text-[10px] font-bold uppercase tracking-widest">Tax Invoice</p>
                  <h3 className="font-headline text-2xl font-bold text-on-surface">{selectedInvoiceOrder.invoice.invoiceNumber}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-full bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] text-on-tertiary font-bold text-sm"
                    onClick={() => window.print()}
                  >
                    Print
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface hover:text-tertiary transition-colors"
                    onClick={() => setSelectedInvoiceOrder(null)}
                    aria-label="Close invoice"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-lg bg-surface-container-highest p-4">
                    <p className="text-xs uppercase tracking-widest text-outline mb-2">Billed To</p>
                    <p className="font-bold text-on-surface">{selectedInvoiceOrder.invoice.customerName}</p>
                    <p className="text-sm text-primary-fixed-dim">{selectedInvoiceOrder.invoice.customerPhone}</p>
                    <p className="text-sm text-primary-fixed-dim mt-2">{selectedInvoiceOrder.invoice.shippingAddress}</p>
                  </div>
                  <div className="rounded-lg bg-surface-container-highest p-4">
                    <p className="text-xs uppercase tracking-widest text-outline mb-2">Invoice Info</p>
                    <p className="text-sm text-primary-fixed-dim">Order: <span className="text-on-surface font-semibold">{selectedInvoiceOrder.invoice.orderNumber}</span></p>
                    <p className="text-sm text-primary-fixed-dim">Date: <span className="text-on-surface font-semibold">{selectedInvoiceOrder.invoice.date}</span></p>
                    <p className="text-sm text-primary-fixed-dim">Status: <span className="text-on-surface font-semibold">{selectedInvoiceOrder.invoice.status}</span></p>
                    <p className="text-sm text-primary-fixed-dim">Payment: <span className="text-on-surface font-semibold">{selectedInvoiceOrder.invoice.paymentMethod}</span></p>
                  </div>
                </div>

                <div className="rounded-lg bg-surface-container-highest overflow-hidden border border-outline-variant/20">
                  <div className="grid grid-cols-12 gap-3 px-4 py-3 border-b border-outline-variant/20 text-xs uppercase tracking-widest text-outline">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Qty</div>
                    <div className="col-span-2 text-right">Price</div>
                    <div className="col-span-2 text-right">Total</div>
                  </div>
                  {selectedInvoiceOrder.items.map((lineItem) => (
                    <div key={lineItem.id} className="grid grid-cols-12 gap-3 px-4 py-4 border-b border-outline-variant/10 last:border-b-0 items-center">
                      <div className="col-span-6 flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded bg-surface-container p-1 shrink-0">
                          <img src={lineItem.image} alt={lineItem.name} className="w-full h-full object-contain" />
                        </div>
                        <span className="font-semibold text-on-surface truncate">{lineItem.name}</span>
                      </div>
                      <div className="col-span-2 text-center text-primary-fixed-dim">{lineItem.quantity}</div>
                      <div className="col-span-2 text-right text-primary-fixed-dim">{formatCurrency(lineItem.unitPrice)}</div>
                      <div className="col-span-2 text-right font-semibold text-on-surface">{formatCurrency(lineItem.totalPrice)}</div>
                    </div>
                  ))}
                </div>

                <div className="ml-auto w-full md:w-[360px] rounded-lg bg-surface-container-highest p-4 space-y-2">
                  <div className="flex justify-between text-primary-fixed-dim">
                    <span>Subtotal</span>
                    <span>{formatCurrency(selectedInvoiceOrder.invoice.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-primary-fixed-dim">
                    <span>Tax</span>
                    <span>{formatCurrency(selectedInvoiceOrder.invoice.tax)}</span>
                  </div>
                  <div className="flex justify-between text-primary-fixed-dim">
                    <span>Shipping</span>
                    <span>{selectedInvoiceOrder.invoice.shipping > 0 ? formatCurrency(selectedInvoiceOrder.invoice.shipping) : 'Complimentary'}</span>
                  </div>
                  <div className="pt-2 border-t border-outline-variant/20 flex justify-between font-headline font-bold text-xl text-on-surface">
                    <span>Total</span>
                    <span>{formatCurrency(selectedInvoiceOrder.invoice.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface-container-low border-t border-outline-variant/10 flex justify-around items-center py-4 px-6 z-50">
        <NavLink to="/dashboard" end className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-tertiary' : 'text-primary-fixed-dim'}`}>
          <span className="material-symbols-outlined">home</span>
        </NavLink>
        <NavLink to="/dashboard/rewards" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-tertiary' : 'text-primary-fixed-dim'}`}>
          <span className="material-symbols-outlined">workspace_premium</span>
        </NavLink>
        <NavLink to="/dashboard/orders" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-tertiary' : 'text-primary-fixed-dim'}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>inventory_2</span>
        </NavLink>
        <NavLink to="/dashboard/rituals" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-tertiary' : 'text-primary-fixed-dim'}`}>
          <span className="material-symbols-outlined">auto_awesome</span>
        </NavLink>
        <NavLink to="/dashboard/settings" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-tertiary' : 'text-primary-fixed-dim'}`}>
          <span className="material-symbols-outlined">settings</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default UserOrders;
