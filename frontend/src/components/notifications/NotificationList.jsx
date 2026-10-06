// Customer notification feed.
import { Link } from 'react-router-dom';
import { formatDateTime } from '../../utils/formatDate.js';

export function NotificationItem({ notification, onMarkRead }) {
  return (
    <article className={notification.isRead ? 'notification' : 'notification unread'}>
      <div>
        <b>{notification.title}</b>
        <p>{notification.message}</p>
        <small>{formatDateTime(notification.createdAt)}</small>
      </div>
      <div className="notification-actions">
        {notification.orderNumber && (
          <Link className="outline" to={'/track/' + encodeURIComponent(notification.orderNumber)}>
            Track
          </Link>
        )}
        {notification.orderNumber && (
          <Link className="outline" to={`/invoice/${encodeURIComponent(notification.orderNumber)}`}>
            Invoice
          </Link>
        )}
        {!notification.isRead && (
          <button
            type="button"
            className="outline"
            onClick={() => onMarkRead?.(notification.id)}
          >
            Mark read
          </button>
        )}
      </div>
    </article>
  );
}

export function NotificationList({ notifications = [], onMarkRead }) {
  return (
    <div className="notification-list">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkRead={onMarkRead}
        />
      ))}
    </div>
  );
}
