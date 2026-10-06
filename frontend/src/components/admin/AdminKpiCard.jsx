// KPI tile used across the dashboard and reports.
import { rupeesShort } from '../../utils/formatCurrency.js';

export function AdminKpiCard({ label, value, tone = 'default', money = false }) {
  return (
    <div className={`adminstat adminstat-${tone}`}>
      <b>{money ? rupeesShort(value) : value}</b>
      <span>{label}</span>
    </div>
  );
}
