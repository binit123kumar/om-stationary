// Server-owned wishlist API. The backend is the source of truth; localStorage
// is only a cache so the header can render instantly.
import { apiFetch } from './api.js';

export async function getWishlist() {
  const response = await apiFetch('/api/wishlist');
  if (response.status === 401) return { signed: false, rows: [] };
  if (!response.ok) throw new Error('Wishlist could not be loaded.');
  return { signed: true, rows: await response.json() };
}

export async function addToWishlist(productId) {
  return apiFetch('/api/wishlist/' + encodeURIComponent(productId), { method: 'POST' });
}

export async function removeFromWishlist(productId) {
  return apiFetch('/api/wishlist/' + encodeURIComponent(productId), { method: 'DELETE' });
}

export async function moveToCart(productId) {
  return apiFetch('/api/wishlist/' + encodeURIComponent(productId) + '/move-to-cart', { method: 'POST' });
}
