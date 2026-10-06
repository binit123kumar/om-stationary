// Payment gateway API: options, UPI intent creation and status verification.
// The backend payment service is the only authority on whether a payment succeeded.
import { apiFetch } from './api.js';

export async function getPaymentOptions() {
  const response = await apiFetch('/api/payments/options');
  return response.ok ? response.json() : null;
}

export async function createPaymentIntent(orderNumber) {
  return apiFetch(`/api/payments/orders/${encodeURIComponent(orderNumber)}/intent`, { method: 'POST' });
}

export async function verifyPayment(orderNumber, trackingToken = '') {
  return apiFetch(`/api/payments/orders/${encodeURIComponent(orderNumber)}/status`, {
    method: 'POST',
    headers: { 'X-Tracking-Token': trackingToken }
  });
}
