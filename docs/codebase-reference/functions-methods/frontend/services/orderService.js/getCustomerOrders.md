# getCustomerOrders (exported)

**Source identity:** `frontend/src/services/orderService.js`, declaration at line 20  
**Declaration kind:** function declaration  
**Module report:** [orderService.md](../../../../services/orderService.md)

## Signature and responsibility

- **Name:** `getCustomerOrders` (exported).
- **Parameters:** `(none)`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `getCustomerOrders` body ke direct calls apiFetch hain; 1 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L21: apiFetch('/api/customers/orders')`
- **Direct call identifiers in this body:** apiFetch
- **Effects visible in this body:** network request
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** hooks/useOrders.js

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
