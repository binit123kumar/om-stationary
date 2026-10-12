# CheckoutPage (exported)

**Source identity:** `frontend/src/pages/customer/CheckoutPage.jsx`, declaration at line 27  
**Declaration kind:** function declaration  
**Module report:** [CheckoutPage.md](../../../../../pages/customer/CheckoutPage.md)

## Signature and responsibility

- **Name:** `CheckoutPage` (exported).
- **Parameters:** `{ cart, user, onCartCleared }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `CheckoutPage` UI render karta hai; body has 20 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 20 explicit return statement(s) identified.
- **Return at source:** `L79: (bare return)`
- **Return at source:** `L87: (bare return)`
- **Return at source:** `L109: slots`
- **Return at source:** `L115: (bare return)`
- **Return at source:** `L140: false`
- **Return at source:** `L141: false`
- **Return at source:** `L142: false`
- **Return at source:** `L143: true`
- **Return at source:** `L157: Object.keys(found).length === 0`
- **Return at source:** `L161: (bare return)`
- **Return at source:** `L181: (bare return)`
- **Return at source:** `L195: (bare return)`
- **Return at source:** `L196: (bare return)`
- **Return at source:** `L199: (bare return)`
- **Return at source:** `L203: (bare return)`
- **Return at source:** `L230: (bare return)`
- **Return at source:** `L253: ( <AuthGate reason="Please sign in or create an account to place this order. Your cart is saved and will still be here when you return." /> )`
- **Return at source:** `L259: ( <div className="empty"> <Store size={44} /> <h1>Your cart is empty</h1> <p>Add something to your cart before checking out.</p> <Link className="btn" to="/search">Continue shopping</Link> </div> )`
- **Return at source:** `L269: <div className="catalog-state">Loading checkout options…</div>`
- **Return at source:** ` L271: ( <section className="checkout-flow-3d"> <div className="flow-main-card"> <div className="flow-title"> <small>SECURE CHECKOUT</small> <h1>Complete your order</h1> <p>Prices, stock and delivery charges are verified by OM  `
- **Direct call identifiers in this body:** useNavigate, useStoreConfig, useState, readSession, useMemo, reduce, Number, map, useEffect, setDetails, setFulfillment, Date, now, setMinutes, setPickupSlot, toLocalInputValue, setQuote, setQuoteError, getMinutes, getTime, getHours, toMinutes, push, setGeoError, setLocating, getCurrentPosition, setCoordinates, setFieldErrors, validateCheckoutDetails, keys
- **Effects visible in this body:** network request, state update or dispatch, navigation
- **Error-flow markers visible in this body:** try (2), catch (2), finally (2)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
