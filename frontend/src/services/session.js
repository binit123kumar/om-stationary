// Session persistence for the signed-in user. The session lives in
// sessionStorage so it disappears with the tab; refresh tokens let the API
// client silently renew short-lived JWTs.
import { API_BASE } from '../utils/constants.js';

export const apiBase = API_BASE;
const SESSION_KEY = 'omSession';
let refreshInFlight = null;

export function readSession() {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); }
  catch { return null; }
}

export function saveSession(session) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function clearSession() { sessionStorage.removeItem(SESSION_KEY); }

async function refreshSession(session) {
  if (!session?.refreshToken) return null;
  if (!refreshInFlight) {
    refreshInFlight = fetch(`${apiBase}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: session.refreshToken })
    }).then(async (response) => {
      if (!response.ok) throw new Error('Session expired');
      return saveSession(await response.json());
    }).catch(() => { clearSession(); return null; })
      .finally(() => { refreshInFlight = null; });
  }
  return refreshInFlight;
}

export { refreshSession };

// Maps the server cart rows to the shape the storefront cart state uses.
export function mapServerCart(rows = []) {
  return rows.map((row) => ({
    id: row.productId,
    q: row.quantity,
    name: row.name,
    cat: row.category,
    price: row.price,
    mrp: row.mrp,
    img: row.imageUrl
  }));
}
