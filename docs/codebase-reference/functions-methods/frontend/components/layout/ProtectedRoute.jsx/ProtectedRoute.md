# ProtectedRoute (exported)

**Source identity:** `frontend/src/components/layout/ProtectedRoute.jsx`, declaration at line 6  
**Declaration kind:** function declaration  
**Module report:** [ProtectedRoute.md](../../../../../components/layout/ProtectedRoute.md)

## Signature and responsibility

- **Name:** `ProtectedRoute` (exported).
- **Parameters:** `{ children, roles = null }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `ProtectedRoute` UI render karta hai; body has 3 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 3 explicit return statement(s) identified.
- **Return at source:** ``L11: <Navigate to={`/login?return=${encodeURIComponent(location.pathname + location.search)}`} replace />``
- **Return at source:** `L14: <Navigate to="/" replace />`
- **Return at source:** `L16: children`
- **Direct call identifiers in this body:** readSession, useLocation, includes
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
