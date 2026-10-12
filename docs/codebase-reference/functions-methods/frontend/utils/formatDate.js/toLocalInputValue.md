# toLocalInputValue (exported)

**Source identity:** `frontend/src/utils/formatDate.js`, declaration at line 35  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [formatDate.md](../../../../hooks-context/utils/formatDate.md)

## Signature and responsibility

- **Name:** `toLocalInputValue` (exported).
- **Parameters:** `date`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `toLocalInputValue` body ke direct calls getTimezoneOffset, Date, getTime, toISOString, slice hain; 1 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L37: new Date(date.getTime() - offset).toISOString().slice(0, 16)`
- **Direct call identifiers in this body:** getTimezoneOffset, Date, getTime, toISOString, slice
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/customer/CheckoutPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
