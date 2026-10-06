// Partner portal dashboard data + mutations.
import { useCallback, useEffect, useState } from 'react';
import {
  getPartnerInventory,
  getPartnerOrders,
  getPartnerShop,
  updatePartnerInventory,
  updatePartnerOrderStatus
} from '../services/partnerService.js';

export function usePartner() {
  const [shop, setShop] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    const [s, i, o] = await Promise.all([getPartnerShop(), getPartnerInventory(), getPartnerOrders()]);
    if (s.ok) setShop(await s.json());
    if (i.ok) setInventory(await i.json());
    if (o.ok) setOrders(await o.json());
    if (![s, i, o].every((x) => x.ok)) {
      setError('Could not load partner dashboard. Confirm this login is linked to a shop.');
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const saveInventory = useCallback(async (entry) => {
    const response = await updatePartnerInventory(entry);
    if (!response.ok) throw new Error('Could not update product inventory.');
    await load();
  }, [load]);

  const changeOrderStatus = useCallback(async (id, status) => {
    const response = await updatePartnerOrderStatus(id, status);
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.detail || 'Status update rejected.');
    }
    await load();
  }, [load]);

  return { shop, inventory, orders, error, reload: load, saveInventory, changeOrderStatus };
}
