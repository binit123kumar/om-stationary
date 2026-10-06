// Chart card frame. Charts render real API aggregates only —
// CSS bars, never invented numbers.
export function AdminChartCard({ title, subtitle, children, className = '' }) {
  return (
    <section className={`panel admin-chart-card ${className}`}>
      <div className="rowhead">
        <h2>{title}</h2>
        {subtitle && <span>{subtitle}</span>}
      </div>
      <div className="chart-body">{children}</div>
    </section>
  );
}
