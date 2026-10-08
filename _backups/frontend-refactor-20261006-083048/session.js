const configuredApiBase = import.meta.env.VITE_API_URL;
export const apiBase = configuredApiBase === undefined
  ? 'http://localhost:5000'
  : configuredApiBase.replace(/\/$/, '');
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
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: session.refreshToken })
    }).then(async response => {
      if (!response.ok) throw new Error('Session expired');
      return saveSession(await response.json());
    }).catch(() => { clearSession(); return null; }).finally(() => { refreshInFlight = null; });
  }
  return refreshInFlight;
}

export async function apiFetch(path, options = {}, tokenOverride = null) {
  const session = readSession();
  const send = token => {
    const headers = new Headers(options.headers || {});
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return fetch(path.startsWith('http') ? path : `${apiBase}${path}`, { ...options, headers });
  };
  const response = await send(tokenOverride || session?.accessToken);
  if (response.status !== 401 || tokenOverride || !session?.refreshToken) return response;
  const nextSession = await refreshSession(session);
  return nextSession?.accessToken ? send(nextSession.accessToken) : response;
}

export function mapServerCart(rows = []) {
  return rows.map(row => ({ id: row.productId, q: row.quantity, name: row.name, cat: row.category,
    price: row.price, mrp: row.mrp, img: row.imageUrl }));
}

