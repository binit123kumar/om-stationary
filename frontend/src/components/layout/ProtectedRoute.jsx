// Route guards. The storefront guards only redirect; the API remains
// the source of truth for authorisation.
import { Navigate, useLocation } from 'react-router-dom';
import { readSession } from '../../services/session.js';

export function ProtectedRoute({ children, roles = null }) {
  const session = readSession();
  const location = useLocation();

  if (!session?.accessToken || !session?.user) {
    return <Navigate to={`/login?return=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  }
  if (roles && !roles.includes(session.user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
}

// Admin screens keep the in-page sign-in panel from the original
// implementation: a customer without the admin key sees the
// panel instead of a hard redirect.
export function AdminRoute({ children, adminSignedIn, fallback }) {
  if (adminSignedIn) return children;
  return fallback || null;
}

export function RoleRoute({ children, role, user, fallback = null }) {
  if (user?.role === role) return children;
  return fallback;
}
