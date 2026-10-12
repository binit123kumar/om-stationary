# assign

**Source identity:** `frontend/src/pages/admin/AdminDeliveryPage.jsx`, declaration at line 14  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [AdminDeliveryPage.md](../../../../../pages/admin/AdminDeliveryPage.md)

## Signature and responsibility

- **Name:** `assign` (not lexically marked exported).
- **Parameters:** `row`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `assign` body ke direct calls some, String, setError, setBusy, assignDeliveryPartner, Error, json, load hain; 1 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L14: (bare return)`
- **Direct call identifiers in this body:** some, String, setError, setBusy, assignDeliveryPartner, Error, json, load
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** try (1), catch (2), throw (1), finally (1)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
