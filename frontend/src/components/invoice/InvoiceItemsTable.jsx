// Invoice line items table. The rows, rates, discounts and
// tax amounts are the confirmed values from the API.
import { rupees } from '../../utils/formatCurrency.js';

export function InvoiceItemsTable({ lines = [], taxRatePercent = 0 }) {
  return (
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
          <th className="c-num">GST ({Number(taxRatePercent || 0).toLocaleString('en-IN')}%)</th>
          <th className="c-num">Amount</th>
        </tr>
      </thead>
      <tbody>
        {lines.map((line, index) => (
          <tr key={`${line.ProductName}-${index}`}>
            <td className="c-sno">{index + 1}</td>
            <td className="c-item">{line.ProductName}</td>
            <td className="c-sku">{line.HsnSku || '—'}</td>
            <td className="c-num">{line.Quantity}</td>
            <td className="c-num">{rupees(line.Rate)}</td>
            <td className="c-num">{rupees(line.Discount)}</td>
            <td className="c-num">{rupees(line.TaxableAmount)}</td>
            <td className="c-num">{rupees(line.TaxAmount)}</td>
            <td className="c-num">{rupees(line.Amount)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
