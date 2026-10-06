// Optional "keep me signed in" checkbox. Presentational only —
// the session itself is always stored server-side by the JWT
// issued on sign-in.
export function RememberMe({ checked, onChange }) {
  return (
    <label className="auth-check">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange?.(event.target.checked)}
      />
      <span>Keep me signed in on this device</span>
    </label>
  );
}
