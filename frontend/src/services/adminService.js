// Admin control-centre API. Every call requires the Admin role; the caller
// passes headers built from either the admin JWT or the legacy admin key.
import { apiFetch } from './api.js';
import { ADMIN_PAGE_SIZE } from '../utils/constants.js';

export const adminHeaders = (session, legacyKey) => {
  const hasAdminSession = session?.accessToken && session?.user?.role === 'Admin';
  return {
    ...(hasAdminSession ? { Authorization: `Bearer ${session.accessToken}` } : { 'X-Admin-Key': legacyKey }),
    'Content-Type': 'application/json'
  };
};

export async function getDashboard(headers) {
  const response = await apiFetch('/api/admin/dashboard', { headers });
  return response.ok ? response.json() : null;
}

export async function getAnalytics(headers, days = 14) {
  const response = await apiFetch(`/api/admin/analytics?days=${days}`, { headers });
  return response.ok ? response.json() : null;
}

export async function getFilterOptions(headers) {
  const response = await apiFetch('/api/admin/filter-options', { headers });
  return response.ok ? response.json() : null;
}

// ---- Order management (admin) -------------------------------------------
// Filtered, paged order list. Every filter maps to a real column.
export async function listAdminOrders(headers, params = {}) {
  const query = new URLSearchParams({ page: '1', pageSize: '25', ...params });
  const response = await apiFetch(`/api/admin/orders?${query.toString()}`, { headers });
  if (response.status === 401) return response;
  if (!response.ok) throw new Error('Could not load orders.');
  return response.json();
}

// Transition an order. The server validates the transition against the
// state machine and rejects anything illegal.
export async function updateOrderStatus(id, status, headers) {
  return apiFetch(`/api/orders/${encodeURIComponent(id)}/status`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ status })
  });
}

// Confirm a COD payment as cash received.
export async function confirmOrderPayment(id, headers) {
  return apiFetch(`/api/orders/${encodeURIComponent(id)}/payment`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ status: 'Paid' })
  });
}

// Assign a delivery partner. Either a partner id (active, available)
// or a free-text partner name, plus an optional tracking code.
export async function assignDelivery(id, partner, trackingCode = '', headers) {
  const partnerId = Number.parseInt(partner, 10);
  const body = Number.isFinite(partnerId) && partnerId > 0
    ? { deliveryPartnerId: partnerId, trackingCode }
    : { partnerName: String(partner || '').trim(), trackingCode };
  return apiFetch(`/api/orders/${encodeURIComponent(id)}/delivery`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });
}

// ---- Catalogue ------------------------------------------------------------
export async function listAdminProducts(headers, params = {}) {
  const query = new URLSearchParams({ page: '1', pageSize: String(ADMIN_PAGE_SIZE), ...params });
  const response = await apiFetch('/api/admin/products?' + query.toString(), { headers });
  if (!response.ok) throw new Error('Could not load products.');
  return response.json();
}

export async function createProduct(product, headers) {
  return apiFetch('/api/admin/products', { method: 'POST', headers, body: JSON.stringify(product) });
}

export async function updateProduct(id, product, headers) {
  return apiFetch(`/api/admin/products/${encodeURIComponent(id)}`, { method: 'PUT', headers, body: JSON.stringify(product) });
}

export async function deactivateProduct(id, headers) {
  return apiFetch(`/api/admin/products/${encodeURIComponent(id)}`, { method: 'DELETE', headers });
}

export async function adjustStock(id, delta, reason = '', headers) {
  return apiFetch(`/api/admin/products/${encodeURIComponent(id)}/stock`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ delta, reason })
  });
}

// ---- Categories -----------------------------------------------------------
export async function listAdminCategories(headers) {
  const response = await apiFetch('/api/admin/categories', { headers });
  return response.ok ? response.json() : [];
}

export async function createCategory(name, isActive, headers) {
  return apiFetch('/api/admin/categories', { method: 'POST', headers, body: JSON.stringify({ name, isActive }) });
}

