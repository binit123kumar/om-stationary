// Inline auth error.
export function AuthError({ message }) {
  if (!message) return null;
  return <p className="form-error" role="alert">{message}</p>;
}
