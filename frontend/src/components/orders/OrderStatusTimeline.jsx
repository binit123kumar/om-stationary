// Vertical status history timeline for a single order.
import { formatDateTime } from '../../utils/formatDate.js';

export function OrderStatusTimeline({ history = [] }) {
  if (!history.length) return null;
  return (
    <ol className="tracking-history">
      {history.map((entry, index) => (
        <li key={index}>
          <b>{entry.status}</b>
          <span>{entry.note || ''}</span>
          <small>{formatDateTime(entry.createdAt)}</small>
        </li>
      ))}
    </ol>
  );
}
