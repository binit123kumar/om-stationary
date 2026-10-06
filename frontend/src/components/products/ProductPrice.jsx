export function ProductPrice({ product: p }) {
  const discount = p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0;
  return <div className="card-price"><b className="price">&#8377;{p.price}</b>{p.mrp > p.price && <><del>&#8377;{p.mrp}</del><span className="discount">{discount}% off</span></>}</div>;
}
