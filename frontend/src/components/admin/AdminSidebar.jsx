// Admin side navigation. Every link is a real route in the
// admin section of the application.
import { NavLink } from 'react-router-dom';

const NAV = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/orders', label: 'Orders' },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/products/new', label: 'Add product' },
  { to: '/admin/categories', label: 'Categories' },
  { to: '/admin/inventory', label: 'Inventory' },
  { to: '/admin/customers', label: 'Customers' },
  { to: '/admin/payments', label: 'Payments' },
  { to: '/admin/coupons', label: 'Coupons' },
  { to: '/admin/delivery', label: 'Delivery' },
  { to: '/admin/partners', label: 'Partner shops' },
  { to: '/admin/reports', label: 'Reports' },
  { to: '/admin/invoices', label: 'Invoices' },
  { to: '/admin/notifications', label: 'Notifications' },
  { to: '/admin/whatsapp', label: 'WhatsApp' },
  { to: '/admin/settings', label: 'Settings' },
  { to: '/admin/audit-logs', label: 'Audit logs' }
];

export function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-side-brand">
        <b>OM</b> STATIONARY
        <small>Control centre</small>
      </div>
      <nav aria-label="Admin">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => (isActive ? 'admin-nav selected' : 'admin-nav')}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
