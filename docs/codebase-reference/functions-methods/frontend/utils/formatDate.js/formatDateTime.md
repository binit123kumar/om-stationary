# formatDateTime (exported)

**Source identity:** `frontend/src/utils/formatDate.js`, declaration at line 9  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [formatDate.md](../../../../hooks-context/utils/formatDate.md)

## Signature and responsibility

- **Name:** `formatDateTime` (exported).
- **Parameters:** `value`
- **Simple Hinglish responsibility:** Named helper/handler. Hinglish: `formatDateTime` local action/helper hai; body calls Date, isNaN, getTime, toLocaleString.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L11: value || '—'`
- **Return at source:** `L12: date.toLocaleString('en-IN')`
- **Direct call identifiers in this body:** Date, isNaN, getTime, toLocaleString
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/admin/RecentOrdersTable.jsx, components/notifications/NotificationList.jsx, components/orders/OrderStatusTimeline.jsx, components/orders/TrackingTimeline.jsx, components/whatsapp/WhatsAppLogsTable.jsx, pages/admin/AdminAuditLogPage.jsx, pages/admin/AdminCouponsPage.jsx, pages/admin/AdminCustomersPage.jsx, pages/admin/AdminInvoicesPage.jsx, pages/admin/AdminOrderDetailPage.jsx, pages/admin/AdminOrdersPage.jsx, pages/admin/AdminPaymentsPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
