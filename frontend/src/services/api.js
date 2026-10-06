// The single API client for the whole application. Every service in this folder
// goes through apiFetch so auth headers, 401 refresh and base-URL handling exist
// in exactly one place.
import { refreshSession, readSession } from './session.js';

export async function apiFetch(path, options = {}, tokenOverride = null) {
  const session = readSession();
  const send = (token) => {
    const headers = new Headers(options.headers || {});
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return fetch(path.startsWith('http') ? path : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${path}`, { ...options, headers });
  };
  const response = await send(tokenOverride || session?.accessToken);
  if (response.status !== 401 || tokenOverride || !session?.refreshToken) return response;
  const nextSession = await refreshSession(session);
  return nextSession?.accessToken ? send(nextSession.accessToken) : response;
}

// Turns any failed fetch into a customer-safe message. Stack traces and raw HTML
// never reach the UI.
export async function readFailure(response, fallback) {
  if (response.status === 0) return 'Could not reach the OM Stationary service. Please check your connection and try again.';
  if (response.status === 429) return 'Too many requests. Please wait a moment and try again.';
  const body = await response.json().catch(() => ({}));
  const detail = body?.detail || body?.title ||
    (Array.isArray(body?.errors) && body.errors.length ? body.errors[0]?.msg : '');
  return typeof detail === 'string' && detail.trim() ? detail : fallback;
}
