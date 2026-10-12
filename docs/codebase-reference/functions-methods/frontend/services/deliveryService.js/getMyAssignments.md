# getMyAssignments (exported)

**Source identity:** `frontend/src/services/deliveryService.js`, declaration at line 26  
**Declaration kind:** function declaration  
**Module report:** [deliveryService.md](../../../../services/deliveryService.md)

## Signature and responsibility

- **Name:** `getMyAssignments` (exported).
- **Parameters:** `(none)`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `getMyAssignments` body ke direct calls apiFetch, Error, json hain; 2 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L28: null`
- **Return at source:** `L30: response.json()`
- **Direct call identifiers in this body:** apiFetch, Error, json
- **Effects visible in this body:** network request
- **Error-flow markers visible in this body:** throw (1)
- **Verified static import callers:** hooks/useDelivery.js

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
