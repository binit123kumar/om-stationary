# send

**Source identity:** `frontend/src/services/api.js`, declaration at line 8  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [api.md](../../../../services/api.md)

## Signature and responsibility

- **Name:** `send` (not lexically marked exported).
- **Parameters:** `token`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `send` body ke direct calls Headers, set, fetch, startsWith hain; 1 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** ``L11: fetch(path.startsWith('http') ? path : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${path}`, { ...options, headers })``
- **Direct call identifiers in this body:** Headers, set, fetch, startsWith
- **Effects visible in this body:** network request
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
