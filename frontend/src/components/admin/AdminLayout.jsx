// Admin application shell — a separate navigation frame,
// not a customer page. All admin pages render inside it.
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LayoutGrid, LogOut, ShieldAlert } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar.jsx';

export function AdminLayout({ user, onLogout, children }) {
  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader user={user} onLogout={onLogout} />
        <div className="admin-content">
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
}

// Re-exported for convenience in pages that build their own frame.
export function AdminBrandLink() {
  return (
    <Link className="admin-brand" to="/admin">
      <ShieldAlert size={17} />
      <span>OM</span> ADMIN
    </Link>
  );
}

export function AdminHomeLink() {
  const navigate = useNavigate();
  return (
    <Link to="/admin" className="outline" onClick={(event) => { event.preventDefault(); navigate('/admin'); }}>
      <LayoutGrid size={15} /> Dashboard
    </Link>
  );
}
