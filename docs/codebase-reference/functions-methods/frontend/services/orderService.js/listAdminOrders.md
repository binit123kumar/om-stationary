# listAdminOrders (exported)

**Source identity:** `frontend/src/services/orderService.js`, declaration at line 30  
**Declaration kind:** function declaration  
**Module report:** [orderService.md](../../../../services/orderService.md)

## Signature and responsibility

- **Name:** `listAdminOrders` (exported).
- **Parameters:** `headers`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `listAdminOrders` body ke direct calls apiFetch hain; 1 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L31: apiFetch('/api/orders', { headers })`
- **Direct call identifiers in this body:** apiFetch
- **Effects visible in this body:** network request
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
