import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiBase, apiFetch, clearSession, mapServerCart, readSession, saveSession } from './session.js';
import './account-pages.css';

export function LoginPage({ onAuth, register = false }) {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async event => {
    event.preventDefault(); setBusy(true); setError('');
    const form = new FormData(event.currentTarget);
    const body = register
      ? { email: form.get('email'), phone: form.get('phone'), fullName: form.get('name'), password: form.get('password') }
      : { email: form.get('email'), password: form.get('password') };
    try {
      const response = await fetch(`${apiBase}/api/auth/${register ? 'register' : 'login'}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Sign in failed. Check your details and try again.');
      saveSession(data);
      let cart = [];
      try {
        const guest = JSON.parse(localStorage.getItem('omcart') || '[]');
        const merged = await apiFetch('/api/cart/merge', { method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: Array.isArray(guest) ? guest.map(item => ({ productId: item.id, quantity: item.q })) : [] }) }, data.accessToken);
        if (merged.ok) { const result = await merged.json(); cart = mapServerCart(result.items); }
      } catch { /* Keep the signed-in session usable if a saved guest cart cannot be merged. */ }
      onAuth(data.user, cart);
    } catch (e) { setError(e.message || 'Could not connect to the account service.'); }
    finally { setBusy(false); }
  };
  return <section className="account-page"><div className="panel auth-panel"><small>OM STATIONARY ACCOUNT</small><h1>{register ? 'Create your account' : 'Welcome back'}</h1>
    <p>{register ? 'Save addresses and view your orders on this device.' : 'Sign in to view saved addresses and account orders.'}</p>
    <form className="account-form" onSubmit={submit}>
      {register && <label>Full name<input name="name" required maxLength="120" autoComplete="name"/></label>}
      <label>Email<input name="email" type="email" required maxLength="254" autoComplete="email"/></label>
      {register && <label>Mobile number<input name="phone" type="tel" required maxLength="20" autoComplete="tel"/></label>}
      <label>Password<input name="password" type="password" required minLength={register ? 10 : 1} maxLength="128" autoComplete={register ? 'new-password' : 'current-password'}/></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="btn wide" disabled={busy}>{busy ? 'Please wait…' : register ? 'Create account' : 'Sign in'}</button>
    </form>
    <p className="account-switch">{register ? 'Already registered?' : 'New to OM Stationary?'} <Link to={register ? '/login' : '/register'}>{register ? 'Sign in' : 'Create an account'}</Link></p>
  </div></section>;
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
    if (r.ok) { event.currentTarget.reset(); setMessage('Address saved.'); await reload(); } else { const e = await r.json(); setError(e.detail || 'Could not save address.'); }
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

function UserIcon() { return <span aria-hidden="true">OM</span>; }
