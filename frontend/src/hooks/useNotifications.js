// Lightweight notification polling for signed-in customers.
// The API is the source of truth: the bell only shows what the
// Notifications table actually contains.
import { useCallback, useEffect, useState } from 'react';
import { getNotifications } from '../services/notificationService.js';

export function useNotifications(user) {
  const [state, setState] = useState({ unread: 0, items: [] });

  const load = useCallback(async () => {
    if (user?.role !== 'Customer') { setState({ unread: 0, items: [] }); return; }
    try {
      const data = await getNotifications(30);
      setState(data);
    } catch { /* the bell stays quiet on failures */ }
  }, [user?.id, user?.role]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (user?.role !== 'Customer') return undefined;
    const timer = setInterval(load, 15000);
    return () => clearInterval(timer);
  }, [load, user?.role]);

  return { ...state, refresh: load };
}
