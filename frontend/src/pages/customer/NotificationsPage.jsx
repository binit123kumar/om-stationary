// Notifications page.
//
// Lightweight per-customer feed straight from /api/notifications.
// The list refreshes automatically every 15 seconds while open.
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead
} from '../../services/notificationService.js';
import { NotificationList } from '../../components/notifications/NotificationList.jsx';
import { readSession } from '../../services/session.js';

export function NotificationsPage() {
  const session = readSession();
  const [data, setData] = useState({ unread: 0, items: [] });
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getNotifications(50);
      setData(result);
    } catch { /* the feed stays empty on failure */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    if (session?.user?.role !== 'Customer') return undefined;
    const timer = setInterval(load, 15000);
    return () => clearInterval(timer);
  }, [load, session?.user?.role]);

  if (!session?.accessToken) {
    return (
      <div className="empty">
        <Bell size={40} />
        <h1>Sign in to see notifications</h1>
        <p>Order updates appear here once you are signed in.</p>
        <Link className="btn" to="/login">Sign in</Link>
      </div>
    );
  }

  const markAll = async () => {
    await markAllNotificationsRead();
    load();
  };

  return (
    <>
      <div className="pagehead">
        <small>NOTIFICATIONS</small>
        <h1>Your notifications</h1>
        <p>Order updates from OM Stationary. Refreshes automatically every 15 seconds.</p>
        {data.unread > 0 && (
          <button className="outline" onClick={markAll}>Mark all as read</button>
        )}
      </div>
      {loading
        ? <div className="catalog-state">Loading notifications...</div>
        : data.items.length
          ? <NotificationList notifications={data.items} onMarkRead={markNotificationRead} />
          : (
            <div className="empty">
              <Bell size={40} />
              <h2>No notifications yet</h2>
              <p>You will be notified here when your order status changes.</p>
              <Link className="btn" to="/orders">View my orders</Link>
            </div>
          )}
    </>
  );
}
