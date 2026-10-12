# readJSON (exported)

**Source identity:** `frontend/src/utils/storage.js`, declaration at line 11  
**Declaration kind:** function declaration  
**Module report:** [storage.md](../../../../hooks-context/utils/storage.md)

## Signature and responsibility

- **Name:** `readJSON` (exported).
- **Parameters:** `key, fallback`
- **Simple Hinglish responsibility:** Named helper/handler. Hinglish: `readJSON` local action/helper hai; body calls parse, getItem and has browser storage effect marker(s).

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L14: value ?? fallback`
- **Return at source:** `L16: fallback`
- **Direct call identifiers in this body:** parse, getItem
- **Effects visible in this body:** browser storage
- **Error-flow markers visible in this body:** try (1), catch (1)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
