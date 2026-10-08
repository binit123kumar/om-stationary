// Product detail info block: category, brand, description, price,
// stock state and purchase actions.
import { Plus, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductImage } from './ProductImage.jsx';
import { ProductStock } from './ProductStock.jsx';
import { ProductWishlistButton } from './ProductWishlistButton.jsx';
import { ProductPrice } from './ProductPrice.jsx';
import { ProductQuantity } from './ProductQuantity.jsx';

export function ProductInfo({
  product: p,
  wishlist = [],
  toggleWishlist,
  onAdd,
  onAddQuantity,
  onBuyNow
}) {
  const [quantity, setQuantity] = useState(1);
  const saved = wishlist.includes(p.id);
  const outOfStock = p.stock !== undefined && Number(p.stock) <= 0;
  return (
    <div className="product-info">
      <small>{p.cat}</small>
      <h1>{p.name}</h1>
      {p.brand && <p>{p.brand}</p>}
      <p>{p.desc || p.shortDesc || 'Product details will be updated by OM Stationary.'}</p>
      <ProductPrice price={p.price} mrp={p.mrp} />
      <ProductStock product={p} />
      <p className="tax-note">Final price and availability are confirmed by the shop at order placement.</p>
      <div className="deliverybox">
        <b>Choose delivery or pickup at checkout</b>
        <span>Delivery is shown only for configured cities and verified shop stock. You can also select the official OM Stationary Pickup Station.</span>
      </div>
      <div className="purchase-actions">
        <ProductWishlistButton saved={saved} productId={p.id} toggleWishlist={toggleWishlist} />
        <ProductQuantity quantity={quantity} onChange={setQuantity} max={Math.min(99, p.stock > 0 ? p.stock : 99)} />
        <button className="btn" disabled={outOfStock} onClick={() => (onAddQuantity ? onAddQuantity(p, quantity) : onAdd?.(p))}>
          <Plus size={17} /> Add to cart
        </button>
        <button className="outline" disabled={outOfStock} onClick={() => onBuyNow?.(p, quantity)}>
          Buy now
        </button>
      </div>
      <div className="product-trust">
        <ShieldCheck size={17} /> Cash on delivery available. Online payments are not yet configured.
      </div>
      <Link className="back" to="/search">&larr; Back to products</Link>
    </div>
  );
}
