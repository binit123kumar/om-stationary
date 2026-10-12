# ProductCard (exported)

**Source identity:** `frontend/src/components/products/ProductCard.jsx`, declaration at line 12  
**Declaration kind:** function declaration  
**Module report:** [ProductCard.md](../../../../../components/products/ProductCard.md)

## Signature and responsibility

- **Name:** `ProductCard` (exported).
- **Parameters:** `{ product: p, add, addN, saved = false, toggleWishlist }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `ProductCard` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L19: ( <article className="card"> <Link className="card-image" to={'/product/' + p.id}> <ProductImage product={p} /> </Link> <ProductWishlistButton saved={saved} productId={p.id} toggleWishlist={toggleWishlist} /> <div classN`
- **Direct call identifiers in this body:** useState, round, addN, add, Number
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/customer/HomePage.jsx, pages/customer/ProductListingPage.jsx, pages/customer/WishlistPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
