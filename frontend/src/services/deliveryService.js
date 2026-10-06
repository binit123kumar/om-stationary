// Delivery configuration API (public): serviceable cities, charges and quotes.
import { apiFetch } from './api.js';

export async function getDeliveryOptions() {
  const response = await apiFetch('/api/delivery/options');
  return response.ok ? response.json() : null;
}

export async function getDeliveryQuote(payload) {
  return apiFetch('/api/delivery/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

// Store location (pickup station address, hours, map pins).
export async function getPickupLocation() {
  const response = await apiFetch('/api/locations/om-stationary');
  return response.ok ? response.json() : null;
}

// ---- Delivery partner portal (DeliveryPartner role) ---------------------
// The signed-in delivery partner's own assignments. The Bearer token is
// attached automatically by apiFetch.
export async function getMyAssignments() {
  const response = await apiFetch('/api/delivery/assignments');
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Could not load your deliveries.');
  return response.json();
}

// Advance one assignment. The server only permits the next legal
// delivery states for the current status.
export async function updateAssignmentStatus(id, status) {
  const response = await apiFetch(`/api/delivery/assignments/${encodeURIComponent(id)}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  if (!response.ok) throw new Error('This delivery cannot move to that status.');
  return response.json();
}
