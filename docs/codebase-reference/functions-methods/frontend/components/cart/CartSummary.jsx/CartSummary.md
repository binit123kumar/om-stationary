# CartSummary (exported)

**Source identity:** `frontend/src/components/cart/CartSummary.jsx`, declaration at line 5  
**Declaration kind:** function declaration  
**Module report:** [CartSummary.md](../../../../../components/cart/CartSummary.md)

## Signature and responsibility

- **Name:** `CartSummary` (exported).
- **Parameters:** `{ cart }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `CartSummary` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L6: ( <aside className="summary"> <h3>Order Summary</h3> <CartTotals cart={cart} /> <small>Delivery charges for doorstep delivery are quoted by the store at checkout.</small> <Link className="btn wide" to="/checkout">Proceed`
- **Direct call identifiers in this body:** None identified by lexical scan.
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/customer/CartPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
