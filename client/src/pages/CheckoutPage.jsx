import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ordersAPI, paymentsAPI } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import bottleChocolateImage from '../assets/bottleechoclate.jpg';

const TAX_RATE = 0.08;
const SAVED_ADDRESSES_KEY = 'balpro_saved_addresses_v1';
const LEAFLET_CSS_URL = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css';
const LEAFLET_JS_URL = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js';

let leafletLoaderPromise;

const normalizeAddress = (address = {}) => ({
  name: address.name || '',
  phone: address.phone || '',
  address: address.address || '',
  city: address.city || '',
  state: address.state || '',
  postalCode: address.postalCode || '',
  country: address.country || 'India',
});

const getAddressId = (address = {}) => {
  return [
    address.name,
    address.phone,
    address.address,
    address.city,
    address.state,
    address.postalCode,
    address.country,
  ]
    .map((value) => String(value || '').trim().toLowerCase())
    .join('|');
};

const buildAddressLine = (parts = {}, displayName = '', fallback = '') => {
  const firstDisplaySegment = String(displayName || '')
    .split(',')
    .map((part) => part.trim())
    .find(Boolean);

  const lineCandidates = [
    parts.house_number,
    parts.house_name,
    parts.building,
    parts.road,
    parts.residential,
    parts.neighbourhood || parts.suburb || parts.hamlet,
  ].filter(Boolean);

  const joined = lineCandidates.join(', ').trim();
  if (joined) {
    return joined;
  }

  if (firstDisplaySegment) {
    return firstDisplaySegment;
  }

  return fallback;
};

const loadLeaflet = () => {
  if (window.L) {
    return Promise.resolve(window.L);
  }

  if (leafletLoaderPromise) {
    return leafletLoaderPromise;
  }

  leafletLoaderPromise = new Promise((resolve, reject) => {
    if (!document.querySelector(`link[href="${LEAFLET_CSS_URL}"]`)) {
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = LEAFLET_CSS_URL;
      document.head.appendChild(cssLink);
    }

    const existingScript = document.querySelector(`script[src="${LEAFLET_JS_URL}"]`);
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.L));
      existingScript.addEventListener('error', () => reject(new Error('Unable to load map library')));
      return;
    }

    const script = document.createElement('script');
    script.src = LEAFLET_JS_URL;
    script.async = true;
    script.onload = () => resolve(window.L);
    script.onerror = () => reject(new Error('Unable to load map library'));
    document.body.appendChild(script);
  });

  return leafletLoaderPromise;
};

