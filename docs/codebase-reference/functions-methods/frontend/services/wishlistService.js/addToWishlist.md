# addToWishlist (exported)

**Source identity:** `frontend/src/services/wishlistService.js`, declaration at line 12  
**Declaration kind:** function declaration  
**Module report:** [wishlistService.md](../../../../services/wishlistService.md)

## Signature and responsibility

- **Name:** `addToWishlist` (exported).
- **Parameters:** `productId`
- **Simple Hinglish responsibility:** Named helper/handler. Hinglish: `addToWishlist` local action/helper hai; body calls apiFetch, encodeURIComponent and has network request effect marker(s).

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L13: apiFetch('/api/wishlist/' + encodeURIComponent(productId), { method: 'POST' })`
- **Direct call identifiers in this body:** apiFetch, encodeURIComponent
- **Effects visible in this body:** network request
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
