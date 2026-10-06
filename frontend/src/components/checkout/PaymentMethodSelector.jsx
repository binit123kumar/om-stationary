// Payment method choice: exact-amount UPI QR or cash on delivery.
import { Radio } from '../common/Radio.jsx';
import { Banknote, QrCode } from 'lucide-react';

export function PaymentMethodSelector({ payment, onlineUpiAvailable, paymentOptions, onChange }) {
  return (
    <div className="payment-choice-grid">
      <Radio
        name="payment"
        value="UPI"
        label="Online Payment (UPI)"
        hint={onlineUpiAvailable
          ? `Pay the exact amount by QR (${paymentOptions?.onlineProvider || 'UPI'})`
          : 'Not available for this store yet'}
        checked={payment === 'UPI'}
        disabled={!onlineUpiAvailable}
        icon={<QrCode size={22} />}
        onChange={() => onChange('UPI')}
      />
      <Radio
        name="payment"
        value="COD"
        label="Pay on Shop (COD)"
        hint="Pay cash when you collect your order"
        checked={payment === 'COD'}
        icon={<Banknote size={22} />}
        onChange={() => onChange('COD')}
      />
    </div>
  );
}
