// Header notification badge with unread count.
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';

export function NotificationBadge({ unread = 0 }) {
  return (
    <Link to="/notifications" className="headlink" aria-label="Notifications">
      <Bell />
      <span className="badge">{unread}</span>
    </Link>
  );
}
