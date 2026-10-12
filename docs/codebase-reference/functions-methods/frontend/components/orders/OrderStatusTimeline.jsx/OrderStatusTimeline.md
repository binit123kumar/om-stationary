# OrderStatusTimeline (exported)

**Source identity:** `frontend/src/components/orders/OrderStatusTimeline.jsx`, declaration at line 4  
**Declaration kind:** function declaration  
**Module report:** [OrderStatusTimeline.md](../../../../../components/orders/OrderStatusTimeline.md)

## Signature and responsibility

- **Name:** `OrderStatusTimeline` (exported).
- **Parameters:** `{ history = [] }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `OrderStatusTimeline` UI render karta hai; body has 2 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L5: null`
- **Return at source:** `L6: ( <ol className="tracking-history"> {history.map((entry, index) => ( <li key={index}> <b>{entry.status}</b> <span>{entry.note || ''}</span> <small>{formatDateTime(entry.createdAt)}</small> </li> ))} </ol> )`
- **Direct call identifiers in this body:** map, formatDateTime
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/orders/TrackingTimeline.jsx, pages/admin/AdminOrderDetailPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
