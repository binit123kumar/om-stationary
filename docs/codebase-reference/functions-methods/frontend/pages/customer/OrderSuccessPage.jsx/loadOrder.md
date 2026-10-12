# loadOrder

**Source identity:** `frontend/src/pages/customer/OrderSuccessPage.jsx`, declaration at line 26  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [OrderSuccessPage.md](../../../../../pages/customer/OrderSuccessPage.md)

## Signature and responsibility

- **Name:** `loadOrder` (not lexically marked exported).
- **Parameters:** `(none)`
- **Simple Hinglish responsibility:** Named helper/handler. Hinglish: `loadOrder` local action/helper hai; body calls setLoading, setError, getOrderByNumber, readTrackingToken, Error, setOrder, json and has state update or dispatch effect marker(s).

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L30: (bare return)`
- **Direct call identifiers in this body:** setLoading, setError, getOrderByNumber, readTrackingToken, Error, setOrder, json
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** try (1), catch (1), throw (2), finally (1)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
