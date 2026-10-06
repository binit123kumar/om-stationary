// Stepper for product quantities (1-99, matching the cart limits).
import { Minus, Plus } from 'lucide-react';

export function ProductQuantity({ quantity, onChange, min = 1, max = 99 }) {
  const value = Math.max(min, Math.min(max, Number(quantity) || min));
  return (
    <div className="qty-mini">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Minus size={14} />
      </button>
      <b>{value}</b>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
