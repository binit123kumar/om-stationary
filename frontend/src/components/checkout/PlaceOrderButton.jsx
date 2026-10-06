// Place-order button with the exact label the customer
// needs for the payment method they chose.
import { Button } from '../common/Button.jsx';
import { rupees } from '../../utils/formatCurrency.js';

export function PlaceOrderButton({
  placing,
  ready,
  payment,
  onlineUpiAvailable,
  grandTotal,
  onPlace
}) {
  const allowed = ready && (payment !== 'UPI' || onlineUpiAvailable);
  const label = placing
    ? 'Placing your order…'
    : payment === 'UPI'
      ? `Pay ${rupees(grandTotal)} by UPI`
      : 'Place order · Pay on Shop';

  return (
    <Button
      wide
      busy={placing}
      disabled={!allowed}
      onClick={onPlace}
    >
      {label}
    </Button>
  );
}
