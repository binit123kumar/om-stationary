// Signed-in customer cart API.
import { apiFetch } from './api.js';
import { mapServerCart } from './session.js';

export async function getCart() {
  const response = await apiFetch('/api/cart');
  if (!response.ok) throw new Error('cart');
  return mapServerCart((await response.json()).items);
}

export async function saveCart(items) {
  return apiFetch('/api/cart', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items })
  });
}

export async function mergeGuestCart(guestItems, accessToken) {
  const current = await apiFetch('/api/cart', {}, accessToken);
  const serverRows = current.ok ? (await current.json()).items.map((row) => ({ productId: row.productId, quantity: row.quantity })) : [];
  // Take the larger quantity per product: idempotent, so signing in twice is a no-op.
  const quantities = new Map();
  for (const row of serverRows) quantities.set(row.productId, Math.min(99, row.quantity));
  for (const row of guestItems) quantities.set(row.productId, Math.min(99, Math.max(quantities.get(row.productId) || 0, row.quantity)));
  const items = [...quantities.entries()].map(([productId, quantity]) => ({ productId, quantity }));
  const synced = await apiFetch('/api/cart', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items })
  }, accessToken);
  return synced;
}
