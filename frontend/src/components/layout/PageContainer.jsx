// Consistent page container with optional heading block.
export function PageContainer({ children, className = '' }) {
  return <div className={`page-container ${className}`}>{children}</div>;
}

export function PageHead({ eyebrow, title, message, actions }) {
  return (
    <div className="pagehead">
      {eyebrow && <small>{eyebrow}</small>}
      {title && <h1>{title}</h1>}
      {message && <p>{message}</p>}
      {actions}
    </div>
  );
}
