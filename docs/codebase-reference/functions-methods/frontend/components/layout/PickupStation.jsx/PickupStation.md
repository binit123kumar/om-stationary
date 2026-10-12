# PickupStation (exported)

**Source identity:** `frontend/src/components/layout/PickupStation.jsx`, declaration at line 7  
**Declaration kind:** function declaration  
**Module report:** [PickupStation.md](../../../../../components/layout/PickupStation.md)

## Signature and responsibility

- **Name:** `PickupStation` (exported).
- **Parameters:** `{ location, compact = false }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `PickupStation` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** ``L19: ( <section className={`pickup-station${compact ? ' compact' : ''}`}> <div className="pickup-copy"> <div className="pickup-title"> <MapPin size={19} /> <div> <h3>OM Stationary Pickup Station</h3> {address && <span classNa``
- **Direct call identifiers in this body:** None identified by lexical scan.
- **Effects visible in this body:** navigation
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/layout/FooterMap.jsx, pages/customer/TrackOrderPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
