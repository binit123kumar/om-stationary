// Delivery status change form for admin assignment views.
export function DeliveryStatusActions({ status, onStatus, busy = false }) {
  return (
    <div className="partner-actions" aria-label="Delivery status actions">
      <span className="admin-current-status">
        Status: <b>{status}</b>
      </span>
      {onStatus && (
        <small>{busy ? 'Saving…' : 'Use the assignment card actions to update the delivery status.'}</small>
      )}
    </div>
  );
}
