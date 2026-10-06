// "Send test message" button — always calls the real
// admin test endpoint.
export function WhatsAppTestButton({ busy, configured, onSend }) {
  return (
    <button
      className="btn"
      onClick={onSend}
      disabled={busy || !configured}
      title={configured ? 'Send a test message to the configured admin number' : 'Available once WhatsApp is configured'}
    >
      {busy ? 'Sending…' : 'Send test message'}
    </button>
  );
}
