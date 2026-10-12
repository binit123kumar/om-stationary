# readFailure (exported)

**Source identity:** `frontend/src/services/api.js`, declaration at line 21  
**Declaration kind:** function declaration  
**Module report:** [api.md](../../../../services/api.md)

## Signature and responsibility

- **Name:** `readFailure` (exported).
- **Parameters:** `response, fallback`
- **Simple Hinglish responsibility:** Response failure ko user-facing message mein badalta hai. Hinglish: status codes aur response JSON dekhta hai, phir detail ya fallback message return karta hai.

## Source flow and effects

- **Flow / return:** 3 explicit return statement(s) identified.
- **Return at source:** `L22: 'Could not reach the OM Stationary service. Please check your connection and try again.'`
- **Return at source:** `L23: 'Too many requests. Please wait a moment and try again.'`
- **Return at source:** `L27: typeof detail === 'string' && detail.trim() ? detail : fallback`
- **Direct call identifiers in this body:** json, isArray, trim
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** catch (1)
- **Verified static import callers:** components/checkout/CouponBox.jsx, components/checkout/UpiPaymentPanel.jsx, pages/customer/CheckoutPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
