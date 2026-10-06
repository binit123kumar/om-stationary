// Register form wrapper — same component as the sign-in form,
// in registration mode.
import { LoginForm } from './LoginForm.jsx';

export function RegisterForm({ onAuth }) {
  return <LoginForm register onAuth={onAuth} />;
}
