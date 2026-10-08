export function EmptyState({ title, children, action, className = '' }) {
  return (
    <section className={`empty-state ${className}`.trim()}>
      {title && <h2>{title}</h2>}
      {children && <p>{children}</p>}
      {action}
    </section>
  );
}
