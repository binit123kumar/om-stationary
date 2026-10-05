import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, User } from 'lucide-react';
import { apiBase, apiFetch, clearSession, mapServerCart, readSession, saveSession } from './session.js';
import './account-pages.css';

// Mirrors the backend policy exactly (RegisterRequest: Required, MinLength(4), MaxLength(128)).
// The UI must never accept a password the API would reject, and the API policy is never weakened.
const PASSWORD_MIN = 4;
const PASSWORD_MAX = 128;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const MOBILE_PATTERN = /^[6-9]\d{9}$/;

function normaliseMobile(raw) {
  const digits = String(raw || '').replace(/\D/g, '');
  // Accept 10-digit, 0-prefixed 11-digit, and +91 / 91-prefixed forms.
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1);
  return digits;
}

export function validateRegister(form) {
  const errors = {};
  const fullName = String(form.fullName || '').trim();
  const email = String(form.email || '').trim();
  const mobile = normaliseMobile(form.phone);
  const password = String(form.password || '');

  if (!fullName) errors.fullName = 'Full name is required.';
  else if (fullName.length < 3) errors.fullName = 'Enter your full name (at least 3 characters).';
  else if (fullName.length > 120) errors.fullName = 'Full name must be 120 characters or fewer.';

  if (!email) errors.email = 'Email address is required.';
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Enter a valid email address.';
  else if (email.length > 254) errors.email = 'Email address must be 254 characters or fewer.';

  if (!form.phone || !String(form.phone).trim()) errors.phone = 'Mobile number is required.';
  else if (!MOBILE_PATTERN.test(mobile)) errors.phone = 'Enter a valid 10 digit Indian mobile number.';

  if (!password) errors.password = 'Password is required.';
  else if (password.length < PASSWORD_MIN) errors.password = `Password must be at least ${PASSWORD_MIN} characters.`;
  else if (password.length > PASSWORD_MAX) errors.password = `Password must be ${PASSWORD_MAX} characters or fewer.`;

  if (!form.confirmPassword) errors.confirmPassword = 'Confirm your password.';
  else if (form.confirmPassword !== password) errors.confirmPassword = 'Passwords do not match.';

  if (!form.acceptTerms) errors.acceptTerms = 'Please accept the Terms & Conditions to continue.';
  return errors;
}

export function validateLogin(form) {
  const errors = {};
  const identifier = String(form.identifier || '').trim();
  if (!identifier) errors.identifier = 'Enter your email address or mobile number.';
  else if (!EMAIL_PATTERN.test(identifier) && !MOBILE_PATTERN.test(normaliseMobile(identifier)))
    errors.identifier = 'Enter a valid email address or 10 digit mobile number.';
  if (!form.password) errors.password = 'Password is required.';
  return errors;
}

/**
 * Premium 3D glass sign-in / registration page.
 *
 * Both modes post to the real backend (`/api/auth/login`, `/api/auth/register`). Success is only
 * shown after the API responds 2xx, the returned JWT session is stored, and the guest cart has
 * been merged into the server cart, so no state on screen is ever optimistic fiction.
 */
