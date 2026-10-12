# getWishlist (exported)

**Source identity:** `frontend/src/services/wishlistService.js`, declaration at line 5  
**Declaration kind:** function declaration  
**Module report:** [wishlistService.md](../../../../services/wishlistService.md)

## Signature and responsibility

- **Name:** `getWishlist` (exported).
- **Parameters:** `(none)`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `getWishlist` body ke direct calls apiFetch, Error, json hain; 2 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L7: { signed: false, rows: [] }`
- **Return at source:** `L9: { signed: true, rows: await response.json() }`
- **Direct call identifiers in this body:** apiFetch, Error, json
- **Effects visible in this body:** network request
- **Error-flow markers visible in this body:** throw (1)
- **Verified static import callers:** hooks/useWishlist.js, pages/customer/WishlistPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
