// Low-stock product table. Stock values come straight
// from the Product table — never estimated.
import { Link } from 'react-router-dom';

export function LowStockTable({ products = [], money }) {
  if (!products.length) return <p className="catalog-state">No low-stock products.</p>;
  const inr = money || ((value) => '₹' + Number(value || 0).toLocaleString('en-IN'));

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Product</th><th>SKU</th><th>Price</th><th>Stock</th><th>Threshold</th><th>State</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>
              <Link to={`/admin/products/${product.id}/edit`}>{product.name}</Link>
              <small>{product.category}</small>
            </td>
            <td>{product.sku || '—'}</td>
            <td>{inr(product.price)}</td>
            <td className={Number(product.stock) <= Number(product.lowStockThreshold) ? 'low-stock' : ''}>
              {product.stock}
            </td>
            <td>{product.lowStockThreshold}</td>
            <td>
              {Number(product.stock) <= 0 ? 'Out of stock' : 'Low stock'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
