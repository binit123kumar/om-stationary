# useOrderLookup (exported)

**Source identity:** `frontend/src/hooks/useOrders.js`, declaration at line 45  
**Declaration kind:** function declaration  
**Module report:** [useOrders.md](../../../../hooks-context/hooks/useOrders.md)

## Signature and responsibility

- **Name:** `useOrderLookup` (exported).
- **Parameters:** `orderNumber`
- **Simple Hinglish responsibility:** Hook-shaped function. Hinglish: `useOrderLookup` application values/hook state ko compose karta hai; direct body calls are useState, useEffect, setLoading, setError, getOrderByNumber, readTrackingToken, then, async, Error, json, setOrder, finally.

## Source flow and effects

- **Flow / return:** 3 explicit return statement(s) identified.
- **Return at source:** `L59: response.json()`
- **Return at source:** `L64: () => { active = false; }`
- **Return at source:** `L67: { order, loading, error, setOrder }`
- **Direct call identifiers in this body:** useState, useEffect, setLoading, setError, getOrderByNumber, readTrackingToken, then, async, Error, json, setOrder, finally
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** catch (1), throw (3), finally (1)
- **Verified static import callers:** pages/customer/TrackOrderPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
