// Single cart line: image, name, category, discount, quantity
// stepper and line total.
import { Link } from 'react-router-dom';
import { Minus, PackageCheck, Plus } from 'lucide-react';
import { CartQuantityControl } from './CartQuantityControl.jsx';
import { formatNumber } from '../../utils/formatCurrency.js';

export function CartItem({ item, onChange, onRemove }) {
  const discount = item.mrp > item.price
    ? Math.round((1 - item.price / item.mrp) * 100)
    : 0;

  return (
    <div className="cartitem">
      <Link to={'/product/' + item.id}>
        {item.img
          ? <img src={item.img} alt={item.name} />
          : <span className="image-placeholder"><PackageCheck /></span>}
      </Link>
      <div className="cartitem-body">
        <Link to={'/product/' + item.id}><b>{item.name}</b></Link>
        <small>{item.cat}</small>
        {item.mrp > item.price && (
          <span className="discount">{discount}% off</span>
        )}
        <CartQuantityControl
          quantity={item.q}
          label={item.name}
          onChange={(delta) => onChange(item.id, delta)}
        />
      </div>
      <div className="cartitem-end">
        <strong>&#8377;{formatNumber(Number(item.price) * item.q)}</strong>
        <small>&#8377;{formatNumber(item.price)} each</small>
        <button type="button" className="cart-remove" onClick={() => onRemove(item.id)}>
          Remove
        </button>
      </div>
    </div>
  );
}
