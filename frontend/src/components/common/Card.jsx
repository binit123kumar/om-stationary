// Generic card container.
export function Card({ children, className = '', ...rest }) {
  return (
    <div className={`card-container ${className}`} {...rest}>
      {children}
    </div>
  );
}
