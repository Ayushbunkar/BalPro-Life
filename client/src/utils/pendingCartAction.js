const PENDING_CART_ACTION_KEY = 'balpro.pendingCartAction';
const PENDING_CART_ACTION_TTL_MS = 15 * 60 * 1000;

export const readPendingCartAction = () => {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.sessionStorage.getItem(PENDING_CART_ACTION_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    if (!parsed.productId || typeof parsed.productId !== 'string') return null;

    const normalized = {
      productId: parsed.productId,
      productName: typeof parsed.productName === 'string' ? parsed.productName : 'Item',
      quantity: Number.isFinite(parsed.quantity) && parsed.quantity > 0 ? parsed.quantity : 1,
      returnTo: typeof parsed.returnTo === 'string' ? parsed.returnTo : '/',
      createdAt: Number.isFinite(parsed.createdAt) ? parsed.createdAt : Date.now(),
    };

    const ageMs = Date.now() - normalized.createdAt;
    if (ageMs > PENDING_CART_ACTION_TTL_MS) {
      window.sessionStorage.removeItem(PENDING_CART_ACTION_KEY);
      return null;
    }

    return normalized;
  } catch (_error) {
    return null;
  }
};

export const writePendingCartAction = (action) => {
  if (typeof window === 'undefined') return;

  const payload = {
    productId: String(action?.productId || ''),
    productName: String(action?.productName || 'Item'),
    quantity: Number.isFinite(action?.quantity) && action.quantity > 0 ? action.quantity : 1,
    returnTo: typeof action?.returnTo === 'string' && action.returnTo ? action.returnTo : '/',
    createdAt: Date.now(),
  };

  if (!payload.productId) return;

  try {
    window.sessionStorage.setItem(PENDING_CART_ACTION_KEY, JSON.stringify(payload));
  } catch (_error) {
    // Ignore storage failures.
  }
};

export const clearPendingCartAction = () => {
  if (typeof window === 'undefined') return;

  try {
    window.sessionStorage.removeItem(PENDING_CART_ACTION_KEY);
  } catch (_error) {
    // Ignore storage failures.
  }
};
