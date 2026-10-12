# formatTime (exported)

**Source identity:** `frontend/src/utils/formatDate.js`, declaration at line 15  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [formatDate.md](../../../../hooks-context/utils/formatDate.md)

## Signature and responsibility

- **Name:** `formatTime` (exported).
- **Parameters:** `value`
- **Simple Hinglish responsibility:** Named helper/handler. Hinglish: `formatTime` local action/helper hai; body calls Date, isNaN, getTime, toLocaleTimeString.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L17: value || '—'`
- **Return at source:** `L18: date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })`
- **Direct call identifiers in this body:** Date, isNaN, getTime, toLocaleTimeString
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
