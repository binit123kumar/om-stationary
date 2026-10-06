// Admin screens retain their existing in-page sign-in fallback behavior.
export function AdminRoute({ children, adminSignedIn, fallback = null }) {
  return adminSignedIn ? children : fallback;
}
