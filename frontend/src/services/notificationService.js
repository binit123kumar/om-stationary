// Per-customer notification feed API.
import { apiFetch } from './api.js';

export async function getNotifications(take = 30) {
  const response = await apiFetch(`/api/notifications?take=${take}`);
  if (!response.ok) return { unread: 0, items: [] };
  return response.json();
}

export async function markNotificationRead(id) {
  return apiFetch(`/api/notifications/${encodeURIComponent(id)}/read`, { method: 'POST' });
}

export async function markAllNotificationsRead() {
  return apiFetch('/api/notifications/read-all', { method: 'POST' });
}
