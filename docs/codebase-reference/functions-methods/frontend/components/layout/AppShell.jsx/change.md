# change

**Source identity:** `frontend/src/components/layout/AppShell.jsx`, declaration at line 127  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [AppShell.md](../../../../../components/layout/AppShell.md)

## Signature and responsibility

- **Name:** `change` (not lexically marked exported).
- **Parameters:** `id, delta`
- **Simple Hinglish responsibility:** Named helper/handler. Hinglish: `change` local action/helper hai; body calls setCart, map and has state update or dispatch effect marker(s).

## Source flow and effects

- **Flow / return:** No explicit return statement identified in the extracted body.
- **Direct call identifiers in this body:** setCart, map
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
