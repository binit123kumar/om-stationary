// Wishlist state. The wishlist is owned by SQL Server; localStorage is
// only a cache so the header can render instantly. The server is the
// source of truth and is re-synced on every login/user change.
import { useCallback, useEffect, useState } from 'react';
import { apiFetch } from '../services/api.js';
import { getWishlist } from '../services/wishlistService.js';
import { clearWishlist, readWishlist, writeWishlist } from '../utils/storage.js';

export function useWishlist(user) {
  const [wishlist, setWishlist] = useState(readWishlist);
  const [wishlistError, setWishlistError] = useState('');
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const syncWishlistFromServer = useCallback(async () => {
    setWishlistLoading(true);
    try {
      const { signed, rows } = await getWishlist();
      if (!signed) { setWishlist([]); setWishlistError(''); return; }
      const ids = (Array.isArray(rows) ? rows : []).map((x) => x.productId);
      setWishlist(ids);
      setWishlistError('');
      writeWishlist(ids);
    } catch (e) {
      setWishlistError(e.message || 'Wishlist could not be loaded.');
    } finally {
      setWishlistLoading(false);
    }
  }, []);

  // Guests keep a device-local list; customers sync with the server.
  useEffect(() => {
    if (user?.role === 'Customer') syncWishlistFromServer();
    else { setWishlist([]); clearWishlist(); }
  }, [user?.id, user?.role, syncWishlistFromServer]);

  const toggleWishlist = useCallback(async (id) => {
    const saving = !wishlist.includes(id);
    const previous = wishlist;
    // Optimistic update so the heart responds instantly.
    setWishlist(saving ? [...wishlist, id] : wishlist.filter((x) => x !== id));
    writeWishlist(saving ? [...previous, id] : previous.filter((x) => x !== id));

    if (user?.role !== 'Customer') return; // guests keep a device-local list until they sign in
    try {
      const response = await apiFetch('/api/wishlist/' + encodeURIComponent(id), {
        method: saving ? 'POST' : 'DELETE'
      });
      if (response.status === 401) { await syncWishlistFromServer(); return; }
      if (!response.ok) throw new Error('Wishlist could not be updated.');
      setWishlistError('');
      await syncWishlistFromServer();
    } catch (e) {
      // Roll back to the real state on failure.
      setWishlist(saving ? previous.filter((x) => x !== id) : [...previous, id]);
      writeWishlist(previous);
      setWishlistError(e.message || 'Wishlist could not be updated.');
    }
  }, [wishlist, user?.role, syncWishlistFromServer]);

  const clear = useCallback(() => {
    setWishlist([]);
    clearWishlist();
  }, []);

  return {
    wishlist,
    wishlistError,
    wishlistLoading,
    toggleWishlist,
    syncWishlistFromServer,
    clear
  };
}
