// Buyer info block.
export function InvoiceCustomerInfo({ buyer, invoice }) {
  return (
    <section className="invoice-block">
      <h2>Billed To</h2>
      <p className="invoice-strong">{buyer.name || '—'}</p>
      {buyer.phone && <p>Mobile: {buyer.phone}</p>}
      {buyer.email && <p>Email: {buyer.email}</p>}
      {buyer.billingAddress && <p>Billing address: {buyer.billingAddress}</p>}
      {invoice.fulfillmentMethod !== 'Pickup' && buyer.shippingAddress && (
        <p>Delivery address: {buyer.shippingAddress}</p>
      )}
      {invoice.fulfillmentMethod === 'Pickup' && <p>Fulfilled by store pickup</p>}
    </section>
  );
}
