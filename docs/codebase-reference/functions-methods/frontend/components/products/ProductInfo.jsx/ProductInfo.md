# ProductInfo (exported)

**Source identity:** `frontend/src/components/products/ProductInfo.jsx`, declaration at line 12  
**Declaration kind:** function declaration  
**Module report:** [ProductInfo.md](../../../../../components/products/ProductInfo.md)

## Signature and responsibility

- **Name:** `ProductInfo` (exported).
- **Parameters:** `{
  product: p,
  wishlist = [],
  toggleWishlist,
  onAdd,
  onAddQuantity,
  onBuyNow
}`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `ProductInfo` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.
  product: p,
  wishlist = [],
  toggleWishlist,
  onAdd,
  onAddQuantity,
  onBuyNow
}`. Hinglish: yeh UI render karta hai; exact source return fragments neeche diye gaye hain.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** ` L23: ( <div className="product-info"> <small>{p.cat}</small> <h1>{p.name}</h1> {p.brand && <p>{p.brand}</p>} <p>{p.desc || p.shortDesc || 'Product details will be updated by OM Stationary.'}</p> <ProductPrice price={p.price}  `
- **Direct call identifiers in this body:** useState, includes, Number, min, onAddQuantity
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/customer/ProductDetailPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
