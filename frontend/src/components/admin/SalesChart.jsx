// CSS bar chart of daily orders and revenue.
// Data comes from GET /api/admin/analytics — no fabricated points.
import { rupeesShort } from '../../utils/formatCurrency.js';

export function SalesChart({ daily = [], days = 14 }) {
  if (!daily.length) {
    return <p className="catalog-state">No orders in the selected period.</p>;
  }
  const maxRevenue = Math.max(...daily.map((point) => Number(point.revenue || 0)), 1);

  return (
    <div className="bar-chart" role="img" aria-label={`Daily sales for the last ${days} days`}>
      {daily.map((point) => {
        const height = Math.max(2, Math.round((Number(point.revenue || 0) / maxRevenue) * 100));
        return (
          <div className="bar-col" key={point.date}>
            <div
              className="bar"
              style={{ height: `${height}%` }}
              title={`${point.date}: ${point.orders} orders, ${rupeesShort(point.revenue)}`}
            />
            <small>{new Date(point.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</small>
          </div>
        );
      })}
    </div>
  );
}
