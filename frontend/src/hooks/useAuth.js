// Signed-in user session state. The session itself is stored by
// services/session.js; this hook only mirrors it into React state.
import { useCallback, useState } from 'react';
import { clearSession, readSession } from '../services/session.js';

export function useAuth() {
  const [user, setUser] = useState(() => readSession()?.user || null);

  // Called by LoginPage/RegisterPage after the API confirms the session
  // and the guest cart has been reconciled with the server cart.
  const onAuth = useCallback((nextUser) => {
    setUser(nextUser);
  }, []);

  const onLogout = useCallback(async () => {
    const session = readSession();
    try {
      if (session?.refreshToken) {
        await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/logout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken: session.refreshToken })
        });
      }
    } catch { /* best effort: the session is cleared regardless */ }
    clearSession();
    try { sessionStorage.removeItem('omadminkey'); } catch { /* ignore */ }
    setUser(null);
  }, []);

  return { user, setUser, onAuth, onLogout };
}
