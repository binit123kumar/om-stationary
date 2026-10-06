// Inline loaders and skeletons.
export function Loader({ label = 'Loading…', small = false }) {
  return (
    <div className={small ? 'loader loader-small' : 'loader'} role="status">
      <span className="loader-spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export function Skeleton({ lines = 3 }) {
  return (
    <div className="skeleton" aria-hidden="true">
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="skeleton-line" style={{ width: `${88 - index * 12}%` }} />
      ))}
    </div>
  );
}
