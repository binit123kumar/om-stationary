# actionLabelFor (exported)

**Source identity:** `frontend/src/utils/formatOrderStatus.js`, declaration at line 21  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [formatOrderStatus.md](../../../../hooks-context/utils/formatOrderStatus.md)

## Signature and responsibility

- **Name:** `actionLabelFor` (exported).
- **Parameters:** `status`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `actionLabelFor` body ke direct calls none identified hain; 1 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L35: labels[status] || status`
- **Direct call identifiers in this body:** None identified by lexical scan.
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/admin/AdminOrderDetailPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
