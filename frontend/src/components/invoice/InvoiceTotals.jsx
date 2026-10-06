// Invoice totals block — every value from the API.
import { rupees } from '../../utils/formatCurrency.js';

export function InvoiceTotals({ invoice }) {
  return (
    <section className="invoice-totals">
      <p><span>Subtotal</span><b>{rupees(invoice.subtotal)}</b></p>
      <p><span>Discount</span><b>&minus; {rupees(invoice.discount)}</b></p>
      <p><span>Taxable Value</span><b>{rupees(invoice.taxableValue)}</b></p>
      <p>
        <span>GST {Number(invoice.taxRatePercent || 0).toLocaleString('en-IN')}%</span>
        <b>{rupees(invoice.taxAmount)}</b>
      </p>
      <p>
        <span>Delivery</span>
        <b>{Number(invoice.deliveryCharge) > 0 ? rupees(invoice.deliveryCharge) : 'Free'}</b>
      </p>
      <p className="invoice-grand">
        <span>Grand Total</span>
        <b>{rupees(invoice.grandTotal)}</b>
      </p>
      {invoice.amountInWords && (
        <p className="invoice-words">Amount in words: {invoice.amountInWords}</p>
      )}
    </section>
  );
}
