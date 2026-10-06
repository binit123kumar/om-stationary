// Reusable labelled input with inline error support.
export function Input({
  label,
  error,
  className = '',
  id,
  ...rest
}) {
  const inputId = id || rest.name;
  return (
    <label className={`field-label ${className}`}>
      {label}
      <input id={inputId} aria-invalid={error ? 'true' : undefined} {...rest} />
      {error && <small className="field-error" role="alert">{error}</small>}
    </label>
  );
}
