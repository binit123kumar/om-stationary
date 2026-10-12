# formatSlot (exported)

**Source identity:** `frontend/src/utils/formatDate.js`, declaration at line 22  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [formatDate.md](../../../../hooks-context/utils/formatDate.md)

## Signature and responsibility

- **Name:** `formatSlot` (exported).
- **Parameters:** `value`
- **Simple Hinglish responsibility:** Named helper/handler. Hinglish: `formatSlot` local action/helper hai; body calls Date, isNaN, getTime, toLocaleString.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L24: value`
- **Return at source:** `L25: date.toLocaleString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })`
- **Direct call identifiers in this body:** Date, isNaN, getTime, toLocaleString
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/customer/CheckoutPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
