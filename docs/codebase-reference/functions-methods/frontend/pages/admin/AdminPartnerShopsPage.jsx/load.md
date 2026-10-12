# load

**Source identity:** `frontend/src/pages/admin/AdminPartnerShopsPage.jsx`, declaration at line 9  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [AdminPartnerShopsPage.md](../../../../../pages/admin/AdminPartnerShopsPage.md)

## Signature and responsibility

- **Name:** `load` (not lexically marked exported).
- **Parameters:** `(none)`
- **Simple Hinglish responsibility:** Named helper/handler. Hinglish: `load` local action/helper hai; body calls setLoading, setRows, listPartnerShops, adminHeaders, readSession, setError and has state update or dispatch effect marker(s).

## Source flow and effects

- **Flow / return:** No explicit return statement identified in the extracted body.
- **Direct call identifiers in this body:** setLoading, setRows, listPartnerShops, adminHeaders, readSession, setError
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** try (1), catch (1), finally (1)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
