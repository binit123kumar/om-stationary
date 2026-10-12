# OrderStatusChart (exported)

**Source identity:** `frontend/src/components/admin/OrderStatusChart.jsx`, declaration at line 2  
**Declaration kind:** function declaration  
**Module report:** [OrderStatusChart.md](../../../../../components/admin/OrderStatusChart.md)

## Signature and responsibility

- **Name:** `OrderStatusChart` (exported).
- **Parameters:** `{ statusRows = [] }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `OrderStatusChart` UI render karta hai; body has 2 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L4: <p className="catalog-state">No orders yet.</p>`
- **Return at source:** `L8: ( <div className="status-chart"> {statusRows.map((row) => ( <div className="status-row" key={row.status}> <span className="status-name">{row.status}</span> <span className="status-bar-track"> <span className="status-bar-`
- **Direct call identifiers in this body:** max, map, Number
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/admin/AdminDashboardPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
