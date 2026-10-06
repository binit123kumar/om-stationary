// Account navigation sidebar.
import { Link } from 'react-router-dom';

const SECTIONS = [
  { to: '/account', label: 'Profile & addresses', end: true },
  { to: '/orders', label: 'My orders' },
  { to: '/wishlist', label: 'Wishlist' },
  { to: '/notifications', label: 'Notifications' }
];

export function AccountSidebar({ active = '/account' }) {
  return (
    <aside className="account-sidebar">
      <h3>Your account</h3>
      <nav>
        {SECTIONS.map((section) => (
          <Link
            key={section.to}
            to={section.to}
            className={active === section.to ? 'selected' : ''}
          >
            {section.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
