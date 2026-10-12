# load

**Source identity:** `frontend/src/hooks/useOrders.js`, declaration at line 18  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [useOrders.md](../../../../hooks-context/hooks/useOrders.md)

## Signature and responsibility

- **Name:** `load` (not lexically marked exported).
- **Parameters:** `(none)`
- **Simple Hinglish responsibility:** Named helper/handler. Hinglish: `load` local action/helper hai; body calls getCustomerOrders, json, setRecent, isArray, setLoading, readRecentOrders, all, map, getOrderByNumber, readTrackingToken, then, filter and has state update or dispatch effect marker(s).

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L26: (bare return)`
- **Direct call identifiers in this body:** getCustomerOrders, json, setRecent, isArray, setLoading, readRecentOrders, all, map, getOrderByNumber, readTrackingToken, then, filter
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** catch (1)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
