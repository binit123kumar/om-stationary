# assignDelivery (exported)

**Source identity:** `frontend/src/services/orderService.js`, declaration at line 50  
**Declaration kind:** function declaration  
**Module report:** [orderService.md](../../../../services/orderService.md)

## Signature and responsibility

- **Name:** `assignDelivery` (exported).
- **Parameters:** `id, partnerName, trackingCode, headers`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `assignDelivery` body ke direct calls apiFetch, stringify hain; 1 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** ``L51: apiFetch(`/api/orders/${encodeURIComponent(id)}/delivery`, { method: 'POST', headers, body: JSON.stringify({ partnerName, trackingCode }) })``
- **Direct call identifiers in this body:** apiFetch, stringify
- **Effects visible in this body:** network request
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
