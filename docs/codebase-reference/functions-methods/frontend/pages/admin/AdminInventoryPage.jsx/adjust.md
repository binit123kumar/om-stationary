# adjust

**Source identity:** `frontend/src/pages/admin/AdminInventoryPage.jsx`, declaration at line 21  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [AdminInventoryPage.md](../../../../../pages/admin/AdminInventoryPage.md)

## Signature and responsibility

- **Name:** `adjust` (not lexically marked exported).
- **Parameters:** `product`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `adjust` body ke direct calls Number, isInteger, setError, setBusyId, setMessage, adjustStock, Error, json, load hain; 1 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L23: (bare return)`
- **Direct call identifiers in this body:** Number, isInteger, setError, setBusyId, setMessage, adjustStock, Error, json, load
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** try (1), catch (2), throw (1), finally (1)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
