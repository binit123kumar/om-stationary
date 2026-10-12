# readWishlist (exported)

**Source identity:** `frontend/src/utils/storage.js`, declaration at line 42  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [storage.md](../../../../hooks-context/utils/storage.md)

## Signature and responsibility

- **Name:** `readWishlist` (exported).
- **Parameters:** `(none)`
- **Simple Hinglish responsibility:** Named helper/handler. Hinglish: `readWishlist` local action/helper hai; body calls readJSON, isArray.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L44: Array.isArray(saved) ? saved : []`
- **Direct call identifiers in this body:** readJSON, isArray
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** hooks/useWishlist.js

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
