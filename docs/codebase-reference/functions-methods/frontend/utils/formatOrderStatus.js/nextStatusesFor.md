# nextStatusesFor (exported)

**Source identity:** `frontend/src/utils/formatOrderStatus.js`, declaration at line 16  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [formatOrderStatus.md](../../../../hooks-context/utils/formatOrderStatus.md)

## Signature and responsibility

- **Name:** `nextStatusesFor` (exported).
- **Parameters:** `order, fallback`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `nextStatusesFor` body ke direct calls isArray hain; 2 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L17: order.nextStatuses`
- **Return at source:** `L18: (fallback && fallback[order?.status]) || []`
- **Direct call identifiers in this body:** isArray
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
