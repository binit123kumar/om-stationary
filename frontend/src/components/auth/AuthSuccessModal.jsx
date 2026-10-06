// Registration success modal — shown only after the API
// confirmed the account was created.
import { CheckCircle2 } from 'lucide-react';

export function AuthSuccessModal({ onContinue }) {
  return (
    <div
      className="success-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Registration successful"
    >
      <div className="success-modal">
        <div className="success-check"><CheckCircle2 size={48} /></div>
        <small>OM STATIONARY</small>
        <h2>Successfully Registered!</h2>
        <p>Welcome to OM Stationary</p>
        <button className="btn wide" onClick={onContinue}>Go to Shopping</button>
      </div>
    </div>
  );
}
