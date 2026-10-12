# getDeliveryQuote (exported)

**Source identity:** `frontend/src/services/deliveryService.js`, declaration at line 9  
**Declaration kind:** function declaration  
**Module report:** [deliveryService.md](../../../../services/deliveryService.md)

## Signature and responsibility

- **Name:** `getDeliveryQuote` (exported).
- **Parameters:** `payload`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `getDeliveryQuote` body ke direct calls apiFetch, stringify hain; 1 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L10: apiFetch('/api/delivery/quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })`
- **Direct call identifiers in this body:** apiFetch, stringify
- **Effects visible in this body:** network request
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
