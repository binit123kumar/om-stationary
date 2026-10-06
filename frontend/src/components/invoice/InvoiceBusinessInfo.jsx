// Seller business info block. Only configured identifiers
// are shown; blanks are reported, never invented.
export function InvoiceBusinessInfo({ seller }) {
  return (
    <section className="invoice-block">
      <h2>Seller</h2>
      <p className="invoice-strong">{seller.businessName || 'OM Stationary'}</p>
      {seller.businessAddress && <p>{seller.businessAddress}</p>}
      {seller.plusCode && <p>Plus code: {seller.plusCode}</p>}
      <p>Udyam Registration: <b>{seller.udyamConfigured ? seller.udyamNumber : 'Not configured'}</b></p>
      <p>GSTIN: <b>{seller.gstinConfigured ? seller.taxNumber : 'Not configured'}</b></p>
      {seller.phone && <p>Phone: {seller.phone}</p>}
      {seller.email && <p>Email: {seller.email}</p>}
    </section>
  );
}
