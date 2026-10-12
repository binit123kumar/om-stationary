# buyNow

**Source identity:** `frontend/src/pages/customer/ProductDetailPage.jsx`, declaration at line 53  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [ProductDetailPage.md](../../../../../pages/customer/ProductDetailPage.md)

## Signature and responsibility

- **Name:** `buyNow` (not lexically marked exported).
- **Parameters:** `p, quantity = 1`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `buyNow` body ke direct calls addN, add, navigate hain; 0 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** No explicit return statement identified in the extracted body.
- **Direct call identifiers in this body:** addN, add, navigate
- **Effects visible in this body:** navigation
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
