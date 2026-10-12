# AdminCharts

- **ID:** `frontend:src/AdminCharts.jsx:AdminCharts`
- **Identity:** JavaScript React function component in `frontend/src/AdminCharts.jsx`.
- **Inputs:** `analytics`, read for `daily` and optional `orderStatus` arrays.
- **Purpose (simple Hinglish):** Analytics response ko chart-friendly date label mein badal kar orders/revenue line chart aur available order-status bar chart dikhata hai.
- **Execution:** Maps daily rows, replacing each displayed date with an `en-IN` day/month label; renders line chart; conditionally renders status bar chart when `orderStatus.length > 0`.
- **Output:** React element.
- **Dependencies/callees:** `ResponsiveContainer`, Recharts charts, axes, tooltip, legend and primitives.
- **Side effects:** No apparent state/API/storage effects.
- **Call relationship:** No source caller/import found during repository search. This is not proof that runtime or external consumers do not exist.
- **Failure/security:** Assumes `analytics` and `analytics.daily` are present; no local error boundary/guard in this component.
- **Maintenance:** Validate the API payload shape and add a source caller only if the current feature needs it; update chart `dataKey`s with contract changes.
- **Tests:** No frontend test suite configured; component rendering was not tested.
