// Small localStorage/sessionStorage helpers. Every store key lives in
// utils/constants.js so no component invents its own key name.
import {
  CART_STORAGE_KEY,
  WISHLIST_STORAGE_KEY,
  RECENT_STORAGE_KEY,
  ORDERS_STORAGE_KEY,
  trackingTokenKey
} from './constants.js';

export function readJSON(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || 'null');
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeKey(key) {
  try {
    localStorage.removeItem(key);
  } catch { /* storage may be unavailable; the app still works */ }
}

export const readCart = () => {
  const saved = readJSON(CART_STORAGE_KEY, []);
  return Array.isArray(saved) ? saved : [];
};

export const writeCart = (cart) => writeJSON(CART_STORAGE_KEY, cart);

export const readWishlist = () => {
  const saved = readJSON(WISHLIST_STORAGE_KEY, []);
  return Array.isArray(saved) ? saved : [];
};

export const writeWishlist = (ids) => writeJSON(WISHLIST_STORAGE_KEY, ids);

export const clearWishlist = () => removeKey(WISHLIST_STORAGE_KEY);

export const readRecentProducts = () => {
  const saved = readJSON(RECENT_STORAGE_KEY, []);
  return Array.isArray(saved) ? saved : [];
};

export const writeRecentProducts = (ids) => writeJSON(RECENT_STORAGE_KEY, ids);

export const readRecentOrders = () => {
  const saved = readJSON(ORDERS_STORAGE_KEY, []);
  return Array.isArray(saved) ? saved : [];
};

// Persists the tracking token the order API returns so the customer can return
// to the real order without signing in.
export const rememberOrder = (orderNumber, trackingToken) => {
  try {
    const saved = readRecentOrders();
    writeJSON(ORDERS_STORAGE_KEY, [orderNumber, ...saved.filter((x) => x !== orderNumber)].slice(0, 12));
    if (trackingToken) localStorage.setItem(trackingTokenKey(orderNumber), trackingToken);
  } catch { /* tracking still works for a signed-in owner */ }
};

export const readTrackingToken = (orderNumber) =>
  localStorage.getItem(trackingTokenKey(orderNumber)) || '';
