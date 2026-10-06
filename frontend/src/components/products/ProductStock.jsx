export function getProductStock(product) {
  return product.stock !== null && product.stock !== undefined && Number.isFinite(Number(product.stock))
    ? Number(product.stock)
    : null;
}

export function ProductStock({ stock }) {
  return <p className="stock-note">{stock === null ? 'Availability confirmed at checkout' : stock > 0 ? `${stock} in stock` : 'Out of stock'}</p>;
}
