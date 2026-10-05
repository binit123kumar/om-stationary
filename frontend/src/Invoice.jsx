import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  AlertTriangle, ArrowLeft, ChevronRight, Printer, Receipt, ShieldCheck, Truck
} from 'lucide-react';
import { apiFetch } from './session.js';

const rupees = (value) => '\u20b9' + Number(value || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const PAYMENT_LABEL = { 'Paytm UPI': 'Online Payment (UPI)', COD: 'Pay on Shop (COD)' };

function paymentLabel(method) { return PAYMENT_LABEL[method] || method || 'Not recorded'; }

/**
 * A4 tax invoice rendered entirely from `GET /api/orders/{orderNumber}/invoice`.
 *
 * Nothing on this page is calculated or invented in the browser: totals, GST, per-line amounts,
 * the seller identifiers and the transaction reference all come from the confirmed backend order.
 */
export function InvoicePage() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState('');

  /**
   * Downloads the server-rendered PDF from GET /api/orders/{orderNumber}/invoice/pdf.
   * The browser print dialog stays as a separate fallback. Both actions are real: the PDF is
   * produced by InvoiceService on the API, not assembled in the browser, and the endpoint applies
   * the same owner/admin/tracking-token authorisation as the invoice on screen.
   */
  const downloadPdf = async () => {
    setDownloading(true); setDownloadError('');
    try {
      const token = localStorage.getItem(`omtrack:${id}`) || '';
      const response = await apiFetch(`/api/orders/${encodeURIComponent(id)}/invoice/pdf`, { headers: { 'X-Tracking-Token': token } });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.detail || body?.title || 'The PDF could not be generated. Please try again.');
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Invoice-${(invoice?.invoiceNumber || id).replace(/[^A-Za-z0-9._-]/g, '')}.pdf`;
      document.body.appendChild(link); link.click(); link.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      setDownloadError(e.message || 'The PDF could not be generated. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    let active = true;
    setLoading(true); setError('');
    const token = localStorage.getItem(`omtrack:${id}`) || '';
    apiFetch(`/api/orders/${encodeURIComponent(id)}/invoice`, { headers: { 'X-Tracking-Token': token } })
      .then(async response => {
        if (response.status === 404) throw new Error('This invoice is not available. It can only be seen by the customer who placed the order, an admin, or someone holding the order tracking link.');
        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(body?.detail || body?.title || 'The invoice could not be loaded. Please try again.');
        }
        return response.json();
      })
      .then(data => { if (active) setInvoice(data); })
      .catch(e => { if (active) setError(e.message || 'The invoice could not be loaded.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  const isPaid = useMemo(() => String(invoice?.paymentStatus || '').toLowerCase() === 'paid', [invoice?.paymentStatus]);

  if (loading) return <div className="catalog-state">Preparing your invoice…</div>;

  if (error) return <div className="empty">
    <Receipt size={44} /><h1>Invoice unavailable</h1><p>{error}</p>
    <Link className="btn" to="/orders">Go to orders</Link>
    <Link className="outline" to="/search">Continue shopping</Link>
  </div>;

  if (!invoice) return <div className="empty"><Receipt size={44} /><h1>Invoice unavailable</h1>
    <Link className="btn" to="/orders">Go to orders</Link></div>;

  const lines = invoice.lines || [];
  const seller = invoice.seller || {};
  const buyer = invoice.buyer || {};
  const payment = invoice.payment || {};

  return <section className="invoice-page">
    <div className="invoice-actions">
      <div className="invoice-actions-left">
        <Link className="outline" to="/orders"><ArrowLeft size={16} /> Back to order</Link>
        <Link className="outline" to={`/track/${encodeURIComponent(invoice.orderNumber || id)}`}>Track order</Link>
      </div>
      <div className="invoice-actions-right">
        <Link className="outline" to="/search">Continue shopping</Link>
        <button className="outline" onClick={downloadPdf} disabled={downloading}>
          <Receipt size={16} /> {downloading ? 'Preparing PDF...' : 'Download PDF'}
        </button>
        {/* Browser print dialog is a separate fallback for the same document. */}
        <button className="btn" onClick={() => window.print()}><Printer size={16} /> Print</button>
      </div>
    </div>
    {downloadError && <p className="form-error" role="alert">{downloadError}</p>}

    {!isPaid && <p className="invoice-notice" role="status">
      <AlertTriangle size={16} />
      {payment.isCod
        ? 'Payment status: Pending. Pay on Shop (COD) is recorded as due and becomes Paid only when the store confirms the cash receipt.'
        : 'Payment status: Pending. This invoice is not a payment receipt until the OM Stationary service verifies the online payment.'}
    </p>}

    <article className="professional-invoice" id="om-invoice">
      <header className="invoice-header">
        <div className="invoice-seller">
          <div className="invoice-logo">OM<span>.</span></div>
          <b>{(seller.businessName || 'OM STATIONARY').toUpperCase()}</b>
          <small>Everything You Need, One Place</small>
        </div>
        <div className="invoice-title">
          <small>TAX INVOICE</small>
          <h1>{invoice.invoiceNumber}</h1>
          <span>Date: {new Date(invoice.invoiceDate).toLocaleString('en-IN')}</span>
        </div>
      </header>

      <dl className="invoice-facts">
        <div><dt>Invoice Number</dt><dd>{invoice.invoiceNumber}</dd></div>
        <div><dt>Invoice Date</dt><dd>{new Date(invoice.invoiceDate).toLocaleDateString('en-IN')}</dd></div>
        <div><dt>Order Number</dt><dd>{invoice.orderNumber}</dd></div>
        <div><dt>Fulfillment Method</dt><dd>{invoice.fulfillmentMethod || 'Pickup'}</dd></div>
      </dl>

      <div className="invoice-meta-grid">
        <section className="invoice-block">
          <h2>Seller</h2>
          <p className="invoice-strong">{seller.businessName || 'OM Stationary'}</p>
          {seller.businessAddress && <p>{seller.businessAddress}</p>}
          {seller.plusCode && <p>Plus code: {seller.plusCode}</p>}
          {/* Only configured identifiers are shown; blanks are reported, never invented. */}
          <p>Udyam Registration: <b>{seller.udyamConfigured ? seller.udyamNumber : 'Not configured'}</b></p>
          <p>GSTIN: <b>{seller.gstinConfigured ? seller.taxNumber : 'Not configured'}</b></p>
          {seller.phone && <p>Phone: {seller.phone}</p>}
          {seller.email && <p>Email: {seller.email}</p>}
        </section>

        <section className="invoice-block">
          <h2>Billed To</h2>
          <p className="invoice-strong">{buyer.name || '-'}</p>
          {buyer.phone && <p>Mobile: {buyer.phone}</p>}
          {buyer.email && <p>Email: {buyer.email}</p>}
          {buyer.billingAddress && <p>Billing address: {buyer.billingAddress}</p>}
          {invoice.fulfillmentMethod !== 'Pickup' && buyer.shippingAddress && <p>Delivery address: {buyer.shippingAddress}</p>}
          {invoice.fulfillmentMethod === 'Pickup' && <p>Fulfilled by store pickup</p>}
        </section>
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th className="c-sno">S.No.</th>
            <th className="c-item">Item Name</th>
            <th className="c-sku">HSN/SKU</th>
            <th className="c-num">Qty</th>
            <th className="c-num">Rate</th>
            <th className="c-num">Discount</th>
            <th className="c-num">Taxable Amount</th>
            <th className="c-num">GST ({Number(invoice.taxRatePercent || 0).toLocaleString('en-IN')}%)</th>
            <th className="c-num">Amount</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line, index) => <tr key={`${line.ProductName}-${index}`}>
            <td className="c-sno">{index + 1}</td>
            <td className="c-item">{line.ProductName}</td>
            <td className="c-sku">{line.HsnSku || '—'}</td>
            <td className="c-num">{line.Quantity}</td>
            <td className="c-num">{rupees(line.Rate)}</td>
            <td className="c-num">{rupees(line.Discount)}</td>
            <td className="c-num">{rupees(line.TaxableAmount)}</td>
            <td className="c-num">{rupees(line.TaxAmount)}</td>
            <td className="c-num">{rupees(line.Amount)}</td>
          </tr>)}
        </tbody>
      </table>

      <div className="invoice-bottom">
        <section className="invoice-payment">
          <h2>Payment</h2>
          <p>Payment Method: <b>{paymentLabel(payment.method || invoice.paymentMethod)}</b></p>
          <p>Payment Status: <b className={isPaid ? 'status-paid' : 'status-pending'}>{invoice.paymentStatus || 'Pending'}</b></p>
          {payment.provider && <p>Gateway: {payment.provider}{payment.providerStatus ? ` (${payment.providerStatus})` : ''}</p>}
          {/* The reference is only ever what the gateway actually returned. */}
          <p>Transaction ID: <b>{payment.transactionId || 'Not available'}</b></p>
          <p>Order Number: <b>{invoice.orderNumber}</b></p>
          <p>Fulfillment Method: <b>{invoice.fulfillmentMethod || 'Pickup'}</b></p>
          {invoice.couponCode && <p>Coupon: {invoice.couponCode}</p>}
        </section>

        <section className="invoice-totals">
          <p><span>Subtotal</span><b>{rupees(invoice.subtotal)}</b></p>
          <p><span>Discount</span><b>&minus; {rupees(invoice.discount)}</b></p>
          <p><span>Taxable Value</span><b>{rupees(invoice.taxableValue)}</b></p>
          <p><span>GST {Number(invoice.taxRatePercent || 0).toLocaleString('en-IN')}%</span><b>{rupees(invoice.taxAmount)}</b></p>
          <p><span>Delivery</span><b>{Number(invoice.deliveryCharge) > 0 ? rupees(invoice.deliveryCharge) : 'Free'}</b></p>
          <p className="invoice-grand"><span>Grand Total</span><b>{rupees(invoice.grandTotal)}</b></p>
          {invoice.amountInWords && <p className="invoice-words">Amount in words: {invoice.amountInWords}</p>}
        </section>
      </div>

      <footer className="invoice-footer">
        <p><ShieldCheck size={14} /> {isPaid ? 'Payment verified. Thank you for shopping with OM Stationary.' : 'Computer-generated invoice. Keep this bill for your records.'}</p>
        <p>{invoice.fulfillmentMethod === 'Pickup' ? <><Truck size={14} /> Collect from OM Stationary, {seller.businessAddress}</> : <><Truck size={14} /> Delivered by OM Stationary</>}</p>
        <p>This is a system generated invoice. For any correction, contact the store with the order number above. <ChevronRight size={12} /></p>
      </footer>
    </article>
  </section>;
}