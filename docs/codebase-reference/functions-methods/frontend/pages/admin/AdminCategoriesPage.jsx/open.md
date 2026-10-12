# open

**Source identity:** `frontend/src/pages/admin/AdminCategoriesPage.jsx`, declaration at line 26  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [AdminCategoriesPage.md](../../../../../pages/admin/AdminCategoriesPage.md)

## Signature and responsibility

- **Name:** `open` (not lexically marked exported).
- **Parameters:** `row = null`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `open` body ke direct calls setEditing, setName, setActive hain; 0 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** No explicit return statement identified in the extracted body.
- **Direct call identifiers in this body:** setEditing, setName, setActive
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
