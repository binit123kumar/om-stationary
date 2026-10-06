// Sign-in page.
import { LoginForm } from '../../components/auth/LoginForm.jsx';

export function LoginPage({ onAuth }) {
  return <LoginForm onAuth={onAuth} />;
}
