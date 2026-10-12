# CartTotals (exported)

**Source identity:** `frontend/src/components/cart/CartTotals.jsx`, declaration at line 3  
**Declaration kind:** function declaration  
**Module report:** [CartTotals.md](../../../../../components/cart/CartTotals.md)

## Signature and responsibility

- **Name:** `CartTotals` (exported).
- **Parameters:** `{ cart }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `CartTotals` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L8: ( <> <p><span>Items subtotal</span><b>{inr(subtotal)}</b></p> <p><span>Delivery, tax &amp; coupon</span><b>At checkout</b></p> <hr /> <p className="total"> <span>Grand Total</span> <b>{inr(subtotal)}</b> </p> </> )`
- **Direct call identifiers in this body:** reduce, Number, toLocaleString, inr
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/cart/CartSummary.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
