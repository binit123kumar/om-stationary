// Admin sign-in gate.
//
// An admin account JWT signs in through the normal login flow.
// The legacy admin access key is kept for store staff who do not
// have a web account; it is stored in sessionStorage only.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminKey } from '../../hooks/useAdmin.js';

export function AdminSignIn() {
  const { key, entry, setEntry, saveKey } = useAdminKey();

  return (
    <div className="account panel">
      <h1>Admin sign in</h1>
      <p>Sign in with an Admin account to manage orders, catalogue and stock.</p>
      <Link className="btn wide" to="/login">Sign in</Link>
      <form onSubmit={saveKey}>
        <label className="field-label">
          Legacy admin access key
          <input
            type="password"
            value={entry}
            onChange={(event) => setEntry(event.target.value)}
          />
        </label>
        <button className="outline wide" type="submit">Use legacy key</button>
      </form>
      {key && <p className="muted">A legacy key is active for this tab.</p>}
    </div>
  );
}
