// Stock indicator. Reads the REAL `stock` and `lowStockThreshold`
// fields returned by the Product API — never a local constant.
// When the catalogue row carries no stock data (older payloads),
// the component stays neutral instead of inventing a number.
export function ProductStock({ product }) {
  const stock = product?.stock;
  const threshold = product?.lowStockThreshold;

  // Stock is not part of every list projection; absence means
  // "unknown", not "plenty".
  if (stock === undefined || stock === null) {
    return <span className="product-stock product-stock-unknown">Availability confirmed at order</span>;
  }

  const count = Number(stock);
  if (count <= 0) {
    return <span className="product-stock product-stock-out">Out of stock</span>;
  }
  if (threshold !== undefined && threshold !== null && count <= Number(threshold)) {
    return <span className="product-stock product-stock-low">Only {count} left</span>;
  }
  return <span className="product-stock product-stock-ok">In stock ({count})</span>;
}
