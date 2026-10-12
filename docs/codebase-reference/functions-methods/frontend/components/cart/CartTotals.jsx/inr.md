# inr

**Source identity:** `frontend/src/components/cart/CartTotals.jsx`, declaration at line 6  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [CartTotals.md](../../../../../components/cart/CartTotals.md)

## Signature and responsibility

- **Name:** `inr` (not lexically marked exported).
- **Parameters:** `value`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `inr` body ke direct calls Number, toLocaleString hain; 0 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** No explicit return statement identified in the extracted body.
- **Direct call identifiers in this body:** Number, toLocaleString
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
