// Forgot-password panel.
//
// The backend exposes no password-reset endpoint, so this is an
// honest "unavailable" state — no fake reset link is ever shown
// or sent.
import { Mail } from 'lucide-react';

export function ForgotPassword() {
  return (
    <div className="panel forgot-password">
      <h2>Forgot your password?</h2>
      <p>
        <Mail size={16} /> Self-service password reset is not enabled for this store yet.
      </p>
      <p>
        Visit OM Stationary during business hours or call the store — the team will
        verify your account and help you sign in again.
      </p>
    </div>
  );
}
