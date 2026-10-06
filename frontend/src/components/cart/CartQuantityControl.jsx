// Quantity stepper inside a cart line.
import { Minus, Plus } from 'lucide-react';

export function CartQuantityControl({ quantity, label, onChange }) {
  return (
    <div className="qty">
      <button
        type="button"
        aria-label={'Decrease ' + label}
        onClick={() => onChange(-1)}
      >
        <Minus />
      </button>
      <b>{quantity}</b>
      <button
        type="button"
        aria-label={'Increase ' + label}
        onClick={() => onChange(1)}
      >
        <Plus />
      </button>
    </div>
  );
}
