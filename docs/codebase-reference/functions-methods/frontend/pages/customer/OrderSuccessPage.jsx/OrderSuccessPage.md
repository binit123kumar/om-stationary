# OrderSuccessPage (exported)

**Source identity:** `frontend/src/pages/customer/OrderSuccessPage.jsx`, declaration at line 17  
**Declaration kind:** function declaration  
**Module report:** [OrderSuccessPage.md](../../../../../pages/customer/OrderSuccessPage.md)

## Signature and responsibility

- **Name:** `OrderSuccessPage` (exported).
- **Parameters:** `(none)`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `OrderSuccessPage` UI render karta hai; body has 4 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 4 explicit return statement(s) identified.
- **Return at source:** `L30: (bare return)`
- **Return at source:** `L48: <div className="catalog-state">Loading order confirmation…</div>`
- **Return at source:** `L51: ( <div className="empty"> <PackageCheck size={44} /> <h1>Order confirmation</h1> <p>{error || 'This order could not be loaded.'}</p> <Link className="btn" to="/orders">Go to orders</Link> <Link className="outline" to="/s`
- **Return at source:** `L64: ( <section className="checkout-flow-3d"> <div className="payment-3d-page-wrap"> {online ? ( <div className="payment-glass payment-state-box"> <div className="success-check"><PackageCheck size={44} /></div> <h2>Order plac`
- **Direct call identifiers in this body:** useNavigate, URLSearchParams, get, useState, async, setLoading, setError, getOrderByNumber, readTrackingToken, Error, setOrder, json, useEffect, loadOrder, isPaid, navigate, paymentLabel, map
- **Effects visible in this body:** state update or dispatch, navigation, browser/console global
- **Error-flow markers visible in this body:** try (1), catch (1), throw (2), finally (1)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
