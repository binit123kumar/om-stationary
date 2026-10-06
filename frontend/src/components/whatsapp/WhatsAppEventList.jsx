// WhatsApp notification log summary.
export function WhatsAppEventList({ config }) {
  if (!config) return null;
  const log = config.log || [];
  const count = (status) => log.filter((entry) => entry.status === status).length;

  return (
    <div className="rowhead">
      <h3>Notification log</h3>
      <span>
        {config.total ?? log.length} total
        {' '}&middot; {count('Sent')} sent
        {' '}&middot; {count('Failed')} failed
        {' '}&middot; {count('NotConfigured')} not configured
      </span>
    </div>
  );
}
