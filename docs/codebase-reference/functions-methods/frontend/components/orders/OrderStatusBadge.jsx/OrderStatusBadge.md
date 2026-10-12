# OrderStatusBadge (exported)

**Source identity:** `frontend/src/components/orders/OrderStatusBadge.jsx`, declaration at line 4  
**Declaration kind:** function declaration  
**Module report:** [OrderStatusBadge.md](../../../../../components/orders/OrderStatusBadge.md)

## Signature and responsibility

- **Name:** `OrderStatusBadge` (exported).
- **Parameters:** `{ status }`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `OrderStatusBadge` body ke direct calls String hain; 1 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** ``L11: <span className={`pill ${tone}`}>{value || '—'}</span>``
- **Direct call identifiers in this body:** String
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/admin/RecentOrdersTable.jsx, components/delivery/DeliveryCard.jsx, components/orders/OrderCard.jsx, components/orders/TrackingTimeline.jsx, components/partner/PartnerOrderCard.jsx, pages/admin/AdminOrderDetailPage.jsx, pages/admin/AdminOrdersPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
