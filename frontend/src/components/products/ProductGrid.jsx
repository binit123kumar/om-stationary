// Product grid container.
export function ProductGrid({ products, children, empty }) {
  if (!products?.length) return empty || null;
  return <div className="grid">{children || products.map(() => null)}</div>;
}
