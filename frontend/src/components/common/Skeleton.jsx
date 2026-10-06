export function Skeleton({ className = '', width, height = '1em', style, ...props }) {
  return (
    <span
      aria-hidden="true"
      className={`skeleton ${className}`.trim()}
      style={{ width, height, ...style }}
      {...props}
    />
  );
}