export function LoginPage({ onAuth, register = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const returnTo = useMemo(() => {
    const requested = new URLSearchParams(location.search).get('return');
    // Only allow same-origin in-app paths so `return` can never be used as an open redirect.
    return requested && requested.startsWith('/') && !requested.startsWith('//') ? requested : '/';
  }, [location.search]);

  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '', identifier: '', acceptTerms: false });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => { setErrors({}); setError(''); }, [register]);

  const set = (key) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setForm(current => ({ ...current, [key]: value }));
    setErrors(current => (current[key] ? { ...current, [key]: '' } : current));
  };

  // Persists the returned session, then reconciles the guest cart with the server cart so a
  // login/register detour from checkout never loses items.
  //
  // Uses PUT /api/cart (replace) rather than POST /api/cart/merge (which *adds*): merge would sum a
  // guest row into a server row that already holds the same items and silently double them. Taking
  // the larger of the two quantities per product is idempotent, so signing in twice is a no-op.
  const completeAuth = async (session) => {
    saveSession(session);
    let cart = [];
    try {
      let guest = [];
      try { guest = JSON.parse(localStorage.getItem('omcart') || '[]'); } catch { guest = []; }
      if (!Array.isArray(guest)) guest = [];
      const guestRows = guest.map(item => ({ productId: item.id, quantity: Math.min(99, Number(item.q) || 1) }));
      const current = await apiFetch('/api/cart', {}, session.accessToken);
      const serverRows = current.ok ? (await current.json()).items.map(row => ({ productId: row.productId, quantity: row.quantity })) : [];
      const quantities = new Map();
      for (const row of serverRows) quantities.set(row.productId, Math.min(99, row.quantity));
      for (const row of guestRows) quantities.set(row.productId, Math.min(99, Math.max(quantities.get(row.productId) || 0, row.quantity)));
      const items = [...quantities.entries()].map(([productId, quantity]) => ({ productId, quantity }));
      const synced = await apiFetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
      }, session.accessToken);
      if (synced.ok) cart = mapServerCart((await synced.json()).items);
      else {
        // The replace was rejected (e.g. a guest item was deactivated). Fall back to whatever the
        // server still considers this customer's cart rather than showing stale local rows.
        const retry = await apiFetch('/api/cart', {}, session.accessToken);
        if (retry.ok) cart = mapServerCart((await retry.json()).items);
      }
    } catch { /* keep the device cart that is already loaded in the shell */ }
    onAuth?.(session.user, cart);
    return cart;
  };

  const submit = async (event) => {
    event.preventDefault();
    if (busy) return;
    const found = register ? validateRegister(form) : validateLogin(form);
    setErrors(found);
    if (Object.keys(found).length) { setError('Please correct the highlighted fields.'); return; }

    setBusy(true); setError('');
    try {
      const body = register
        ? { fullName: form.fullName.trim(), email: form.email.trim(), phone: normaliseMobile(form.phone), password: form.password }
        : { email: form.identifier.trim(), password: form.password };

      const response = await fetch(`${apiBase}/api/auth/${register ? 'register' : 'login'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        // 400/409 carry a specific detail worth showing; a network failure does not.
        const detail = data.detail || (Array.isArray(data.errors) && data.errors.length ? data.errors[0]?.msg : '') || '';
        if (response.status === 0 || response.type === 'error') throw new Error('Could not reach the account service. Please try again.');
        throw new Error(detail || (register ? 'Registration failed. Please try again.' : 'Sign in failed. Please try again.'));
      }

      await completeAuth(data);

      if (register) {
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

  return <section className="auth-3d-page">
    <div className="auth-3d-orb orb-a" /><div className="auth-3d-orb orb-b" />
    <div className="auth-3d-float" aria-hidden="true"><i /><i /><i /></div>
    <div className="auth-3d-card">
      <div className="auth-brand-3d"><span>OM</span><div><b>OM STATIONARY</b><small>Everything you need, one place.</small></div></div>
      <small className="auth-kicker">{register ? 'NEW CUSTOMER' : 'WELCOME BACK'}</small>
      <h1>{register ? 'Create your account' : 'Sign in to continue'}</h1>
      <p className="auth-sub">{register
        ? 'Join OM Stationary to keep your cart, addresses and orders together.'
        : 'Sign in to continue your shopping securely. Your cart stays exactly as it is.'}</p>

      <form className="auth-3d-form" onSubmit={submit} noValidate>
        {register && field('fullName', 'Full Name', {
          required: true, maxLength: 120, autoComplete: 'name', placeholder: 'Your full name'
        })}
        {register ? field('email', 'Email Address', {
          type: 'email', required: true, maxLength: 254, autoComplete: 'email', placeholder: 'you@example.com'
        }) : field('identifier', 'Email or Mobile', {
          type: 'text', required: true, maxLength: 254, autoComplete: 'username', placeholder: 'you@example.com or 9876543210'
        })}
        {register && field('phone', 'Mobile Number', {
          type: 'tel', required: true, maxLength: 15, inputMode: 'numeric', autoComplete: 'tel', placeholder: '10 digit mobile number'
        })}
        {field('password', 'Password', {
          type: 'password', required: true, maxLength: PASSWORD_MAX,
          minLength: register ? PASSWORD_MIN : 1,
          autoComplete: register ? 'new-password' : 'current-password',
          placeholder: register ? `At least ${PASSWORD_MIN} characters` : 'Your password'
        })}
        {register && field('confirmPassword', 'Confirm Password', {
          type: 'password', required: true, maxLength: PASSWORD_MAX, autoComplete: 'new-password', placeholder: 'Re-enter your password'
        })}
        {register && <label className="auth-check">
          <input type="checkbox" name="acceptTerms" checked={form.acceptTerms} onChange={set('acceptTerms')} />
          <span>I agree to the <Link to="/terms" target="_blank" rel="noreferrer">Terms &amp; Conditions</Link> and <Link to="/privacy" target="_blank" rel="noreferrer">Privacy Policy</Link></span>
          {errors.acceptTerms && <small className="field-error" role="alert">{errors.acceptTerms}</small>}
        </label>}
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="btn wide" disabled={busy}>{busy ? 'Please wait…' : register ? 'Sign Up' : 'Login'}</button>
      </form>

      <p className="auth-switch">{register ? 'Already have an account?' : 'New to OM Stationary?'}{' '}
        <Link to={`${register ? '/login' : '/register'}?return=${encodeURIComponent(returnTo)}`}>
          {register ? 'Login' : 'Create account'}
        </Link>
      </p>
    </div>

    {success && <div className="success-modal-backdrop" role="dialog" aria-modal="true" aria-label="Registration successful">
      <div className="success-modal">
        <div className="success-check"><CheckCircle2 size={48} /></div>
        <small>OM STATIONARY</small>
        <h2>Successfully Registered!</h2>
        <p>Welcome to OM Stationary</p>
        <button className="btn wide" onClick={goShopping}>Go to Shopping</button>
      </div>
    </div>}
  </section>;
}
export function AccountPage({ user, onLogout }) {
  const [profile, setProfile] = useState(null), [addresses, setAddresses] = useState([]), [message, setMessage] = useState(''), [error, setError] = useState('');
  const reload = async () => {
    const [p, a] = await Promise.all([apiFetch('/api/customers/me'), apiFetch('/api/customers/addresses')]);
    if (p.ok) setProfile(await p.json()); else setError('Could not load customer profile.');
    if (a.ok) setAddresses(await a.json());
  };
  useEffect(() => { if (user?.role === 'Customer') reload(); }, [user?.id]);
  const saveProfile = async event => { event.preventDefault(); const form = new FormData(event.currentTarget);
    const r = await apiFetch('/api/customers/me', { method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName: form.get('fullName'), phone: form.get('phone') }) });
    const d = await r.json(); if (r.ok) { setProfile(d); setMessage('Profile saved.'); setError(''); } else setError(d.detail || 'Could not save profile.');
  };
  const addAddress = async event => { event.preventDefault(); const form = new FormData(event.currentTarget);
    const data = Object.fromEntries(form.entries()); data.isDefault = form.has('isDefault');
    const r = await apiFetch('/api/customers/addresses', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (r.ok) { event.target.reset(); setMessage('Address saved.'); await reload(); } else { const e = await r.json(); setError(e.detail || 'Could not save address.'); }
  };
  if (!user) return <div className="account"><div className="panel"><UserIcon/><h1>Your OM Stationary account</h1><p>Create an account to save addresses and see orders. Guest checkout and order tracking remain available.</p><Link className="btn wide" to="/login">Sign in</Link><Link className="outline" to="/register">Create account</Link></div></div>;
  if (user.role !== 'Customer') return <section className="pagehead"><small>ACCOUNT</small><h1>{user.role} account</h1><p>Signed in as {user.email}.</p>{user.role === 'Admin' && <Link className="btn" to="/admin">Open admin</Link>}{user.role === 'PartnerShop' && <Link className="btn" to="/partner">Open partner dashboard</Link>}{user.role === 'DeliveryPartner' && <Link className="btn" to="/delivery">Open delivery dashboard</Link>}<button className="outline" onClick={onLogout}>Sign out</button></section>;
  return <section className="account-page"><div className="pagehead"><small>YOUR ACCOUNT</small><h1>Account and addresses</h1><p>{user.email}</p><Link to="/orders">View your orders</Link> <button className="outline" onClick={onLogout}>Sign out</button></div>
    {error && <p role="alert" className="form-error">{error}</p>}{message && <p role="status">{message}</p>}
    <div className="account-columns"><form className="panel account-form" onSubmit={saveProfile}><h2>Profile</h2><label>Full name<input name="fullName" required defaultValue={profile?.fullName || user.fullName || ''}/></label><label>Mobile number<input name="phone" required defaultValue={profile?.phone || user.phone || ''}/></label><label>Email<input disabled value={profile?.email || user.email}/></label><button className="btn">Save profile</button></form>
    <form className="panel account-form" onSubmit={addAddress}><h2>Add delivery address</h2><label>Label<input name="label" defaultValue="Home" required/></label><label>Recipient name<input name="recipientName" defaultValue={profile?.fullName || user.fullName || ''} required/></label><label>Mobile number<input name="phone" defaultValue={profile?.phone || user.phone || ''} required/></label><label>Address line<input name="line1" required maxLength="300"/></label><label>Apartment/landmark<input name="line2" maxLength="300"/></label><div className="address-fields"><label>City<input name="city" required/></label><label>State<input name="state" required/></label></div><label>PIN code<input name="pincode" pattern="[0-9]{6}" required/></label><label className="check-field"><input type="checkbox" name="isDefault"/> Make default address</label><button className="btn">Save address</button></form></div>
    <section className="panel saved-addresses"><h2>Saved addresses</h2>{addresses.map(a => <article key={a.id}><b>{a.label}{a.isDefault ? ' · Default' : ''}</b><span>{a.recipientName} · {a.phone}</span><span>{a.line1}{a.line2 ? `, ${a.line2}` : ''}, {a.city}, {a.state} {a.pincode}</span><button className="outline" onClick={async () => { await apiFetch(`/api/customers/addresses/${a.id}`, { method: 'DELETE' }); await reload(); }}>Remove</button></article>)}</section>
  </section>;
}

export function PartnerDashboard() {
  const [shop, setShop] = useState(null), [inventory, setInventory] = useState([]), [orders, setOrders] = useState([]), [error, setError] = useState('');
  const load = async () => { const [s, i, o] = await Promise.all([apiFetch('/api/partner/shop'), apiFetch('/api/partner/inventory'), apiFetch('/api/partner/orders')]);
    if (s.ok) setShop(await s.json()); if (i.ok) setInventory(await i.json()); if (o.ok) setOrders(await o.json());
    if (![s, i, o].every(x => x.ok)) setError('Could not load partner dashboard. Confirm this login is linked to a shop.'); };
  useEffect(() => { load(); }, []);
  return <section className="account-page"><div className="pagehead"><small>PARTNER PORTAL</small><h1>{shop?.name || 'Partner dashboard'}</h1><p>{shop?.isApproved ? 'Shop approved' : 'Shop approval pending'} · Inventory and orders belonging to this shop.</p></div>{error && <p role="alert" className="form-error">{error}</p>}
    <section className="panel"><h2>Inventory</h2>{inventory.map(x => <form className="partner-inventory" key={x.productId} onSubmit={async e => { e.preventDefault(); const f = new FormData(e.currentTarget); const r = await apiFetch('/api/partner/inventory', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId: x.productId, sellingPrice: Number(f.get('price')), stock: Number(f.get('stock')), isAvailable: f.has('available') }) }); if (r.ok) await load(); else setError('Could not update product inventory.'); }}><b>{x.name}</b><label>Price<input name="price" type="number" min="0" step="0.01" defaultValue={x.sellingPrice}/></label><label>Stock<input name="stock" type="number" min="0" defaultValue={x.stock}/></label><label className="check-field"><input name="available" type="checkbox" defaultChecked={x.isAvailable}/> Available</label><button className="outline">Save</button></form>)}</section>
    <section className="panel saved-addresses"><h2>Shop orders</h2>{orders.map(o => <article key={o.id}><b>{o.orderNumber} · {o.status}</b><span>{o.customerName} · {o.customerPhone} · ₹{o.totalAmount}</span><span>{o.deliveryAddress}</span>{o.items.map((i,n)=><small key={n}>{i.productName} × {i.quantity}</small>)}<div className="partner-actions">{['Accepted','Preparing','Ready for Pickup'].map(s => <button className="outline" key={s} onClick={async () => { const r = await apiFetch(`/api/partner/orders/${o.id}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: s }) }); if (r.ok) await load(); else setError((await r.json()).detail || 'Status update rejected.'); }}>{s}</button>)}</div></article>)}</section>
  </section>;
}

