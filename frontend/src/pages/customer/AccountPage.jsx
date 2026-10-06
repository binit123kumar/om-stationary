// Account page: profile, saved addresses and links to
// orders, wishlist and notifications.
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { apiFetch } from '../../services/api.js';
import { AddressForm } from '../../components/account/AddressForm.jsx';
import { AddressList } from '../../components/account/AddressList.jsx';
import { ProfileForm } from '../../components/account/ProfileForm.jsx';

export function AccountPage({ user, onLogout }) {
  const [profile, setProfile] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const reload = async () => {
    const [p, a] = await Promise.all([
      apiFetch('/api/customers/me'),
      apiFetch('/api/customers/addresses')
    ]);
    if (p.ok) setProfile(await p.json());
    else setError('Could not load customer profile.');
    if (a.ok) setAddresses(await a.json());
  };

  useEffect(() => {
    if (user?.role === 'Customer') reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const saveProfile = async (event) => {
    event.preventDefault();
    setBusy(true);
    const form = new FormData(event.currentTarget);
    const response = await apiFetch('/api/customers/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName: form.get('fullName'), phone: form.get('phone') })
    });
    const data = await response.json();
    if (response.ok) {
      setProfile(data);
      setMessage('Profile saved.');
      setError('');
    } else {
      setError(data.detail || 'Could not save profile.');
    }
    setBusy(false);
  };

  const addAddress = async (event) => {
    event.preventDefault();
    setBusy(true);
    const form = new FormData(event.currentTarget);
    const data = Object.fromEntries(form.entries());
    data.isDefault = form.has('isDefault');
    const response = await apiFetch('/api/customers/addresses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      event.target.reset();
      setMessage('Address saved.');
      await reload();
    } else {
      const body = await response.json();
      setError(body.detail || 'Could not save address.');
    }
    setBusy(false);
  };

  const removeAddress = async (address) => {
    await apiFetch(`/api/customers/addresses/${address.id}`, { method: 'DELETE' });
    await reload();
  };

  if (!user) {
    return (
      <div className="account">
        <div className="panel">
          <User size={34} aria-hidden="true" />
          <h1>Your OM Stationary account</h1>
          <p>Create an account to save addresses and see orders. Guest checkout and order tracking remain available.</p>
          <Link className="btn wide" to="/login">Sign in</Link>
          <Link className="outline" to="/register">Create account</Link>
        </div>
      </div>
    );
  }

  if (user.role !== 'Customer') {
    return (
      <section className="pagehead">
        <small>ACCOUNT</small>
        <h1>{user.role} account</h1>
        <p>Signed in as {user.email}.</p>
        {user.role === 'Admin' && <Link className="btn" to="/admin">Open admin</Link>}
        {user.role === 'PartnerShop' && <Link className="btn" to="/partner">Open partner dashboard</Link>}
        {user.role === 'DeliveryPartner' && <Link className="btn" to="/delivery">Open delivery dashboard</Link>}
        <button className="outline" onClick={onLogout}>Sign out</button>
      </section>
    );
  }

  return (
    <section className="account-page">
      <div className="pagehead">
        <small>YOUR ACCOUNT</small>
        <h1>Account and addresses</h1>
        <p>{user.email}</p>
        <Link to="/orders">View your orders</Link>
        <button className="outline" onClick={onLogout}>Sign out</button>
      </div>

      {error && <p role="alert" className="form-error">{error}</p>}
      {message && <p role="status">{message}</p>}

      <div className="account-columns">
        <ProfileForm profile={profile} user={user} onSave={saveProfile} busy={busy} />
        <AddressForm profile={profile} user={user} onSave={addAddress} busy={busy} />
      </div>
      <AddressList addresses={addresses} onRemove={removeAddress} />
    </section>
  );
}
