# apply

**Source identity:** `frontend/src/components/checkout/CouponBox.jsx`, declaration at line 11  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [CouponBox.md](../../../../../components/checkout/CouponBox.md)

## Signature and responsibility

- **Name:** `apply` (not lexically marked exported).
- **Parameters:** `(none)`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `apply` body ke direct calls setMessage, onApplied, trim, setBusy, validateCoupon, readFailure, json hain; 2 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L16: (bare return)`
- **Return at source:** `L23: (bare return)`
- **Direct call identifiers in this body:** setMessage, onApplied, trim, setBusy, validateCoupon, readFailure, json
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** try (1), catch (1), finally (1)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
