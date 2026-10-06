// Reusable checkbox with label and error support.
export function Checkbox({ label, error, id, ...rest }) {
  const checkboxId = id || rest.name;
  return (
    <label className="check-field">
      <input id={checkboxId} type="checkbox" aria-invalid={error ? 'true' : undefined} {...rest} />
      <span>{label}</span>
      {error && <small className="field-error" role="alert">{error}</small>}
    </label>
  );
}
