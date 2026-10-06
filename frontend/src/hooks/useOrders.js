// Recent orders for "My Orders". Signed-in customers read the server
// list; guests read the order numbers this device placed, resolved
// through their real tracking tokens.
import { useEffect, useState } from 'react';
import { apiFetch } from '../services/api.js';
import { getCustomerOrders } from '../services/orderService.js';
import { getOrderByNumber } from '../services/orderService.js';
import { API_BASE } from '../utils/constants.js';
import { readRecentOrders, readTrackingToken } from '../utils/storage.js';

export function useOrders(user) {
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    const load = async () => {
      if (user?.role === 'Customer') {
        const response = await getCustomerOrders();
        if (response.ok) {
          const rows = await response.json();
          if (active) setRecent(Array.isArray(rows) ? rows : []);
        }
        if (active) setLoading(false);
        return;
      }
      // Guest: resolve each remembered order number with its tracking token.
      const ids = readRecentOrders();
      const rows = await Promise.all(ids.map((id) =>
        getOrderByNumber(id, readTrackingToken(id)).then((r) => (r.ok ? r.json() : null)).catch(() => null)
      ));
      if (active) setRecent(rows.filter(Boolean));
      if (active) setLoading(false);
    };
    load();
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, user?.role]);

  return { recent, loading };
}

// Order lookup by number with a tracking token (Track page).
export function useOrderLookup(orderNumber) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    getOrderByNumber(orderNumber, readTrackingToken(orderNumber))
      .then(async (response) => {
        if (response.status === 404) throw new Error('We could not find that order number. Check the number, or sign in to the account that placed it.');
        if (response.status === 429) throw new Error('Too many lookups. Please wait a moment and try again.');
        if (!response.ok) throw new Error('Could not load this order. Please try again.');
        return response.json();
      })
      .then((data) => { if (active) setOrder(data); })
      .catch((e) => { if (active) setError(e.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [orderNumber]);

  return { order, loading, error, setOrder };
}

export { apiFetch, API_BASE };
