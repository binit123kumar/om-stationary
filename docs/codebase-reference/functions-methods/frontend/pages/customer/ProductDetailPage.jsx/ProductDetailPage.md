# ProductDetailPage (exported)

**Source identity:** `frontend/src/pages/customer/ProductDetailPage.jsx`, declaration at line 12  
**Declaration kind:** function declaration  
**Module report:** [ProductDetailPage.md](../../../../../pages/customer/ProductDetailPage.md)

## Signature and responsibility

- **Name:** `ProductDetailPage` (exported).
- **Parameters:** `{ add, addN, catalog, wishlist, toggleWishlist }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `ProductDetailPage` UI render karta hai; body has 8 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 8 explicit return statement(s) identified.
- **Return at source:** `L23: () => { alive = false; }`
- **Return at source:** `L24: () => { alive = false; }`
- **Return at source:** `L31: () => { alive = false; }`
- **Return at source:** `L37: (bare return)`
- **Return at source:** `L41: <div className="catalog-state">Loading product...</div>`
- **Return at source:** `L42: <div className="catalog-state">Loading product...</div>`
- **Return at source:** `L44: ( <div className="empty"> <PackageCheck /> <h1>Product not found</h1> <Link to="/search" className="btn">Browse products</Link> </div> )`
- **Return at source:** `L56: ( <> <Breadcrumbs items={[ { to: '/', label: 'Home' }, { to: '/search', label: 'Shop' }, { to: '', label: product.name } ]} /> <section className="product product-premium"> <ProductGallery product={product} /> <ProductIn`
- **Direct call identifiers in this body:** useNavigate, useParams, find, Number, useState, useEffect, setRemote, setMissing, getProduct, then, rememberRecentProduct, addN, add, navigate
- **Effects visible in this body:** state update or dispatch, navigation
- **Error-flow markers visible in this body:** catch (1)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
