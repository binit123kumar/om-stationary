// Cart state. Guests keep a device-local cart; signed-in customers
// sync with the server cart. The server is authoritative after sign-in.
import { useCallback, useEffect, useRef, useState } from 'react';
import { apiFetch } from '../services/api.js';
import { getCart } from '../services/cartService.js';
import { mapServerCart, readSession } from '../services/session.js';
import { readCart, writeCart } from '../utils/storage.js';

export function useCart(user) {
  const [cart, setCart] = useState(readCart);
  const [cartReady, setCartReady] = useState(() => !readSession()?.user);
  const saveTimer = useRef(null);

  // Persist every change locally so a refresh never loses the guest cart.
  useEffect(() => {
    writeCart(cart);
  }, [cart]);

  // A signed-in customer always starts from the server cart.
  useEffect(() => {
    if (!user) { setCartReady(true); return; }
    let alive = true;
    setCartReady(false);
    getCart()
      .then((serverCart) => { if (alive) setCart(serverCart); })
      .catch(() => { if (alive) setCartReady(false); });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Debounced server sync: every cart change is persisted through
  // PUT /api/cart once the user is signed in and the initial load finished.
  useEffect(() => {
    if (!user || !cartReady) return;
    const timer = setTimeout(() => {
      apiFetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart.map((i) => ({ productId: i.id, quantity: i.q })) })
      }).catch(() => {});
    }, 300);
    return () => clearTimeout(timer);
  }, [cart, user?.id, cartReady]);

  const add = useCallback((p) => {
    setCart((c) => {
      const existing = c.find((i) => i.id === p.id);
      return existing
        ? c.map((i) => (i.id === p.id ? { ...i, q: Math.min(99, i.q + 1) } : i))
        : [...c, { ...p, q: 1 }];
    });
  }, []);

  // Applies the whole quantity in one state update so the header count
  // and every total move together.
  const addN = useCallback((p, n) => {
    const qty = Math.max(1, Math.min(99, Math.round(Number(n) || 1)));
    setCart((c) => {
      const existing = c.find((i) => i.id === p.id);
      return existing
        ? c.map((i) => (i.id === p.id ? { ...i, q: Math.min(99, i.q + qty) } : i))
        : [...c, { ...p, q: Math.min(99, qty) }];
    });
  }, []);

  const change = useCallback((id, delta) => {
    setCart((c) => c.map((i) => (i.id === id ? { ...i, q: Math.max(0, i.q + delta) } : i)).filter((i) => i.q));
  }, []);

  const remove = useCallback((id) => {
    setCart((c) => c.filter((i) => i.id !== id));
  }, []);

  const replace = useCallback((nextCart) => setCart(nextCart), []);
  const clear = useCallback(() => setCart([]), []);

  return { cart, cartReady, setCart, add, addN, change, remove, replace, clear, setCartReady };
}
