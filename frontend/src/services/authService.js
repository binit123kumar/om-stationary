// Authentication API calls. Session storage itself lives in services/session.js.
import { apiFetch } from './api.js';
import { apiBase } from './session.js';

export async function login(email, password) {
  const response = await fetch(`${apiBase}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.trim(), password })
  });
  return response;
}

export async function register(payload) {
  const response = await fetch(`${apiBase}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return response;
}

export async function logout(refreshToken) {
  if (!refreshToken) return null;
  return apiFetch('/api/auth/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken })
  }).catch(() => null);
}

export async function getMe() {
  return apiFetch('/api/auth/me');
}
