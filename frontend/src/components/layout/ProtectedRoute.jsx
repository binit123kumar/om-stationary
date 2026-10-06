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

