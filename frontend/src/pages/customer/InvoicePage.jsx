// A4 tax invoice page.
//
// Rendered entirely from GET /api/orders/{orderNumber}/invoice.
// Nothing on this page is calculated or invented in the browser:
// totals, GST, per-line amounts, the seller identifiers and the
// transaction reference all come from the confirmed backend order.
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlertTriangle, Receipt } from 'lucide-react';
import { downloadInvoicePdf, getInvoice } from '../../services/invoiceService.js';
import { InvoiceActions } from '../../components/invoice/InvoiceActions.jsx';
import { InvoiceBusinessInfo } from '../../components/invoice/InvoiceBusinessInfo.jsx';
import { InvoiceCustomerInfo } from '../../components/invoice/InvoiceCustomerInfo.jsx';
import { InvoiceFooter } from '../../components/invoice/InvoiceFooter.jsx';
import { InvoiceHeader } from '../../components/invoice/InvoiceHeader.jsx';
import { InvoiceItemsTable } from '../../components/invoice/InvoiceItemsTable.jsx';
import { InvoiceTotals } from '../../components/invoice/InvoiceTotals.jsx';
import { paymentLabel } from '../../utils/formatOrderStatus.js';
import { readTrackingToken } from '../../utils/storage.js';

export function InvoicePage() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    getInvoice(id, readTrackingToken(id))
      .then(async (response) => {
        if (response.status === 404) {
          throw new Error('This invoice is not available. It can only be seen by the customer who placed the order, an admin, or someone holding the order tracking link.');
        }
        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(body?.detail || body?.title || 'The invoice could not be loaded. Please try again.');
        }
        return response.json();
      })
      .then((data) => { if (active) setInvoice(data); })
      .catch((e) => { if (active) setError(e.message || 'The invoice could not be loaded.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  const isPaid = useMemo(
    () => String(invoice?.paymentStatus || '').toLowerCase() === 'paid',
    [invoice?.paymentStatus]
  );

  // Downloads the server-rendered PDF from
  // GET /api/orders/{orderNumber}/invoice/pdf. The browser print
  // dialog stays as a separate fallback.
  const downloadPdf = async () => {
    setDownloading(true);
    setDownloadError('');
    try {
      const response = await downloadInvoicePdf(id, readTrackingToken(id));
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.detail || body?.title || 'The PDF could not be generated. Please try again.');
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Invoice-${(invoice?.invoiceNumber || id).replace(/[^A-Za-z0-9._-]/g, '')}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      setDownloadError(e.message || 'The PDF could not be generated. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return <div className="catalog-state">Preparing your invoice…</div>;

  if (error) {
    return (
      <div className="empty">
        <Receipt size={44} />
        <h1>Invoice unavailable</h1>
        <p>{error}</p>
        <Link className="btn" to="/orders">Go to orders</Link>
        <Link className="outline" to="/search">Continue shopping</Link>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="empty">
        <Receipt size={44} />
        <h1>Invoice unavailable</h1>
        <Link className="btn" to="/orders">Go to orders</Link>
      </div>
    );
  }

  const lines = invoice.lines || [];
  const seller = invoice.seller || {};
  const buyer = invoice.buyer || {};
  const payment = invoice.payment || {};

  return (
    <section className="invoice-page">
      <InvoiceActions
        invoiceNumber={invoice.orderNumber || id}
        downloading={downloading}
        onDownload={downloadPdf}
      />
      {downloadError && <p className="form-error" role="alert">{downloadError}</p>}

      {!isPaid && (
        <p className="invoice-notice" role="status">
          <AlertTriangle size={16} />
          {payment.isCod
            ? 'Payment status: Pending. Pay on Shop (COD) is recorded as due and becomes Paid only when the store confirms the cash receipt.'
            : 'Payment status: Pending. This invoice is not a payment receipt until the OM Stationary service verifies the online payment.'}
        </p>
      )}

      <article className="professional-invoice" id="om-invoice">
        <InvoiceHeader invoice={invoice} seller={seller} />

        <dl className="invoice-facts">
          <div><dt>Invoice Number</dt><dd>{invoice.invoiceNumber}</dd></div>
          <div><dt>Invoice Date</dt><dd>{new Date(invoice.invoiceDate).toLocaleDateString('en-IN')}</dd></div>
          <div><dt>Order Number</dt><dd>{invoice.orderNumber}</dd></div>
          <div><dt>Fulfillment Method</dt><dd>{invoice.fulfillmentMethod || 'Pickup'}</dd></div>
        </dl>

        <div className="invoice-meta-grid">
          <InvoiceBusinessInfo seller={seller} />
          <InvoiceCustomerInfo buyer={buyer} invoice={invoice} />
        </div>

        <InvoiceItemsTable lines={lines} taxRatePercent={invoice.taxRatePercent} />

        <div className="invoice-bottom">
          <section className="invoice-payment">
            <h2>Payment</h2>
            <p>Payment Method: <b>{paymentLabel(payment.method || invoice.paymentMethod)}</b></p>
            <p>
              Payment Status:
              <b className={isPaid ? 'status-paid' : 'status-pending'}>
                {invoice.paymentStatus || 'Pending'}
              </b>
            </p>
            {payment.provider && (
              <p>Gateway: {payment.provider}{payment.providerStatus ? ` (${payment.providerStatus})` : ''}</p>
            )}
            {/* The reference is only ever what the gateway actually returned. */}
            <p>Transaction ID: <b>{payment.transactionId || 'Not available'}</b></p>
            <p>Order Number: <b>{invoice.orderNumber}</b></p>
            <p>Fulfillment Method: <b>{invoice.fulfillmentMethod || 'Pickup'}</b></p>
            {invoice.couponCode && <p>Coupon: {invoice.couponCode}</p>}
          </section>
          <InvoiceTotals invoice={invoice} />
        </div>

        <InvoiceFooter invoice={invoice} seller={seller} />
      </article>
    </section>
  );
}
