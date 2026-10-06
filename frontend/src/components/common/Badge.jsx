// Small status/label badge.
export function Badge({ children, tone = 'neutral', className = '' }) {
  return <span className={`badge-tag badge-${tone} ${className}`}>{children}</span>;
}
