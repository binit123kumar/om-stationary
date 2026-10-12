# AdminCharts

- **Source:** [`frontend/src/AdminCharts.jsx`](../../../../frontend/src/AdminCharts.jsx)
- **Kind:** React function component located at the `src` root, not under `components/`.
- **Purpose:** Formats daily analytics dates and displays sales/order metrics with Recharts.
- **Inputs:** `analytics` object; source reads `analytics.daily`, `analytics.orderStatus`, and each row's `date`, `orders`, `revenue`, `status`, and `count`.
- **State/hooks:** No local state or hooks.
- **Rendered content:** Daily order/revenue line chart; conditional order-status bar chart when `analytics.orderStatus` has rows.
- **Dependencies:** `ResponsiveContainer`, `LineChart`, `BarChart` and related Recharts components.
- **Side effects/API:** None; it only transforms the given daily array for display.
- **Callers:** No import/caller was found in a source-wide reference search at documentation time. Treat as an unreferenced source candidate, not automatically dead code.
- **Styles/responsive behavior:** Uses `.admin-chart-section`, `.admin-chart-grid` and `.admin-chart-card`; charts use 100% width and fixed 300px chart heights. Existing CSS has responsive chart-grid breakpoints.
- **Failure/validation:** Assumes `analytics.daily` exists; no guard around a missing object is present in this source.
- **Change safely:** If reusing this component, verify the analytics response shape and caller props first. If changing chart keys, align them with API response data and chart legend labels.
- **Tests:** No frontend test suite configured; component is not known to be mounted by current source imports.
- **Function report:** [AdminCharts](../../functions-methods/frontend/src/AdminCharts/AdminCharts.md).
