// WhatsApp Business Cloud API integration settings (admin only).
// The access token lives in server configuration and is never returned
// by the API, so nothing sensitive can leak to the browser.
import { apiFetch } from './api.js';

export async function getWhatsAppConfig(headers, params = {}) {
  const query = new URLSearchParams({ take: '50', ...params });
  const response = await apiFetch(`/api/admin/whatsapp?${query.toString()}`, { headers });
  if (!response.ok) throw new Error((await response.json().catch(() => ({}))).detail || 'Could not load WhatsApp settings.');
  return response.json();
}

export async function saveWhatsAppSettings(patch, headers) {
  const response = await apiFetch('/api/admin/whatsapp/settings', {
    method: 'PUT',
    headers,
    body: JSON.stringify(patch)
  });
  if (!response.ok) throw new Error((await response.json().catch(() => ({}))).detail || 'Could not save WhatsApp settings.');
  return response.json();
}

export async function sendWhatsAppTest(headers) {
  const response = await apiFetch('/api/admin/whatsapp/test', { method: 'POST', headers });
  return response;
}

export async function retryWhatsAppNotification(id, headers) {
  const response = await apiFetch(`/api/admin/whatsapp/${encodeURIComponent(id)}/retry`, { method: 'POST', headers });
  return response;
}
