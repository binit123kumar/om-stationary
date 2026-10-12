# changeStatus

**Source identity:** `frontend/src/hooks/useDelivery.js`, declaration at line 52  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [useDelivery.md](../../../../hooks-context/hooks/useDelivery.md)

## Signature and responsibility

- **Name:** `changeStatus` (not lexically marked exported).
- **Parameters:** `id, status`
- **Simple Hinglish responsibility:** Named helper/handler. Hinglish: `changeStatus` local action/helper hai; body calls updateAssignmentStatus, reload, setError and has state update or dispatch effect marker(s).

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L58: (bare return)`
- **Direct call identifiers in this body:** updateAssignmentStatus, reload, setError
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** try (1), catch (1)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
