// Product card used across home, search, wishlist and related grids.
// All data comes through props — nothing is hardcoded.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Plus } from 'lucide-react';
import { ProductImage } from './ProductImage.jsx';
import { ProductPrice } from './ProductPrice.jsx';
import { ProductQuantity } from './ProductQuantity.jsx';
import { ProductWishlistButton } from './ProductWishlistButton.jsx';
import { ProductStock } from './ProductStock.jsx';

export function ProductCard({ product: p, add, addN, saved = false, toggleWishlist }) {
  const [qty, setQty] = useState(1);
  const discount = p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0;
  // addN applies the whole quantity in one update; the loop version could
  // desync the header count.
  const addQty = () => (addN ? addN(p, qty) : add(p));

  return (
    <article className="card">
      <Link className="card-image" to={'/product/' + p.id}>
        <ProductImage product={p} />
      </Link>
      <ProductWishlistButton
        saved={saved}
        productId={p.id}
        toggleWishlist={toggleWishlist}
      />
      <div className="pad">
        <small className="product-card-meta">{p.brand || p.cat}</small>
        <Link className="pname" to={'/product/' + p.id}>{p.name}</Link>
        <ProductPrice price={p.price} mrp={p.mrp} discount={discount} />
        <ProductStock product={p} />
        <div className="add-row">
          <ProductQuantity quantity={qty} onChange={setQty} />
          <button className="add" type="button" onClick={addQty} disabled={p.stock !== undefined && Number(p.stock) <= 0}>
            <Plus size={16} /> Add <span className="added-preview">{qty}</span>
          </button>
        </div>
        <Link className="card-view" to={'/product/' + p.id}>
          View product <ChevronRight size={15} />
        </Link>
      </div>
    </article>
  );
}
