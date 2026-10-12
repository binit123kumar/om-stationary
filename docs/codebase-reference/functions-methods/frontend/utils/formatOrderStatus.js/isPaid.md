# isPaid (exported)

**Source identity:** `frontend/src/utils/formatOrderStatus.js`, declaration at line 11  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [formatOrderStatus.md](../../../../hooks-context/utils/formatOrderStatus.md)

## Signature and responsibility

- **Name:** `isPaid` (exported).
- **Parameters:** `order`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `isPaid` body ke direct calls String, toLowerCase hain; 0 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** No explicit return statement identified in the extracted body.
- **Direct call identifiers in this body:** String, toLowerCase
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/customer/OrderSuccessPage.jsx, pages/customer/PaymentPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
