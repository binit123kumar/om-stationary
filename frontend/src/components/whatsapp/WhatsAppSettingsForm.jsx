// WhatsApp event-type toggles and enable switch.
export function WhatsAppSettingsForm({ config, busy, onToggleEnabled, onToggleEvent }) {
  if (!config) return null;
  const events = [
    ['newOrder', 'New orders'],
    ['orderStatus', 'Order status changes'],
    ['paymentUpdate', 'Payments received'],
    ['lowStock', 'Low stock alerts'],
    ['newCustomer', 'New customers']
  ];

  return (
    <div className="wa-controls">
      <label className="wa-toggle">
        <input
          type="checkbox"
          checked={config.configuration?.enabled}
          disabled={busy}
          onChange={(event) => onToggleEnabled(event.target.checked)}
        />
        Enable WhatsApp notifications
      </label>
      <div className="wa-toggles">
        {events.map(([key, label]) => (
          <label className="wa-toggle" key={key}>
            <input
              type="checkbox"
              checked={!!config.eventTypes?.[key]}
              disabled={busy}
              onChange={(event) => onToggleEvent(key, event.target.checked)}
            />
            {' '}{label}
          </label>
        ))}
      </div>
    </div>
  );
}
