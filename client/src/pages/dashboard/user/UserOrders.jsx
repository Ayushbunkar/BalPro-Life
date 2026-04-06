import React, { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import UserSidebar from './UserSidebar';
import { ordersAPI } from '../../../utils/api';
import bottleChocolateImage from '../../../assets/bottleechoclate.jpg';
import vanillaChocolateImage from '../../../assets/vanillachoclate.jpg';
import chocolatePack6Image from '../../../assets/6packchoclate.jpg';
import vanillaPack6Image from '../../../assets/vanilla6pack.png';

const formatCurrency = (value) => `₹${Number(value || 0).toFixed(2)}`;

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
  const firstItem = Array.isArray(order?.orderItems) && order.orderItems.length > 0 ? order.orderItems[0] : null;
  const quantity = (Array.isArray(order?.orderItems) ? order.orderItems : []).reduce((sum, item) => sum + Number(item?.quantity || 0), 0);
  const status = String(order?.status || 'pending').toLowerCase();
  const isShipped = status === 'shipped';

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
    actionText: isShipped ? 'Track' : 'Invoice',
    actionIcon: isShipped ? 'local_shipping' : 'receipt_long',
  };
};

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const loadOrders = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await ordersAPI.getUserOrders();
        const rawOrders = Array.isArray(response?.data) ? response.data : [];
        if (active) {
          setOrders(rawOrders);
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

  return (
    <div className="bg-[#19120f] text-[#efdfd9] font-body min-h-screen">
      <UserSidebar />

      <main className="flex-1 md:ml-72 min-h-screen bg-surface">
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
                    <div className="w-24 h-24 bg-surface-container-highest rounded-lg flex items-center justify-center p-2 relative">
                      <img className="w-full h-full object-contain opacity-90" alt={item.title} src={item.image} />
                      <div className={`absolute -top-2 -right-2 ${item.badgeClass} text-[10px] font-bold px-2 py-0.5 rounded-full`}>{item.qty}</div>
                    </div>
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
                      <button className="text-primary-fixed-dim hover:text-tertiary text-sm font-bold flex items-center gap-2 border-b border-transparent hover:border-tertiary transition-all" type="button">
                        <span className="material-symbols-outlined text-lg">{item.actionIcon}</span>
                        {item.actionText}
                      </button>
                      <button className="bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] text-on-tertiary px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2" type="button">
                        <span className="material-symbols-outlined text-lg">refresh</span>
                        Reorder
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
              <p className="text-3xl font-headline font-black text-on-surface group-hover:text-tertiary transition-colors">2,450</p>
              <p className="text-primary-fixed-dim text-sm mt-2">Next reward at 3,000 pts</p>
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
