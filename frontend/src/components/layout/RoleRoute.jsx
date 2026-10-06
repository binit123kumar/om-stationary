export function RoleRoute({ children, role, user, fallback = null }) {
  return user?.role === role ? children : fallback;
}
