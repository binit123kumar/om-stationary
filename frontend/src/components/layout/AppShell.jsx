import { createContext, useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { apiFetch } from '../../services/api.js';
import { clearSession, mapServerCart, readSession } from '../../services/session.js';
import { useCatalog } from '../../hooks/useCatalog.js';
import { useCategories } from '../../hooks/useCategories.js';
import { useNotifications } from '../../hooks/useNotifications.js';
import { Header } from './Header.jsx';
import { FooterMap } from './FooterMap.jsx';

export const AppShellContext = createContext(null);

export function AppShell() {
  const catalog = useCatalog();
  const navCategories = useCategories();
  const [user, setUser] = useState(() => readSession()?.user || null);
  const [cartReady, setCartReady] = useState(() => !readSession()?.user);
  const notifications = useNotifications(user);
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('omwishlist') || '[]');
      return Array.isArray(saved) ? saved : [];
    } catch { return []; }
  });
  const [wishlistError, setWishlistError] = useState('');
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const syncWishlistFromServer = useCallback(async () => {
    setWishlistLoading(true);
    try {
      const response = await apiFetch('/api/wishlist');
      if (response.status === 401) { setWishlist([]); setWishlistError(''); return; }
      if (!response.ok) throw new Error('Wishlist could not be loaded.');
      const rows = await response.json();
      const ids = (Array.isArray(rows) ? rows : []).map((row) => row.productId);
      setWishlist(ids);
      setWishlistError('');
      localStorage.setItem('omwishlist', JSON.stringify(ids));
    } catch (error) {
      setWishlistError(error.message || 'Wishlist could not be loaded.');
    } finally { setWishlistLoading(false); }
  }, []);

  useEffect(() => {
    if (user?.role === 'Customer') syncWishlistFromServer();
    else { setWishlist([]); localStorage.removeItem('omwishlist'); }
  }, [user?.id, user?.role, syncWishlistFromServer]);

  const toggleWishlist = useCallback(async (id) => {
    const saving = !wishlist.includes(id);
    const previous = wishlist;
    const next = saving ? [...wishlist, id] : wishlist.filter((item) => item !== id);
    setWishlist(next);
    localStorage.setItem('omwishlist', JSON.stringify(next));
    if (user?.role !== 'Customer') return;
    try {
      const response = await apiFetch(`/api/wishlist/${encodeURIComponent(id)}`, { method: saving ? 'POST' : 'DELETE' });
      if (response.status === 401) { await syncWishlistFromServer(); return; }
      if (!response.ok) throw new Error('Wishlist could not be updated.');
      setWishlistError('');
      await syncWishlistFromServer();
    } catch (error) {
      setWishlist(saving ? previous.filter((item) => item !== id) : [...previous, id]);
      localStorage.setItem('omwishlist', JSON.stringify(previous));
      setWishlistError(error.message || 'Wishlist could not be updated.');
    }
  }, [wishlist, user?.role, syncWishlistFromServer]);

  const [cart, setCart] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('omcart') || '[]');
      return Array.isArray(saved) ? saved : [];
    } catch { return []; }
  });
  useEffect(() => {
    try { localStorage.setItem('omcart', JSON.stringify(cart)); } catch (error) { console.warn('Cart could not be saved locally', error); }
  }, [cart]);
  useEffect(() => {
    if (!user) { setCartReady(true); return undefined; }
    let active = true;
    setCartReady(false);
    apiFetch('/api/cart').then(async (response) => {
      if (!response.ok) throw new Error('Cart could not be loaded.');
      const data = await response.json();
      if (active) { setCart(mapServerCart(data.items)); setCartReady(true); }
    }).catch(() => { if (active) setCartReady(false); });
    return () => { active = false; };
  }, [user?.id]);
  useEffect(() => {
    if (!user || !cartReady) return undefined;
    const timer = setTimeout(() => apiFetch('/api/cart', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart.map((item) => ({ productId: item.id, quantity: item.q })) })
    }).catch(() => {}), 300);
    return () => clearTimeout(timer);
  }, [cart, user?.id, cartReady]);

  const onAuth = (nextUser, serverCart) => { setUser(nextUser); setCart(serverCart); setCartReady(true); };
  const onLogout = async () => {
    const session = readSession();
    try {
      if (session?.refreshToken) await apiFetch('/api/auth/logout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: session.refreshToken })
      });
    } catch { /* Local logout should still complete. */ }
    clearSession();
    sessionStorage.removeItem('omadminkey');
    setUser(null); setCart([]); setCartReady(true); setWishlist([]);
    localStorage.removeItem('omwishlist');
  };
  const add = (product) => setCart((current) => {
    const existing = current.find((item) => item.id === product.id);
    return existing
      ? current.map((item) => item.id === product.id ? { ...item, q: Math.min(99, item.q + 1) } : item)
      : [...current, { ...product, q: 1 }];
  });
  const addN = (product, amount) => {
    const quantity = Math.max(1, Math.min(99, Math.round(Number(amount) || 1)));
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      return existing
        ? current.map((item) => item.id === product.id ? { ...item, q: Math.min(99, item.q + quantity) } : item)
        : [...current, { ...product, q: quantity }];
    });
  };
  const change = (id, delta) => setCart((current) => current.map((item) => item.id === id
    ? { ...item, q: Math.max(0, item.q + delta) } : item).filter((item) => item.q));
  const remove = (id) => setCart((current) => current.filter((item) => item.id !== id));
  const context = {
    catalog, navCategories, user, notifications, wishlist, wishlistError, wishlistLoading,
    syncWishlistFromServer, toggleWishlist, cart, add, addN, change, remove,
    clearCart: () => setCart([]), onAuth, onLogout
  };

  return (
    <AppShellContext.Provider value={context}>
      <Header user={user} catalog={catalog} cartCount={cart.reduce((sum, item) => sum + item.q, 0)} wishlistCount={wishlist.length} unreadCount={notifications.unread} />
      <main><Outlet /></main>
      <FooterMap />
    </AppShellContext.Provider>
  );
}
