// WhatsApp notification log table.
import { WhatsAppRetryButton } from './WhatsAppRetryButton.jsx';
import { formatDateTime } from '../../utils/formatDate.js';

export function WhatsAppLogsTable({ logs = [], busy, onRetry }) {
  if (!logs.length) return <p>No notifications have been attempted yet.</p>;

  return (
    <div className="wa-logs">
      {logs.map((entry) => (
        <article className="wa-log" key={entry.id}>
          <div>
            <b>{entry.notificationType}{entry.orderNumber ? ` · ${entry.orderNumber}` : ''}</b>
            <span>
              {entry.createdAt ? formatDateTime(entry.createdAt) : ''} &rarr; {entry.recipient}
            </span>
          </div>
          <span className={entry.status === 'Sent' ? 'wa-ok' : entry.status === 'Failed' ? 'wa-warn' : ''}>
            {entry.status}
          </span>
          <p>{entry.message}</p>
          {entry.errorMessage && <p className="form-error">{entry.errorMessage}</p>}
          {entry.providerMessageId && <small>Provider message id: {entry.providerMessageId}</small>}
          {entry.status === 'Failed' && (
            <WhatsAppRetryButton entryId={entry.id} busy={busy} onRetry={onRetry} />
          )}
        </article>
      ))}
    </div>
  );
}