export async function updateCategory(id, name, isActive, headers) {
  return apiFetch(`/api/admin/categories/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ name, isActive })
  });
}

// ---- Coupons --------------------------------------------------------------
export async function listAdminCoupons(headers) {
  const response = await apiFetch('/api/admin/coupons', { headers });
  return response.ok ? response.json() : [];
}

export async function updateCoupon(id, coupon, headers) {
  return apiFetch(`/api/admin/coupons/${encodeURIComponent(id)}`, { method: 'PUT', headers, body: JSON.stringify(coupon) });
}

// ---- Customers / payments / invoices / notifications / audit --------------
export async function listAdminCustomers(headers, params = {}) {
  const query = new URLSearchParams(params);
  const response = await apiFetch('/api/admin/customers?' + query.toString(), { headers });
  return response.ok ? response.json() : { total: 0, items: [] };
}

export async function listAdminPayments(headers, params = {}) {
  const query = new URLSearchParams(params);
  const response = await apiFetch('/api/admin/payments?' + query.toString(), { headers });
  return response.ok ? response.json() : { total: 0, items: [] };
}

export async function listAdminInvoices(headers, params = {}) {
  const query = new URLSearchParams(params);
  const response = await apiFetch('/api/admin/invoices?' + query.toString(), { headers });
  return response.ok ? response.json() : { total: 0, items: [] };
}

export async function getAdminNotifications(headers) {
  const response = await apiFetch('/api/admin/notifications', { headers });
  return response.ok ? response.json() : null;
}

export async function getAdminWishlistStats(headers) {
  const response = await apiFetch('/api/admin/wishlist', { headers });
  return response.ok ? response.json() : null;
}

export async function getAuditLog(headers, take = 100) {
  const response = await apiFetch(`/api/admin/audit-log?take=${take}`, { headers });
  return response.ok ? response.json() : [];
}

// ---- Reports --------------------------------------------------------------
export async function getReport(headers, from, to) {
  const params = new URLSearchParams();
  if (from) params.set('from', from);
  if (to) params.set('to', to);
  const response = await apiFetch('/api/admin/reports?' + params.toString(), { headers });
  return response;
}

export async function exportReport(headers, report, from, to) {
  const params = new URLSearchParams({ report });
  if (from) params.set('from', from);
  if (to) params.set('to', to);
  return apiFetch('/api/admin/reports/export?' + params.toString(), { headers });
}

// ---- Settings -------------------------------------------------------------
export async function getAdminSettings(headers) {
  const response = await apiFetch('/api/admin/settings', { headers });
  return response.ok ? response.json() : null;
}

export async function saveAdminSettings(settings, headers) {
  return apiFetch('/api/admin/settings', { method: 'PUT', headers, body: JSON.stringify(settings) });
}

// ---- Partner shops (admin view) -------------------------------------------
export async function listPartnerShops(headers) {
  const response = await apiFetch('/api/partner/shops', { headers });
  return response.ok ? response.json() : [];
}

export async function setPartnerShopApproval(id, approved, headers) {
  return apiFetch(`/api/partner/shops/${encodeURIComponent(id)}/approval`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ isApproved: approved })
  });
}

// ---- Delivery management (admin view) -------------------------------------
export async function listDeliveryPartners(headers) {
  const response = await apiFetch('/api/delivery/management/partners', { headers });
  return response.ok ? response.json() : [];
}

export async function createDeliveryPartner(partner, headers) {
  return apiFetch('/api/delivery/management/partners', { method: 'POST', headers, body: JSON.stringify(partner) });
}

export async function listAllAssignments(headers) {
  const response = await apiFetch('/api/delivery/management/assignments', { headers });
  return response.ok ? response.json() : [];
}

// ---- Admin order detail ---------------------------------------------------
export async function getAdminOrder(id, headers) {
  const response = await apiFetch(`/api/admin/orders/${encodeURIComponent(id)}`, { headers });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Could not load this order.');
  return response.json();
}