const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error('Unable to load Razorpay checkout SDK'));
    document.body.appendChild(script);
  });
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { items, total, mutating, updateItemQuantityByDelta, removeItem, clearCart } = useCart();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  });
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedSavedAddressId, setSelectedSavedAddressId] = useState('');
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(false);
  const [isFetchingMapAddress, setIsFetchingMapAddress] = useState(false);
  const [mapError, setMapError] = useState('');
  const [mapSuccess, setMapSuccess] = useState('');
  const [selectedMapLabel, setSelectedMapLabel] = useState('');
  const [pendingMapAddress, setPendingMapAddress] = useState(null);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const mapMarkerRef = useRef(null);
  const leafletRef = useRef(null);
  const pendingMapAddressRef = useRef(null);
  const addressInputRef = useRef(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVED_ADDRESSES_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return;

      const sanitized = parsed
        .map((entry) => ({
          id: entry?.id || getAddressId(entry),
          ...normalizeAddress(entry),
          usedAt: entry?.usedAt || Date.now(),
        }))
        .filter((entry) => entry.address && entry.city && entry.postalCode);

      setSavedAddresses(sanitized.slice(0, 4));
    } catch {
      // Ignore invalid localStorage payloads.
    }
  }, []);

  useEffect(() => {
    // Warm up map assets early so opening map feels instant.
    loadLeaflet().catch(() => {
      // Surface errors only when user opens the map.
    });
  }, []);

  const addressSuggestions = useMemo(() => {
    const unique = new Set(savedAddresses.map((entry) => entry.address).filter(Boolean));
    return Array.from(unique);
  }, [savedAddresses]);

  const saveAddressToLocal = (addressToSave) => {
    const normalized = normalizeAddress(addressToSave);
    const id = getAddressId(normalized);

    if (!normalized.address || !normalized.city || !normalized.postalCode) {
      return;
    }

    const existing = savedAddresses.filter((entry) => entry.id !== id);
    const updated = [{ ...normalized, id, usedAt: Date.now() }, ...existing].slice(0, 4);

    setSavedAddresses(updated);
    setSelectedSavedAddressId(id);
    localStorage.setItem(SAVED_ADDRESSES_KEY, JSON.stringify(updated));
  };

  const applySavedAddress = (entry) => {
    const normalized = normalizeAddress(entry);
    setShippingAddress(normalized);
    setSelectedSavedAddressId(entry.id || getAddressId(normalized));
    setError('');
    setMapSuccess('');
  };

  const setMapMarker = (lat, lng) => {
    if (!mapInstanceRef.current || !leafletRef.current) {
      return;
    }

    if (mapMarkerRef.current) {
      mapMarkerRef.current.setLatLng([lat, lng]);
    } else {
      mapMarkerRef.current = leafletRef.current
        .marker([lat, lng], { draggable: true })
        .addTo(mapInstanceRef.current);

      mapMarkerRef.current.on('dragend', (event) => {
        const { lat, lng } = event.target.getLatLng();
        fillAddressFromCoordinates(lat, lng);
      });
    }

    mapInstanceRef.current.setView([lat, lng], 16);
  };

  const fillAddressFromCoordinates = async (lat, lng) => {
    setIsFetchingMapAddress(true);
    setMapError('');
    setMapSuccess('');

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lng)}&addressdetails=1`
      );

      if (!response.ok) {
        throw new Error('Unable to fetch location details');
      }

      const data = await response.json();
      const parts = data?.address || {};
      const street = buildAddressLine(parts, data?.display_name, shippingAddress.address);

      const nextPending = {
        address: street || data?.name || shippingAddress.address,
        city: parts.city || parts.town || parts.village || parts.county || '',
        state: parts.state || parts.region || '',
        postalCode: parts.postcode || '',
        country: parts.country || 'India',
      };

      setPendingMapAddress(nextPending);
      pendingMapAddressRef.current = nextPending;

      setSelectedMapLabel(data?.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`);
      setMapMarker(lat, lng);
    } catch (fetchError) {
      setMapError(fetchError?.message || 'Unable to fetch map address. Please try another point.');
    } finally {
      setIsFetchingMapAddress(false);
    }
  };

  useEffect(() => {
    if (!isMapOpen || mapInstanceRef.current || !mapContainerRef.current) {
      return;
    }

    let isCancelled = false;
    setIsMapLoading(true);
    setMapError('');

    loadLeaflet()
      .then((L) => {
        if (isCancelled || !mapContainerRef.current) return;

        leafletRef.current = L;
        const map = L.map(mapContainerRef.current).setView([23.2599, 77.4126], 5);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        map.on('click', (event) => {
          const { lat, lng } = event.latlng;
          fillAddressFromCoordinates(lat, lng);
        });

        mapInstanceRef.current = map;
        setTimeout(() => map.invalidateSize(), 100);
      })
      .catch(() => {
        if (!isCancelled) {
          setMapError('Map failed to load. Please check internet and try again.');
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsMapLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [isMapOpen]);

  useEffect(() => {
    if (!isMapOpen || !mapInstanceRef.current) {
      return;
    }

    const resizeTimer = setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 120);

    return () => clearTimeout(resizeTimer);
  }, [isMapOpen]);

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setMapError('Geolocation is not supported on this device.');
      return;
    }

    setMapError('');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fillAddressFromCoordinates(latitude, longitude);
      },
      () => {
        setMapError('Location access denied. Please pick a point on the map instead.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleConfirmMapAddress = () => {
    const nextAddress = pendingMapAddressRef.current || pendingMapAddress;

    if (!nextAddress) {
      setMapError('Please select a point on map first, then confirm.');
      return;
    }

    setShippingAddress((prev) => ({
      ...prev,
      address: nextAddress.address || selectedMapLabel || prev.address,
      city: nextAddress.city || prev.city,
      state: nextAddress.state || prev.state,
      postalCode: nextAddress.postalCode || prev.postalCode,
      country: nextAddress.country || prev.country || 'India',
    }));

    setSelectedSavedAddressId('');
    setMapError('');
    setMapSuccess('Location confirmed. Address fields updated.');

    setTimeout(() => {
      addressInputRef.current?.focus();
      addressInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  };

  const tax = total * TAX_RATE;
  const shipping = 0;
  const finalTotal = total + tax + shipping;

  const handleAddressChange = (field, value) => {
    setShippingAddress((prev) => {
      const updated = { ...prev, [field]: value };

      // If the user selects an existing address suggestion, fill the entire form automatically.
      if (field === 'address') {
        const matched = savedAddresses.find(
          (entry) => entry.address.trim().toLowerCase() === String(value || '').trim().toLowerCase()
        );

        if (matched) {
          setSelectedSavedAddressId(matched.id);
          return normalizeAddress(matched);
        }
      }

      setSelectedSavedAddressId('');
      return updated;
    });
  };

  const validateAddress = () => {
    if (!shippingAddress.name.trim()) return 'Recipient name is required';
    if (!shippingAddress.phone.trim()) return 'Phone number is required';
    if (!shippingAddress.address.trim()) return 'Address is required';
    if (!shippingAddress.city.trim()) return 'City is required';
    if (!shippingAddress.state.trim()) return 'State is required';
    if (!shippingAddress.postalCode.trim()) return 'Postal code is required';
    if (!shippingAddress.country.trim()) return 'Country is required';
    return '';
  };

  const handleRazorpayPayment = async () => {
    await loadRazorpayScript();

    const orderRes = await paymentsAPI.createOrder(Number(finalTotal.toFixed(2)));
    const { order_id, amount, currency, key_id } = orderRes?.data || {};

    if (!order_id || !key_id) {
      throw new Error('Unable to initialize Razorpay order');
    }

    await new Promise((resolve, reject) => {
      const razorpay = new window.Razorpay({
        key: key_id,
        amount,
        currency,
        name: 'BalPro Life',
        description: 'Checkout Payment',
        order_id,
        prefill: {
          name: shippingAddress.name || user?.name || '',
          email: user?.email || '',
          contact: shippingAddress.phone || '',
        },
        theme: {
          color: '#efbf70',
        },
        handler: async (response) => {
          try {
            const verifyRes = await paymentsAPI.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderItems: items.map((item) => ({
                product: item.id,
                quantity: item.qty,
              })),
              shippingAddress,
              paymentMethod: 'razorpay',
              taxPrice: Number(tax.toFixed(2)),
              shippingPrice: shipping,
            });

            setPaymentStatus({
              paymentId: verifyRes?.data?.paymentId,
              orderId: verifyRes?.data?.orderId,
              status: verifyRes?.data?.status || 'success',
            });

            saveAddressToLocal(shippingAddress);

            await clearCart();
            const confirmedOrderId = verifyRes?.data?.orderId;
            if (confirmedOrderId) {
              navigate(`/order-confirmation/${confirmedOrderId}`);
            } else {
              navigate('/dashboard/orders');
            }
            resolve();
          } catch (verifyError) {
            reject(verifyError);
          }
        },
        modal: {
          ondismiss: () => reject(new Error('Payment cancelled by user')),
        },
      });

      razorpay.on('payment.failed', (event) => {
        const description = event?.error?.description || 'Payment failed. Please try again.';
        reject(new Error(description));
      });

      razorpay.open();
    });
  };

  const handlePlaceOrder = async () => {
    const validationError = validateAddress();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError('');
    setPaymentStatus(null);

    try {
      if (selectedPaymentMethod === 'razorpay') {
        await handleRazorpayPayment();
        return;
      }

      const createdOrderRes = await ordersAPI.createOrder({
        orderItems: items.map((item) => ({
          product: item.id,
          quantity: item.qty,
        })),
        shippingAddress,
        paymentMethod: selectedPaymentMethod,
        taxPrice: Number(tax.toFixed(2)),
        shippingPrice: shipping,
      });

      saveAddressToLocal(shippingAddress);
      await clearCart();
      const createdOrderId = createdOrderRes?.data?._id || createdOrderRes?.data?.id;
      if (createdOrderId) {
        navigate(`/order-confirmation/${createdOrderId}`);
      } else {
        navigate('/dashboard/orders');
      }
    } catch (err) {
      setError(err?.message || 'Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-background text-on-surface font-body selection:bg-tertiary selection:text-on-tertiary pb-28 md:pb-0">
      <main className="pt-8 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface mb-2">Secure Checkout</h1>
          <p className="text-primary-fixed-dim font-body">Your premium cocoa experience is just a few steps away.</p>
        </div>

        {!isAuthenticated ? (
          <section className="bg-surface-container-low rounded-xl p-8 shadow-sm max-w-2xl">
            <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">Sign in to continue checkout</h2>
            <p className="text-on-surface-variant mb-6">Checkout is linked to your account for secure orders and tracking.</p>
            <div className="flex gap-3">
              <Link to="/login" className="px-6 py-3 rounded-full bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] text-on-tertiary-fixed font-semibold">Login</Link>
              <Link to="/register" className="px-6 py-3 rounded-full border border-outline-variant/30 text-on-surface font-semibold">Create Account</Link>
            </div>
          </section>
        ) : items.length === 0 ? (
          <section className="bg-surface-container-low rounded-xl p-8 shadow-sm max-w-2xl">
            <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">Your cart is empty</h2>
            <p className="text-on-surface-variant mb-6">Add products to cart before checkout.</p>
            <Link to="/products" className="px-6 py-3 rounded-full bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] text-on-tertiary-fixed font-semibold inline-flex">Browse Products</Link>
          </section>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-12">
              <section className="bg-surface-container-low rounded-xl p-8 shadow-sm">
                <h2 className="font-headline text-xl font-bold text-tertiary mb-8 uppercase tracking-widest">01. Your Selection</h2>
                <div className="space-y-8">
                  {items.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-6 items-center">
                      <div className="relative w-24 h-24 rounded-lg bg-surface-container-highest shrink-0 overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
                          src={item.image || bottleChocolateImage}
                          alt={item.name}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = bottleChocolateImage;
                          }}
                        />
                      </div>
                      <div className="grow text-center sm:text-left">
                        <h3 className="font-headline text-lg font-bold text-on-surface">{item.name}</h3>
                        <p className="text-on-surface-variant text-sm line-clamp-2">{item.details}</p>
                        <button
                          className="text-error text-xs font-semibold mt-2 hover:opacity-80 transition-opacity"
                          type="button"
                          disabled={submitting || mutating}
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center gap-4 bg-surface-container-highest px-4 py-2 rounded-full">
                        <button
                          className="material-symbols-outlined text-sm text-primary hover:text-tertiary transition-colors"
                          type="button"
                          disabled={submitting || mutating}
                          onClick={() => updateItemQuantityByDelta(item.id, -1)}
                        >
                          remove
                        </button>
                        <span className="font-bold text-on-surface w-4 text-center">{item.qty}</span>
                        <button
                          className="material-symbols-outlined text-sm text-primary hover:text-tertiary transition-colors"
                          type="button"
                          disabled={submitting || mutating}
                          onClick={() => updateItemQuantityByDelta(item.id, 1)}
                        >
                          add
                        </button>
                      </div>
                      <div className="text-right min-w-20">
                        <span className="font-headline font-bold text-on-surface text-lg">₹{item.price.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-surface-container-low rounded-xl p-8">
                <h2 className="font-headline text-xl font-bold text-tertiary mb-8 uppercase tracking-widest">02. Shipping Destination</h2>

                {savedAddresses.length > 0 && (
                  <div className="mb-6 rounded-lg border border-outline-variant/20 bg-surface-container-highest p-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-tertiary mb-3">Use Saved Address</p>
                    <div className="grid grid-cols-1 gap-3">
                      {savedAddresses.map((entry) => {
                        const isActive = selectedSavedAddressId === entry.id;
                        return (
                          <button
                            key={entry.id}
                            type="button"
                            onClick={() => applySavedAddress(entry)}
                            className={`text-left rounded-lg border p-3 transition-colors ${isActive ? 'border-[#efbf70] bg-[#2a221f]' : 'border-outline-variant/20 bg-surface-container-low hover:border-[#efbf70]/50'}`}
                          >
                            <p className={`font-semibold ${isActive ? 'text-[#efbf70]' : 'text-on-surface'}`}>{entry.name || 'Saved Address'}</p>
                            <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">
                              {entry.address}, {entry.city}, {entry.state} {entry.postalCode}
                            </p>
                            <p className="text-[11px] text-on-surface-variant mt-1">{entry.phone} • {entry.country}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="mb-6 rounded-lg border border-outline-variant/20 bg-surface-container-highest p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-tertiary">Map Address Picker</p>
                      <p className="text-xs text-on-surface-variant mt-1">Select location, drag pin to adjust, then confirm to fill address fields.</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setIsMapOpen((prev) => !prev)}
                        className="px-3 py-2 rounded-lg text-xs font-semibold border border-outline-variant/25 bg-surface-container-low text-on-surface hover:border-[#efbf70]/50 transition-colors"
                      >
                        {isMapOpen ? 'Hide Map' : 'Select On Map'}
                      </button>
                      <button
                        type="button"
                        onClick={handleUseCurrentLocation}
                        className="px-3 py-2 rounded-lg text-xs font-semibold border border-[#efbf70]/30 text-[#efbf70] hover:bg-[#2a221f] transition-colors"
                      >
                        Use My Location
                      </button>
                      <button
                        type="button"
                        onClick={handleConfirmMapAddress}
                        disabled={!pendingMapAddress || isFetchingMapAddress}
                        className="px-3 py-2 rounded-lg text-xs font-semibold bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] text-on-tertiary-fixed disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Confirm Location
                      </button>
                    </div>
                  </div>

                  {selectedMapLabel && (
                    <p className="text-xs text-on-surface-variant mt-3 line-clamp-2">Selected (preview): {selectedMapLabel}</p>
                  )}

                  {mapError && <p className="text-xs text-error mt-3">{mapError}</p>}
                  {mapSuccess && <p className="text-xs text-[#efbf70] mt-3">{mapSuccess}</p>}
                  {isFetchingMapAddress && <p className="text-xs text-tertiary mt-3">Fetching location details...</p>}

                  {isMapOpen && (
                    <div className="mt-4 rounded-lg overflow-hidden border border-outline-variant/20 bg-surface-container-low relative">
                      <div
                        ref={mapContainerRef}
                        className="h-64"
                      />
                      {isMapLoading && (
                        <div className="absolute inset-0 bg-surface-container-low/90 flex items-center justify-center text-sm text-on-surface-variant">
                          Loading map...
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Full Name</label>
                    <input
                      className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-tertiary/50 transition-all"
                      placeholder="John Doe"
                      type="text"
                      value={shippingAddress.name}
                      onChange={(e) => handleAddressChange('name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Phone</label>
                    <input
                      className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-tertiary/50 transition-all"
                      placeholder="9876543210"
                      type="tel"
                      value={shippingAddress.phone}
                      onChange={(e) => handleAddressChange('phone', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Address</label>
                    <input
                      ref={addressInputRef}
                      className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-tertiary/50 transition-all"
                      placeholder="123 Luxury Lane"
                      type="text"
                      list="saved-address-line-options"
                      value={shippingAddress.address}
                      onChange={(e) => handleAddressChange('address', e.target.value)}
                    />
                    <datalist id="saved-address-line-options">
                      {addressSuggestions.map((line) => (
                        <option key={line} value={line} />
                      ))}
                    </datalist>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">City</label>
                    <input
                      className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-tertiary/50 transition-all"
                      placeholder="New York"
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) => handleAddressChange('city', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Postal Code</label>
                    <input
                      className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-tertiary/50 transition-all"
                      placeholder="10001"
                      type="text"
                      value={shippingAddress.postalCode}
                      onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">State</label>
                    <input
                      className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-tertiary/50 transition-all"
                      placeholder="Madhya Pradesh"
                      type="text"
                      value={shippingAddress.state}
                      onChange={(e) => handleAddressChange('state', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Country</label>
                    <input
                      className="w-full bg-surface-container-highest border-none rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-tertiary/50 transition-all"
                      placeholder="India"
                      type="text"
                      value={shippingAddress.country}
                      onChange={(e) => handleAddressChange('country', e.target.value)}
                    />
                  </div>
                </div>
              </section>

              <section className="bg-surface-container-low rounded-xl p-8">
                <h2 className="font-headline text-xl font-bold text-tertiary mb-8 uppercase tracking-widest">03. Payment Method</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { value: 'card', label: 'Card Payment', hint: 'Place order directly' },
                    { value: 'bank_transfer', label: 'Bank Transfer', hint: 'Manual transfer method' },
                    { value: 'razorpay', label: 'Razorpay', hint: 'Secure UPI / Card / Wallet' },
                  ].map((method) => {
                    const active = selectedPaymentMethod === method.value;

                    return (
                      <button
                        key={method.value}
                        type="button"
                        className={`text-left rounded-lg p-4 border transition-all ${active ? 'border-[#efbf70] bg-[#2a221f]' : 'border-outline-variant/20 bg-surface-container-highest hover:border-[#efbf70]/50'}`}
                        onClick={() => setSelectedPaymentMethod(method.value)}
                      >
                        <p className={`font-semibold ${active ? 'text-[#efbf70]' : 'text-on-surface'}`}>{method.label}</p>
                        <p className="text-xs text-on-surface-variant mt-1">{method.hint}</p>
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>

            <aside className="lg:col-span-4 sticky top-32 space-y-8">
              <div className="bg-surface-container-low rounded-xl p-8 shadow-2xl border border-outline-variant/10">
                <h2 className="font-headline text-xl font-bold text-on-surface mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Subtotal</span>
                    <span className="font-bold text-on-surface">₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Shipping</span>
                    <span className="text-tertiary font-bold">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Estimated Tax</span>
                    <span className="font-bold text-on-surface">₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="pt-4 border-t border-outline-variant/20 flex justify-between items-end">
                    <div>
                      <span className="text-xs font-bold text-tertiary uppercase tracking-widest">Total Due</span>
                      <div className="text-3xl font-headline font-extrabold text-on-surface">₹{finalTotal.toFixed(2)}</div>
                    </div>
                  </div>
                </div>

                {error && <p className="text-sm text-error mb-4">{error}</p>}

                {paymentStatus && (
                  <div className="mb-4 rounded-lg border border-[#efbf70]/30 bg-[#2a2117] p-4">
                    <p className="text-xs uppercase tracking-widest text-[#efbf70] font-bold mb-2">Payment Success</p>
                    <p className="text-sm text-on-surface-variant">Payment ID: <span className="text-on-surface font-semibold">{paymentStatus.paymentId}</span></p>
                    <p className="text-sm text-on-surface-variant">Order ID: <span className="text-on-surface font-semibold">{paymentStatus.orderId}</span></p>
                    <p className="text-sm text-on-surface-variant">Status: <span className="text-[#efbf70] font-semibold uppercase">{paymentStatus.status}</span></p>
                  </div>
                )}

                <button
                  className="w-full bg-[linear-gradient(135deg,#efbf70_0%,#a77e36_100%)] text-on-tertiary-fixed font-bold py-5 rounded-full shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                  disabled={submitting || mutating || items.length === 0}
                  onClick={handlePlaceOrder}
                >
                  {submitting
                    ? (selectedPaymentMethod === 'razorpay' ? 'Opening Payment...' : 'Placing Order...')
                    : (selectedPaymentMethod === 'razorpay' ? 'Pay Now' : 'Complete Purchase')}
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>

                {paymentStatus && (
                  <button
                    className="w-full mt-3 border border-outline-variant/30 text-on-surface font-semibold py-3 rounded-full hover:bg-surface-container-highest transition-colors"
                    type="button"
                    onClick={() => navigate('/dashboard/orders')}
                  >
                    View My Orders
                  </button>
                )}
              </div>
            </aside>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 w-full z-50 rounded-t-3xl md:hidden bg-[#19120f]/90 backdrop-blur-2xl border-t border-[#4f4440]/20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex justify-around items-center h-20 pb-safe px-6">
          <Link to="/products" className="flex flex-col items-center justify-center text-[#e2bfb2]/50 py-2 px-4 scale-95 active:scale-90 transition-transform">
            <span className="material-symbols-outlined mb-1">local_mall</span>
            <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Shop</span>
          </Link>

          <Link to="/why-choose-us" className="flex flex-col items-center justify-center text-[#e2bfb2]/50 py-2 px-4 scale-95 active:scale-90 transition-transform">
            <span className="material-symbols-outlined mb-1">auto_awesome</span>
            <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Benefits</span>
          </Link>

          <Link to="/cart" className="flex flex-col items-center justify-center text-[#efbf70] bg-[#3c332f] rounded-full py-2 px-4 scale-95 active:scale-90 transition-transform">
            <span className="material-symbols-outlined mb-1">shopping_cart</span>
            <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Cart</span>
          </Link>

          <Link to="/dashboard" className="flex flex-col items-center justify-center text-[#e2bfb2]/50 py-2 px-4 scale-95 active:scale-90 transition-transform">
            <span className="material-symbols-outlined mb-1">person</span>
            <span className="text-[10px] font-medium uppercase tracking-widest font-['Plus_Jakarta_Sans']">Account</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default CheckoutPage;
