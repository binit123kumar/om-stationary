// Orders API: placement, tracking, status workflow and admin transitions.
import { apiFetch } from './api.js';

// Creates an order. The server re-verifies stock, price, delivery charge and GST.
export async function createOrder(payload) {
  return apiFetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

// Public tracking lookup. The tracking token is issued when the order is placed.
export async function getOrderByNumber(orderNumber, trackingToken = '') {
  return apiFetch('/api/orders/' + encodeURIComponent(orderNumber), {
    headers: { 'X-Tracking-Token': trackingToken }
  });
}

export async function getCustomerOrders() {
  return apiFetch('/api/customers/orders');
}

export async function getStatusWorkflow() {
  const response = await apiFetch('/api/orders/status-workflow');
  return response.ok ? response.json() : null;
}

// Admin transitions.
export async function listAdminOrders(headers) {
  return apiFetch('/api/orders', { headers });
}

export async function updateOrderStatus(id, status, headers) {
  return apiFetch(`/api/orders/${encodeURIComponent(id)}/status`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ status })
  });
}

export async function confirmOrderPayment(id, headers) {
  return apiFetch(`/api/orders/${encodeURIComponent(id)}/payment`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ status: 'Paid' })
  });
}

export async function assignDelivery(id, partnerName, trackingCode, headers) {
  return apiFetch(`/api/orders/${encodeURIComponent(id)}/delivery`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ partnerName, trackingCode })
  });
}

// Coupon validation happens against the real coupon table before an order is placed.
export async function validateCoupon(code, items) {
  return apiFetch('/api/coupons/validate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, items })
  });
}
