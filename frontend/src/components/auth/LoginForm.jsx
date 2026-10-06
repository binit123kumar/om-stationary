// Sign-in / registration form.
//
// Both modes post to the real backend (`/api/auth/login`, `/api/auth/register`).
// Success is only shown after the API responds 2xx, the returned JWT session
// is stored, and the guest cart has been merged into the server cart, so no
// state on screen is ever optimistic fiction.
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { apiBase, mapServerCart, saveSession } from '../../services/session.js';
import { mergeGuestCart } from '../../services/cartService.js';
import { login, register } from '../../services/authService.js';
import {
  normaliseMobile,
  PASSWORD_MAX,
  PASSWORD_MIN,
  validateLogin,
  validateRegister
} from '../../utils/validation.js';
import { AuthError } from './AuthError.jsx';
import { AuthSuccessModal } from './AuthSuccessModal.jsx';
import { PasswordField } from './PasswordField.jsx';

export function LoginForm({ onAuth, register: registerMode = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const returnTo = useMemo(() => {
    const requested = new URLSearchParams(location.search).get('return');
    // Only allow same-origin in-app paths so `return` can never be used as an open redirect.
    return requested && requested.startsWith('/') && !requested.startsWith('//') ? requested : '/';
  }, [location.search]);

  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', password: '', confirmPassword: '', identifier: '', acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => { setErrors({}); setError(''); }, [registerMode]);

  const set = (key) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => (current[key] ? { ...current, [key]: '' } : current));
  };

  // Persists the returned session, then reconciles the guest cart with the
  // server cart so a login/register detour from checkout never loses items.
  //
  // Uses PUT /api/cart (replace) rather than POST /api/cart/merge (which
  // *adds*): merge would sum a guest row into a server row that already holds
  // the same items and silently double them. Taking the larger of the two
  // quantities per product is idempotent, so signing in twice is a no-op.
  const completeAuth = async (session) => {
    saveSession(session);
    let cart = [];
    try {
      let guest = [];
      try { guest = JSON.parse(localStorage.getItem('omcart') || '[]'); } catch { guest = []; }
      if (!Array.isArray(guest)) guest = [];
      const guestRows = guest.map((item) => ({
        productId: item.id,
        quantity: Math.min(99, Number(item.q) || 1)
      }));
      const synced = await mergeGuestCart(guestRows, session.accessToken);
      if (synced.ok) cart = mapServerCart((await synced.json()).items);
      else {
        // The replace was rejected (e.g. a guest item was deactivated). Fall back
        // to whatever the server still considers this customer's cart rather than
        // showing stale local rows.
        const retry = await fetch(`${apiBase}/api/cart`, {
          headers: { Authorization: `Bearer ${session.accessToken}` }
        });
        if (retry.ok) cart = mapServerCart((await retry.json()).items);
      }
    } catch { /* keep the device cart that is already loaded in the shell */ }
    onAuth?.(session.user, cart);
    return cart;
  };

  const submit = async (event) => {
    event.preventDefault();
    if (busy) return;
    const found = registerMode ? validateRegister(form) : validateLogin(form);
    setErrors(found);
    if (Object.keys(found).length) { setError('Please correct the highlighted fields.'); return; }

    setBusy(true);
    setError('');
    try {
      const response = registerMode
        ? await register({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: normaliseMobile(form.phone),
          password: form.password
        })
        : await login(form.identifier.trim(), form.password);
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        // 400/409 carry a specific detail worth showing; a network failure does not.
        const detail = data.detail || (Array.isArray(data.errors) && data.errors.length ? data.errors[0]?.msg : '') || '';
        if (response.status === 0 || response.type === 'error') throw new Error('Could not reach the account service. Please try again.');
        throw new Error(detail || (registerMode ? 'Registration failed. Please try again.' : 'Sign in failed. Please try again.'));
      }

      await completeAuth(data);

      if (registerMode) {
        // The popup is shown only because the API confirmed the account was created.
        setSuccess(true);
      } else {
        navigate(returnTo, { replace: true });
      }
    } catch (e) {
      setError(e?.message || 'Could not connect to the account service.');
    } finally {
      setBusy(false);
    }
  };

  const goShopping = () => {
    setSuccess(false);
    // Registration always lands on the shopping dashboard, per the customer flow requirement.
    navigate(returnTo === '/' ? '/' : returnTo, { replace: true });
  };

  const field = (key, label, extra = {}) => (
    <label key={key}>
      {label}
      <input
        name={key}
        value={form[key]}
        onChange={set(key)}
        aria-invalid={errors[key] ? 'true' : undefined}
        {...extra}
      />
      {errors[key] && <small className="field-error" role="alert">{errors[key]}</small>}
    </label>
  );

  return (
    <section className="auth-3d-page">
      <div className="auth-3d-orb orb-a" /><div className="auth-3d-orb orb-b" />
      <div className="auth-3d-float" aria-hidden="true"><i /><i /><i /></div>
      <div className="auth-3d-card">
        <div className="auth-brand-3d">
          <span>OM</span>
          <div><b>OM STATIONARY</b><small>Everything you need, one place.</small></div>
        </div>
        <small className="auth-kicker">{registerMode ? 'NEW CUSTOMER' : 'WELCOME BACK'}</small>
        <h1>{registerMode ? 'Create your account' : 'Sign in to continue'}</h1>
        <p className="auth-sub">{registerMode
          ? 'Join OM Stationary to keep your cart, addresses and orders together.'
          : 'Sign in to continue your shopping securely. Your cart stays exactly as it is.'}</p>

        <form className="auth-3d-form" onSubmit={submit} noValidate>
          {registerMode && field('fullName', 'Full Name', {
            required: true, maxLength: 120, autoComplete: 'name', placeholder: 'Your full name'
          })}
          {registerMode
            ? field('email', 'Email Address', {
              type: 'email', required: true, maxLength: 254, autoComplete: 'email', placeholder: 'you@example.com'
            })
            : field('identifier', 'Email or Mobile', {
              type: 'text', required: true, maxLength: 254, autoComplete: 'username',
              placeholder: 'you@example.com or 9876543210'
            })}
          {registerMode && field('phone', 'Mobile Number', {
            type: 'tel', required: true, maxLength: 15, inputMode: 'numeric',
            autoComplete: 'tel', placeholder: '10 digit mobile number'
          })}
          <PasswordField
            value={form.password}
            onChange={set('password')}
            error={errors.password}
            registerMode={registerMode}
          />
          {registerMode && field('confirmPassword', 'Confirm Password', {
            type: 'password', required: true, maxLength: PASSWORD_MAX,
            autoComplete: 'new-password', placeholder: 'Re-enter your password'
          })}
          {registerMode && (
            <label className="auth-check">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={form.acceptTerms}
                onChange={set('acceptTerms')}
              />
              <span>
                I agree to the <Link to="/terms" target="_blank" rel="noreferrer">Terms &amp; Conditions</Link>{' '}
                and <Link to="/privacy" target="_blank" rel="noreferrer">Privacy Policy</Link>
              </span>
              {errors.acceptTerms && <small className="field-error" role="alert">{errors.acceptTerms}</small>}
            </label>
          )}
          <AuthError message={error} />
          <button className="btn wide" type="submit" disabled={busy}>
            {busy ? 'Please wait…' : registerMode ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <p className="auth-switch">
          {registerMode ? 'Already have an account?' : 'New to OM Stationary?'}{' '}
          <Link to={`${registerMode ? '/login' : '/register'}?return=${encodeURIComponent(returnTo)}`}>
            {registerMode ? 'Login' : 'Create account'}
          </Link>
        </p>
      </div>

      {success && <AuthSuccessModal onContinue={goShopping} />}
    </section>
  );
}
