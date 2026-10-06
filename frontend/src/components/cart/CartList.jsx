// Cart line list.
import { CartItem } from './CartItem.jsx';

export function CartList({ items, onChange, onRemove }) {
  return (
    <div>
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onChange={onChange}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
