// Partner shop portal API. All endpoints require the PartnerShop role.
import { apiFetch } from './api.js';

export async function getPartnerShop() {
  return apiFetch('/api/partner/shop');
}

export async function updatePartnerShop(shop) {
  return apiFetch('/api/partner/shop', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(shop)
  });
}

export async function getPartnerInventory() {
  const response = await apiFetch('/api/partner/inventory');
  return response.ok ? response.json() : [];
}

export async function updatePartnerInventory(entry) {
  return apiFetch('/api/partner/inventory', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry)
  });
}

export async function getPartnerOrders() {
  const response = await apiFetch('/api/partner/orders');
  return response.ok ? response.json() : [];
}

export async function updatePartnerOrderStatus(id, status) {
  return apiFetch(`/api/partner/orders/${encodeURIComponent(id)}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
}

export async function registerPartnerShop(payload) {
  return apiFetch('/api/partner/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}
