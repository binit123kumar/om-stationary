// Reusable labelled select.
export function Select({ label, error, children, id, ...rest }) {
  const selectId = id || rest.name;
  return (
    <label className="field-label">
      {label}
      <select id={selectId} aria-invalid={error ? 'true' : undefined} {...rest}>
        {children}
      </select>
      {error && <small className="field-error" role="alert">{error}</small>}
    </label>
  );
}
