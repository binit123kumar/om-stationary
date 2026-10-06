// Order status distribution chart from real aggregates.
export function OrderStatusChart({ statusRows = [] }) {
  if (!statusRows.length) {
    return <p className="catalog-state">No orders yet.</p>;
  }
  const max = Math.max(...statusRows.map((row) => Number(row.count || 0)), 1);

  return (
    <div className="status-chart">
      {statusRows.map((row) => (
        <div className="status-row" key={row.status}>
          <span className="status-name">{row.status}</span>
          <span className="status-bar-track">
            <span
              className="status-bar-fill"
              style={{ width: `${Math.max(2, Math.round((Number(row.count) / max) * 100))}%` }}
            />
          </span>
          <b>{row.count}</b>
        </div>
      ))}
    </div>
  );
}
