# OrderFilters (exported)

**Source identity:** `frontend/src/components/orders/OrderFilters.jsx`, declaration at line 5  
**Declaration kind:** function declaration  
**Module report:** [OrderFilters.md](../../../../../components/orders/OrderFilters.md)

## Signature and responsibility

- **Name:** `OrderFilters` (exported).
- **Parameters:** `{ onLookup }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `OrderFilters` UI render karta hai; body has 2 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L12: (bare return)`
- **Return at source:** `L17: ( <form className="order-lookup panel" onSubmit={submit}> <label className="field-label"> Order number <input required value={number} onChange={(event) => setNumber(event.target.value)} placeholder="OM123456789" /> </lab`
- **Direct call identifiers in this body:** useState, useNavigate, preventDefault, trim, onLookup, navigate, encodeURIComponent, setNumber
- **Effects visible in this body:** state update or dispatch, navigation
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/customer/OrdersPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