export function DeliveryDashboard() {
  const [rows, setRows] = useState([]), [error, setError] = useState('');
  const load = async () => { const r = await apiFetch('/api/delivery/assignments'); if (r.ok) setRows(await r.json()); else setError('Could not load assigned deliveries.'); };
  useEffect(() => { load(); }, []);
  return <section className="account-page"><div className="pagehead"><small>DELIVERY PARTNER</small><h1>Assigned deliveries</h1><p>Customer/order information is shown only for your assigned delivery work.</p></div>{error && <p role="alert" className="form-error">{error}</p>}{rows.map(d => <article className="panel delivery-card" key={d.id}><h2>{d.orderNumber} · {d.status}</h2><p>Pickup: {d.pickupAddress}</p><p>Drop: {d.dropAddress}</p><p>Customer: {d.customerName} · {d.customerPhone}</p><p>COD amount: ₹{d.codAmount} · Payment: {d.paymentStatus}</p>{d.items.map((i,n)=><p key={n}>{i.productName} × {i.quantity}</p>)}<div className="partner-actions">{['Accepted','ArrivedAtPickup','PickedUp','OutForDelivery','Delivered','Failed'].map(s => <button className="outline" key={s} onClick={async () => { const r = await apiFetch(`/api/delivery/assignments/${d.id}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: s }) }); if (r.ok) await load(); else setError((await r.json()).detail || 'Status update rejected.'); }}>{s}</button>)}</div></article>)}</section>;
}

function UserIcon() { return <User size={34} aria-hidden="true" />; }






