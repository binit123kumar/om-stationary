// Product detail info block: category, brand, description, price,
// stock state and purchase actions.
import { Heart, Plus, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductImage } from './ProductImage.jsx';
import { ProductStock } from './ProductStock.jsx';
import { ProductWishlistButton } from './ProductWishlistButton.jsx';

export function ProductInfo({
  product: p,
  wishlist = [],
  toggleWishlist,
  onAdd,
  onBuyNow
}) {
  const saved = wishlist.includes(p.id);
  return (
    <div className="product-info">
      <small>{p.cat}</small>
      <h1>{p.name}</h1>
      {p.brand && <p>{p.brand}</p>}
      <p>{p.desc || p.shortDesc || 'Product details will be updated by OM Stationary.'}</p>
      <div className="bigprice">
        &#8377;{Number(p.price).toLocaleString('en-IN')}
        {p.mrp > p.price && <del>&#8377;{Number(p.mrp).toLocaleString('en-IN')}</del>}
      </div>
      <ProductStock product={p} />
      <p className="tax-note">Final price and availability are confirmed by the shop at order placement.</p>
      <div className="deliverybox">
        <b>Choose delivery or pickup at checkout</b>
        <span>Delivery is shown only for configured cities and verified shop stock. You can also select the official OM Stationary Pickup Station.</span>
      </div>
      <div className="purchase-actions">
        <button className="wishlist-detail" onClick={() => toggleWishlist?.(p.id)}>
          <Heart size={17} fill={saved ? 'currentColor' : 'none'} />
          {saved ? 'Saved' : 'Save'}
        </button>
        <button className="btn" onClick={() => onAdd?.(p)}>
          <Plus size={17} /> Add to cart
        </button>
        <button className="outline" onClick={() => onBuyNow?.(p)}>
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
