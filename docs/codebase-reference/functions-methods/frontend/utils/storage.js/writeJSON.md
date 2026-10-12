# writeJSON (exported)

**Source identity:** `frontend/src/utils/storage.js`, declaration at line 20  
**Declaration kind:** function declaration  
**Module report:** [storage.md](../../../../hooks-context/utils/storage.md)

## Signature and responsibility

- **Name:** `writeJSON` (exported).
- **Parameters:** `key, value`
- **Simple Hinglish responsibility:** Named helper/handler. Hinglish: `writeJSON` local action/helper hai; body calls setItem, stringify and has browser storage, state update or dispatch effect marker(s).

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L23: true`
- **Return at source:** `L25: false`
- **Direct call identifiers in this body:** setItem, stringify
- **Effects visible in this body:** browser storage, state update or dispatch
- **Error-flow markers visible in this body:** try (1), catch (1)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
