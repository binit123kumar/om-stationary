// Reusable button. Maps to the existing .btn / .outline design tokens so
// every surface keeps the OM Stationary look.
export function Button({
  children,
  variant = 'primary',
  wide = false,
  busy = false,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...rest
}) {
  const classes = [
    variant === 'primary' ? 'btn' : 'outline',
    wide ? 'wide' : '',
    className
  ].filter(Boolean).join(' ');
  return (
    <button type={type} className={classes} disabled={disabled || busy} onClick={onClick} {...rest}>
      {busy ? 'Please wait…' : children}
    </button>
  );
}
