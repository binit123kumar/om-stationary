# stockStateLabel (exported)

**Source identity:** `frontend/src/utils/formatOrderStatus.js`, declaration at line 38  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [formatOrderStatus.md](../../../../hooks-context/utils/formatOrderStatus.md)

## Signature and responsibility

- **Name:** `stockStateLabel` (exported).
- **Parameters:** `product`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `stockStateLabel` body ke direct calls Number hain; 3 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 3 explicit return statement(s) identified.
- **Return at source:** `L41: 'Out of stock'`
- **Return at source:** `L42: 'Low stock'`
- **Return at source:** `L43: 'In stock'`
- **Direct call identifiers in this body:** Number
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/admin/AdminProductsPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
