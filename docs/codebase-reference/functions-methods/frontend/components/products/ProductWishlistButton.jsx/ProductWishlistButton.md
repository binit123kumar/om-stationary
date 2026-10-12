# ProductWishlistButton (exported)

**Source identity:** `frontend/src/components/products/ProductWishlistButton.jsx`, declaration at line 4  
**Declaration kind:** function declaration  
**Module report:** [ProductWishlistButton.md](../../../../../components/products/ProductWishlistButton.md)

## Signature and responsibility

- **Name:** `ProductWishlistButton` (exported).
- **Parameters:** `{ saved, productId, toggleWishlist }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `ProductWishlistButton` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L5: ( <button type="button" className={saved ? 'wishlist-toggle saved' : 'wishlist-toggle'} aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'} onClick={() => toggleWishlist?.(productId)} > <Heart size={17} fill`
- **Direct call identifiers in this body:** None identified by lexical scan.
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/products/ProductCard.jsx, components/products/ProductInfo.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
