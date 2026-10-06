// Top products table from real order aggregates.
import { rupeesShort } from '../../utils/formatCurrency.js';

export function TopProductsTable({ products = [] }) {
  if (!products.length) return <p className="catalog-state">No product sales yet.</p>;
  return (
    <table className="admin-table">
      <thead>
        <tr><th>Product</th><th>Quantity sold</th><th>Revenue</th></tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.productName}>
            <td><b>{product.productName}</b></td>
            <td>{product.quantity}</td>
            <td>{rupeesShort(product.revenue)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
