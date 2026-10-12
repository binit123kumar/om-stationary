# updateOrderStatus (exported)

**Source identity:** `frontend/src/services/adminService.js`, declaration at line 41  
**Declaration kind:** function declaration  
**Module report:** [adminService.md](../../../../services/adminService.md)

## Signature and responsibility

- **Name:** `updateOrderStatus` (exported).
- **Parameters:** `id, status, headers`
- **Simple Hinglish responsibility:** Named helper/handler. Hinglish: `updateOrderStatus` local action/helper hai; body calls apiFetch, stringify and has network request effect marker(s).

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** ``L42: apiFetch(`/api/orders/${encodeURIComponent(id)}/status`, { method: 'PATCH', headers, body: JSON.stringify({ status }) })``
- **Direct call identifiers in this body:** apiFetch, stringify
- **Effects visible in this body:** network request
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** hooks/useAdmin.js, pages/admin/AdminOrderDetailPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
