import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider, useCart } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import IngredientsPage from './pages/IngredientsPage';
import ShippingReturnsPage from './pages/ShippingReturnsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import ClinicalStudiesPage from './pages/ClinicalStudiesPage';
import ProductsPage from './pages/ProductsPage';
import ReviewsPage from './pages/ReviewsPage';
import WhyChooseUsPage from './pages/WhyChooseUsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import FaqPage from './pages/FaqPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WinFreeDrinkPage from './pages/WinFreeDrinkPage';
import CodeEntryPage from './pages/CodeEntryPage';
import BetterLuckPage from './pages/BetterLuckPage';
import HowItWorksPage from './pages/HowItWorksPage';
import RedemptionPage from './pages/RedemptionPage';
import NotFoundPage from './pages/NotFoundPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import GamePage from './pages/GamePage';
import GameResultPage from './pages/GameResultPage';
import AdminDashboard from './pages/dashboard/admin/AdminDashboard';
import UserDashboard from './pages/dashboard/user/UserDashboard';
import AdminUsers from './pages/dashboard/admin/AdminUsers';
import AdminProducts from './pages/dashboard/admin/AdminProducts';
import AdminProductForm from './pages/dashboard/admin/AdminProductForm';
import AdminOrders from './pages/dashboard/admin/AdminOrders';
import AdminSettings from './pages/dashboard/admin/AdminSettings';
import AdminAnalytics from './pages/dashboard/admin/AdminAnalytics';
import OAuthCallback from './pages/OAuthCallback';
import UserOrders from './pages/dashboard/user/UserOrders';
import Settings from './pages/dashboard/user/Settings';
import UserRewards from './pages/dashboard/user/UserRewards';
import UserRituals from './pages/dashboard/user/UserRituals';
import ProtectedRoute from './components/ProtectedRoute';
import CartSidebar from './components/CartSidebar';
import MobileBottomNav from './components/MobileBottomNav';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const { items, itemCount, total, addToCart, removeItem, updateItemQuantityByDelta } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const notificationTimeoutRef = useRef(null);

  const handleAddToCart = async (product, quantity = 1) => {
    showNotification(`Adding ${product?.name || 'item'}...`);
    try {
      await addToCart(product, quantity);
      showNotification(`${product?.name || 'Item'} added to cart.`);
      setIsCartOpen(true);
    } catch (error) {
      const message = error?.message || 'Unable to add item to cart.';
      showNotification(message);

      if (message.toLowerCase().includes('sign in')) {
        setTimeout(() => {
          navigate('/login', { state: { from: `${location.pathname}${location.search}` } });
        }, 700);
      }
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await removeItem(productId);
      showNotification('Item removed from cart.');
    } catch (error) {
      showNotification(error?.message || 'Unable to remove item from cart.');
    }
  };

  const handleUpdateQty = async (productId, change) => {
    try {
      await updateItemQuantityByDelta(productId, change);
    } catch (error) {
      showNotification(error?.message || 'Unable to update item quantity.');
    }
  };

  const showNotification = (msg) => {
    setNotification(msg);
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification(null);
      notificationTimeoutRef.current = null;
    }, 1800);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };
  const cartCount = itemCount;
  const isImmersiveRoute = location.pathname === '/enter-code';
  const isUserDashboardRoute = location.pathname.startsWith('/dashboard');
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isDashboardRoute = isUserDashboardRoute || isAdminRoute;
  const hideGlobalChrome = isImmersiveRoute;
  const showGlobalFooter = !hideGlobalChrome && !isDashboardRoute && location.pathname !== '/cart';

  useEffect(() => {
    if (!window.history || !('scrollRestoration' in window.history)) return undefined;
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => {
    // For normal page navigation, always start from top.
    if (location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    // Defensive cleanup: if any stale anchor link adds a hash-only fragment,
    // normalize the URL back to the current route without '#'.
    if (location.hash === '#') {
      navigate(`${location.pathname}${location.search}`, { replace: true });
    }
  }, [location.hash, location.pathname, location.search, navigate]);

  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans text-on-surface selection:bg-tertiary selection:text-on-tertiary-fixed">

      {!hideGlobalChrome && (
        <Navbar
          cartCount={cartCount}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      )}

      {/* Main content starts below navbar (navbar is fixed). Pages control their own container/full-bleed behavior. */}
      <main className={`${hideGlobalChrome ? '' : 'pt-24'} pb-24 md:pb-0`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10, filter: 'blur(2px)' }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -6, filter: 'blur(1px)' }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.46, ease: [0.22, 1, 0.36, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage onAddToCart={handleAddToCart} />} />
              <Route path="/products" element={<ProductsPage onAddToCart={handleAddToCart} />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/ingredients" element={<IngredientsPage />} />
              <Route path="/shipping-returns" element={<ShippingReturnsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
              <Route path="/clinical-studies" element={<ClinicalStudiesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/help-center" element={<FaqPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/win-free-drink" element={<WinFreeDrinkPage />} />
              <Route path="/enter-code" element={<CodeEntryPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/redemption" element={<RedemptionPage />} />
              <Route path="/better-luck" element={<BetterLuckPage />} />

               {/* Hybrid Game Routes */}
               <Route path="/play-game" element={<GamePage />} />
               <Route path="/game-result" element={<GameResultPage />} />

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
              <Route path="/dashboard/rewards" element={
                <ProtectedRoute>
                  <UserRewards />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/rituals" element={
                <ProtectedRoute>
                  <UserRituals />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/order-confirmation/:orderId" element={
                <ProtectedRoute>
                  <OrderConfirmationPage />
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
              <Route path="/admin/analytics" element={
                <ProtectedRoute roles={[ 'admin' ]}>
                  <AdminAnalytics />
                </ProtectedRoute>
              } />
              <Route path="/admin/settings" element={
                <ProtectedRoute roles={[ 'admin' ]}>
                  <AdminSettings />
                </ProtectedRoute>
              } />
              <Route path="/auth/callback" element={<OAuthCallback />} />
              <Route path="*" element={<NotFoundPage />} />
              
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {showGlobalFooter && <Footer />}

      <MobileBottomNav />

      {!hideGlobalChrome && (
        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={items}
          onRemove={handleRemoveFromCart}
          onUpdateQty={handleUpdateQty}
          onCheckout={handleCheckout}
        />
      )}

      {notification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 w-[min(92vw,760px)] bg-[#19120f]/95 border border-[#4f4440]/40 text-[#efdfd9] px-6 py-4 shadow-2xl z-80 flex items-center justify-center gap-4 animate-in border-l-4 border-l-[#efbf70] backdrop-blur-md rounded-xl">
          <div className="bg-[#efbf70]/20 p-1 rounded-full text-[#efbf70]"><Check size={14} /></div>
          <span className="font-bold text-sm uppercase tracking-wide text-center">{notification}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}