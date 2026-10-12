# CouponBox (exported)

**Source identity:** `frontend/src/components/checkout/CouponBox.jsx`, declaration at line 7  
**Declaration kind:** function declaration  
**Module report:** [CouponBox.md](../../../../../components/checkout/CouponBox.md)

## Signature and responsibility

- **Name:** `CouponBox` (exported).
- **Parameters:** `{ code, onCodeChange, items, applied, onApplied }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `CouponBox` UI render karta hai; body has 3 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 3 explicit return statement(s) identified.
- **Return at source:** `L16: (bare return)`
- **Return at source:** `L23: (bare return)`
- **Return at source:** `L35: ( <div className="coupon-entry"> <label className="field-label"> Coupon code <input value={code} maxLength={40} placeholder="Enter code" onChange={(event) => { onCodeChange?.(event.target.value.toUpperCase()); onApplied(`
- **Direct call identifiers in this body:** useState, async, setMessage, onApplied, trim, setBusy, validateCoupon, readFailure, json, toUpperCase
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** try (1), catch (1), finally (1)
- **Verified static import callers:** pages/customer/CheckoutPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
