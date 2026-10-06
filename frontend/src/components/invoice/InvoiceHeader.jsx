// Invoice header: seller brand and invoice title block.
export function InvoiceHeader({ invoice, seller }) {
  return (
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
  );
}
