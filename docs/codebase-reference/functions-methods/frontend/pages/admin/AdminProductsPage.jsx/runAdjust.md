# runAdjust

**Source identity:** `frontend/src/pages/admin/AdminProductsPage.jsx`, declaration at line 56  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [AdminProductsPage.md](../../../../../pages/admin/AdminProductsPage.md)

## Signature and responsibility

- **Name:** `runAdjust` (not lexically marked exported).
- **Parameters:** `product, delta`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `runAdjust` body ke direct calls setPending, setMessage, adjustStock, json, Error, load, setError hain; 0 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** No explicit return statement identified in the extracted body.
- **Direct call identifiers in this body:** setPending, setMessage, adjustStock, json, Error, load, setError
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** try (1), catch (1), throw (1), finally (1)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
