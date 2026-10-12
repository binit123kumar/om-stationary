# logout (exported)

**Source identity:** `frontend/src/services/authService.js`, declaration at line 23  
**Declaration kind:** function declaration  
**Module report:** [authService.md](../../../../services/authService.md)

## Signature and responsibility

- **Name:** `logout` (exported).
- **Parameters:** `refreshToken`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `logout` body ke direct calls apiFetch, stringify hain; 2 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L24: null`
- **Return at source:** `L25: apiFetch('/api/auth/logout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ refreshToken }) }).catch(() => null)`
- **Direct call identifiers in this body:** apiFetch, stringify
- **Effects visible in this body:** network request
- **Error-flow markers visible in this body:** catch (1)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
