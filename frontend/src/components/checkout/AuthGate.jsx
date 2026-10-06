// Blocks checkout until the customer is authenticated. The cart is
// never cleared or reset by the detour, and after signing in the
// customer lands straight back on /checkout.
import { Link } from 'react-router-dom';
import { Lock, ShieldCheck, Store } from 'lucide-react';

export function AuthGate({ reason }) {
  const next = '/checkout';
  return (
    <section className="auth-3d-page">
      <div className="auth-3d-orb orb-a" /><div className="auth-3d-orb orb-b" />
      <div className="auth-3d-card">
        <div className="auth-brand-3d">
          <span>OM</span>
          <div><b>OM STATIONARY</b><small>Everything you need, one place.</small></div>
        </div>
        <small className="auth-kicker">SECURE CHECKOUT</small>
        <h1>Sign in to continue</h1>
        <p className="auth-sub">
          {reason || 'Checkout needs an account so your order, invoice and tracking are saved to your profile.'}
        </p>
        <div className="auth-gate-points">
          <p><Lock size={16} /> Your cart is kept exactly as it is</p>
          <p><ShieldCheck size={16} /> Order and invoice stay linked to your account</p>
          <p><Store size={16} /> Track every order from your account</p>
        </div>
        <div className="auth-gate-actions">
          <Link className="btn wide" to={`/login?return=${encodeURIComponent(next)}`}>Login</Link>
          <Link className="outline wide" to={`/register?return=${encodeURIComponent(next)}`}>Create account</Link>
        </div>
        <p className="auth-switch"><Link to="/cart">Back to cart</Link></p>
      </div>
    </section>
  );
}
