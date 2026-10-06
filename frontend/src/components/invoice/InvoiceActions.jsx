// Invoice action bar: navigation, PDF download and print.
import { Link } from 'react-router-dom';
import { ArrowLeft, Printer, Receipt } from 'lucide-react';

export function InvoiceActions({ invoiceNumber, downloading, onDownload }) {
  return (
    <div className="invoice-actions">
      <div className="invoice-actions-left">
        <Link className="outline" to="/orders">
          <ArrowLeft size={16} /> Back to order
        </Link>
        <Link className="outline" to={`/track/${encodeURIComponent(invoiceNumber)}`}>
          Track order
        </Link>
      </div>
      <div className="invoice-actions-right">
        <Link className="outline" to="/search">Continue shopping</Link>
        <button className="outline" onClick={onDownload} disabled={downloading}>
          <Receipt size={16} /> {downloading ? 'Preparing PDF...' : 'Download PDF'}
        </button>
        {/* Browser print dialog is a separate fallback for the same document. */}
        <button className="btn" onClick={() => window.print()}>
          <Printer size={16} /> Print
        </button>
      </div>
    </div>
  );
}
