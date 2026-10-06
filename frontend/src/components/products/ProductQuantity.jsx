import { Plus } from 'lucide-react';

export function ProductQuantity({ quantity, setQuantity, stock, onAdd }) {
  return <div className="add-row">
    <div className="qty-mini">
      <button type="button" onClick={() => setQuantity(value => Math.max(1, value - 1))}>−</button>
      <b>{quantity}</b>
      <button type="button" disabled={stock !== null && quantity >= stock} onClick={() => setQuantity(value => Math.min(99, stock ?? 99, value + 1))}>+</button>
    </div>
    <button className="add" disabled={stock !== null && (stock < 1 || quantity > stock)} onClick={onAdd}><Plus size={16} /> Add {quantity}</button>
  </div>;
}
