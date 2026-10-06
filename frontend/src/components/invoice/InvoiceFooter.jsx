// Invoice footer note.
import { ChevronRight, ShieldCheck, Truck } from 'lucide-react';

export function InvoiceFooter({ invoice, seller }) {
  const paid = String(invoice.paymentStatus || '').toLowerCase() === 'paid';
  return (
    <footer className="invoice-footer">
      <p>
        <ShieldCheck size={14} />
        {paid
          ? ' Payment verified. Thank you for shopping with OM Stationary.'
          : ' Computer-generated invoice. Keep this bill for your records.'}
      </p>
      <p>
        {invoice.fulfillmentMethod === 'Pickup'
          ? (<><Truck size={14} /> Collect from OM Stationary, {seller.businessAddress}</>)
          : (<><Truck size={14} /> Delivered by OM Stationary</>)}
      </p>
      <p>
        This is a system generated invoice. For any correction, contact the store
        with the order number above. <ChevronRight size={12} />
      </p>
    </footer>
  );
}
