// Admin control-centre state: orders, dashboard metrics, catalogue
// and every admin mutation. Headers come from either the admin JWT
// session or the legacy admin access key.
import { useCallback, useEffect, useState } from 'react';
import { readSession } from '../services/session.js';
import { apiFetch } from '../services/api.js';
import {
  adminHeaders,
  adjustStock,
  assignDelivery,
  confirmOrderPayment,
  deactivateProduct,
  getDashboard,
  listAdminOrders,
  listAdminProducts,
  saveAdminSettings,
  updateOrderStatus,
  updateProduct
} from '../services/adminService.js';

export function useAdminKey() {
  const [key, setKey] = useState(() => sessionStorage.getItem('omadminkey') || '');
  const [entry, setEntry] = useState(() => sessionStorage.getItem('omadminkey') || '');
  const saveKey = useCallback((event) => {
    event.preventDefault();
    sessionStorage.setItem('omadminkey', entry);
    setKey(entry);
  }, [entry]);
  return { key, entry, setEntry, saveKey };
}

export function useAdmin(user, key) {
  const session = readSession();
  const hasAdminSession = user?.role === 'Admin' && !!session?.accessToken;
  const headers = adminHeaders(session, key);

  const [orders, setOrders] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [pendingStatus, setPendingStatus] = useState(null);

  const load = useCallback(async () => {
    if (!key && !hasAdminSession) return;
    setLoading(true);
    setError('');
    try {
      const [o, d, p] = await Promise.all([
        listAdminOrders(headers),
        getDashboard(headers),
        listAdminProducts(headers, { pageSize: '50' })
      ]);
      if (o.status === 401) throw new Error('Admin sign-in is required.');
      if (!o.ok) throw new Error('Could not load orders.');
      setOrders(await o.json());
      setDashboard(d);
      setProducts(p.ok ? (await p.json()).items || [] : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, user?.id, hasAdminSession]);

  useEffect(() => { load(); }, [load]);

  const setStatus = useCallback(async (id, status) => {
    setMessage('');
    setError('');
    setPendingStatus(id);
    try {
      const response = await updateOrderStatus(id, status, headers);
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.detail || `This order cannot move to ${status}.`);
      setMessage(`Order moved to ${status}.`);
      await load();
    } catch (e) {
      setError(e.message || 'Status update failed.');
    } finally {
      setPendingStatus(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headers, load]);

  const assign = useCallback(async (id, form) => {
    const values = new FormData(form.currentTarget);
    try {
      const response = await assignDelivery(id, values.get('partner'), values.get('tracking'), headers);
      const body = await response.json();
      if (!response.ok) throw new Error(body.detail || 'Delivery assignment failed.');
      setMessage('Delivery assignment saved.');
      await load();
    } catch (e) {
      setError(e.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headers, load]);

  const markPaid = useCallback(async (id) => {
    try {
      const response = await confirmOrderPayment(id, headers);
      const body = await response.json();
      if (!response.ok) throw new Error(body.detail || 'Could not confirm COD receipt.');
      setMessage('Cash receipt recorded.');
      await load();
    } catch (e) {
      setError(e.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headers, load]);

  const adjustStockBy = useCallback(async (id, delta) => {
    try {
      const response = await adjustStock(id, delta, '', headers);
      const body = await response.json();
      if (!response.ok) throw new Error(body.detail || 'Could not update stock.');
      setMessage('Stock updated.');
      await load();
    } catch (e) {
      setError(e.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headers, load]);

  const toggleProduct = useCallback(async (product) => {
    try {
      const response = await updateProduct(product.id, {
        name: product.name, sku: product.sku, brand: product.brand, unit: product.unit,
        category: product.category, description: product.description,
        shortDescription: product.description, price: product.price, mrp: product.mrp,
        stock: product.stock, lowStockThreshold: product.lowStockThreshold,
        imageUrl: product.imageUrl, isActive: !product.isActive
      }, headers);
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.detail || 'Could not update product.');
      setMessage('Product updated.');
      await load();
    } catch (e) {
      setError(e.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headers, load]);

  const deactivate = useCallback(async (id) => {
    await deactivateProduct(id, headers);
    await load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headers, load]);

  const saveSettings = useCallback(async (settings) => {
    const response = await saveAdminSettings(settings, headers);
    if (!response.ok) throw new Error('Could not save settings.');
    return response.json();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headers]);

  return {
    orders, dashboard, products, error, loading, message, pendingStatus,
    load, setStatus, assign, markPaid, adjustStockBy, toggleProduct, deactivate,
    saveSettings, setError, setMessage, hasAdminSession
  };
}

// Re-exported so pages can build authenticated requests without
// duplicating header logic.
export { apiFetch };
