// Invoice API. The invoice document and the PDF are both produced by the
// backend InvoiceService — nothing is calculated in the browser.
import { apiFetch } from './api.js';

export async function getInvoice(orderNumber, trackingToken = '') {
  return apiFetch(`/api/orders/${encodeURIComponent(orderNumber)}/invoice`, {
    headers: { 'X-Tracking-Token': trackingToken }
  });
}

export async function downloadInvoicePdf(orderNumber, trackingToken = '') {
  return apiFetch(`/api/orders/${encodeURIComponent(orderNumber)}/invoice/pdf`, {
    headers: { 'X-Tracking-Token': trackingToken }
  });
}
