# confirmOrderPayment (exported)

**Source identity:** `frontend/src/services/adminService.js`, declaration at line 50  
**Declaration kind:** function declaration  
**Module report:** [adminService.md](../../../../services/adminService.md)

## Signature and responsibility

- **Name:** `confirmOrderPayment` (exported).
- **Parameters:** `id, headers`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `confirmOrderPayment` body ke direct calls apiFetch, stringify hain; 1 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** ``L51: apiFetch(`/api/orders/${encodeURIComponent(id)}/payment`, { method: 'PATCH', headers, body: JSON.stringify({ status: 'Paid' }) })``
- **Direct call identifiers in this body:** apiFetch, stringify
- **Effects visible in this body:** network request
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** hooks/useAdmin.js, pages/admin/AdminOrderDetailPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
