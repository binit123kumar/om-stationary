// Retry button for a failed WhatsApp notification.
export function WhatsAppRetryButton({ entryId, busy, onRetry }) {
  return (
    <button
      className="outline"
      onClick={() => onRetry(entryId)}
      disabled={busy}
    >
      {busy ? 'Retrying…' : 'Retry send'}
    </button>
  );
}
