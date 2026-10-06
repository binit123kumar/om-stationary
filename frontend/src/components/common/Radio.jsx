// Reusable radio option.
export function Radio({ label, hint, checked, onChange, name, value, disabled = false, icon }) {
  return (
    <label className={checked ? 'payment-choice selected' : 'payment-choice'}>
      <input
        type="radio"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        value={value}
      />
      {icon}
      <span>
        <b>{label}</b>
        {hint && <small>{hint}</small>}
      </span>
    </label>
  );
}
