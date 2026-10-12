# SalesChart (exported)

**Source identity:** `frontend/src/components/admin/SalesChart.jsx`, declaration at line 5  
**Declaration kind:** function declaration  
**Module report:** [SalesChart.md](../../../../../components/admin/SalesChart.md)

## Signature and responsibility

- **Name:** `SalesChart` (exported).
- **Parameters:** `{ daily = [], days = 14 }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `SalesChart` UI render karta hai; body has 3 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 3 explicit return statement(s) identified.
- **Return at source:** `L7: <p className="catalog-state">No orders in the selected period.</p>`
- **Return at source:** ``L11: ( <div className="bar-chart" role="img" aria-label={`Daily sales for the last ${days} days`}> {daily.map((point) => { const height = Math.max(2, Math.round((Number(point.revenue || 0) / maxRevenue) * 100)); return ( <div``
- **Return at source:** ``L15: ( <div className="bar-col" key={point.date}> <div className="bar" style={{ height: `${height}%` }} title={`${point.date}: ${point.orders} orders, ${rupeesShort(point.revenue)}`} /> <small>{new Date(point.date).toLocaleDa``
- **Direct call identifiers in this body:** max, map, Number, round, Date, toLocaleDateString
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/admin/AdminDashboardPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
