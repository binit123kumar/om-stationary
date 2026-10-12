# csv

**Source identity:** `frontend/src/pages/admin/AdminReportsPage.jsx`, declaration at line 7  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [AdminReportsPage.md](../../../../../pages/admin/AdminReportsPage.md)

## Signature and responsibility

- **Name:** `csv` (not lexically marked exported).
- **Parameters:** `async(report)`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `csv` body ke direct calls exportReport, adminHeaders, readSession, Error, blob, createObjectURL, createElement, click, revokeObjectURL, setError hain; 0 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** No explicit return statement identified in the extracted body.
- **Direct call identifiers in this body:** exportReport, adminHeaders, readSession, Error, blob, createObjectURL, createElement, click, revokeObjectURL, setError
- **Effects visible in this body:** state update or dispatch, browser/console global
- **Error-flow markers visible in this body:** try (1), catch (1), throw (1)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
