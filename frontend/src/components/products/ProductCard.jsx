import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, PackageCheck } from 'lucide-react';
import { ProductPrice } from './ProductPrice.jsx';
import { ProductQuantity } from './ProductQuantity.jsx';
import { ProductStock, getProductStock } from './ProductStock.jsx';
import { ProductWishlistButton } from './ProductWishlistButton.jsx';

export function ProductCard({ p, add, addN, saved = false, toggleWishlist }) {
  const [qty, setQty] = useState(1);
  const stock = getProductStock(p);
  const addQty = () => addN ? addN(p, qty) : add(p);

  return <article className="card">
    <Link className="card-image" to={'/product/' + p.id}>
      {p.img ? <img src={p.img} alt={p.name} loading="lazy" /> : <span className="image-placeholder"><PackageCheck /></span>}
    </Link>
    <ProductWishlistButton productId={p.id} saved={saved} onToggle={toggleWishlist} />
    <div className="pad">
      <small>{p.cat}</small>
      <Link className="pname" to={'/product/' + p.id}>{p.name}</Link>
      <ProductPrice product={p} />
      <ProductStock stock={stock} />
      <ProductQuantity quantity={qty} setQuantity={setQty} stock={stock} onAdd={addQty} />
      <Link className="card-view" to={'/product/' + p.id}>View product <ChevronRight size={15} /></Link>
    </div>
  </article>;
}
