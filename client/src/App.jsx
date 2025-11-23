import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Check } from 'lucide-react';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/dashboard/admin/AdminDashboard';
import UserDashboard from './pages/dashboard/user/UserDashboard';
import AdminUsers from './pages/dashboard/admin/AdminUsers';
import AdminProducts from './pages/dashboard/admin/AdminProducts';
import AdminProductForm from './pages/dashboard/admin/AdminProductForm';
import AdminOrders from './pages/dashboard/admin/AdminOrders';
import AdminSettings from './pages/dashboard/admin/AdminSettings';
import OAuthCallback from './pages/OAuthCallback';
import UserOrders from './pages/dashboard/user/UserOrders';
import Settings from './pages/dashboard/user/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item);
      return [...prev, { ...product, qty: 1 }];
    });
    showNotification(`${product.name} added`);
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));

  const updateQty = (id, change) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) return { ...item, qty: Math.max(1, item.qty + change) };
      return item;
    }));
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handlePlaceOrder = () => {
    setIsCheckoutOpen(false);
    setCart([]);
    showNotification("Order confirmed. Welcome to the team.");
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0).toFixed(2);
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-orange-500 selection:text-white">

      <Navbar
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main content starts below navbar (navbar is fixed). Pages control their own container/full-bleed behavior. */}
      <main className="pt-24">
        <Routes>
          <Route path="/" element={<HomePage onAddToCart={addToCart} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* User dashboard and nested pages - protected (logged in users) */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/orders" element={
            <ProtectedRoute>
              <UserOrders />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />

          {/* Admin dashboard and nested pages - protected and role-based */}
          <Route path="/admin" element={
            <ProtectedRoute roles={[ 'admin' ]}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute roles={[ 'admin' ]}>
              <AdminUsers />
            </ProtectedRoute>
          } />
          <Route path="/admin/products" element={
            <ProtectedRoute roles={[ 'admin' ]}>
              <AdminProducts />
            </ProtectedRoute>
          } />
          <Route path="/admin/products/new" element={
            <ProtectedRoute roles={[ 'admin' ]}>
              <AdminProductForm />
            </ProtectedRoute>
          } />
          <Route path="/admin/products/:id/edit" element={
            <ProtectedRoute roles={[ 'admin' ]}>
              <AdminProductForm isEdit={true} />
            </ProtectedRoute>
          } />
          <Route path="/admin/orders" element={
            <ProtectedRoute roles={[ 'admin' ]}>
              <AdminOrders />
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute roles={[ 'admin' ]}>
              <AdminSettings />
            </ProtectedRoute>
          } />
          <Route path="/auth/callback" element={<OAuthCallback />} />
          
        </Routes>
      </main>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateQty}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        total={cartTotal}
        onPlaceOrder={handlePlaceOrder}
      />

      {notification && (
        <div className="fixed top-24 right-8 bg-white border border-slate-100 text-slate-900 px-6 py-4 shadow-2xl z-80 flex items-center gap-4 animate-in slide-in-from-right-10 border-l-4 border-l-orange-500">
          <div className="bg-green-100 p-1 rounded-full text-green-600"><Check size={14} /></div>
          <span className="font-bold text-sm uppercase tracking-wide">{notification}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}