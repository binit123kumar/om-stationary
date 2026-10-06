// Password field with the backend policy mirrored in the UI
// (RegisterRequest: Required, MinLength(4), MaxLength(128)).
import { PASSWORD_MAX, PASSWORD_MIN } from '../../utils/validation.js';

export function PasswordField({
  value,
  onChange,
  error,
  registerMode = false,
  autoComplete
}) {
  return (
    <label>
      Password
      <input
        name="password"
        type="password"
        required
        value={value}
        maxLength={PASSWORD_MAX}
        minLength={registerMode ? PASSWORD_MIN : 1}
        autoComplete={autoComplete || (registerMode ? 'new-password' : 'current-password')}
        placeholder={registerMode ? `At least ${PASSWORD_MIN} characters` : 'Your password'}
        aria-invalid={error ? 'true' : undefined}
        onChange={onChange}
      />
      {error
        ? <small className="field-error" role="alert">{error}</small>
        : registerMode && <small>At least {PASSWORD_MIN} characters, {PASSWORD_MAX} maximum.</small>}
    </label>
  );
}
