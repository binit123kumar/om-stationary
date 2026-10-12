# ProductGallery (exported)

**Source identity:** `frontend/src/components/products/ProductGallery.jsx`, declaration at line 5  
**Declaration kind:** function declaration  
**Module report:** [ProductGallery.md](../../../../../components/products/ProductGallery.md)

## Signature and responsibility

- **Name:** `ProductGallery` (exported).
- **Parameters:** `{ product }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `ProductGallery` UI render karta hai; body has 2 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L10: ( <div className="product-media"> <span className="image-placeholder"><PackageCheck /></span> <span className="image-caption">OM Stationary catalogue</span> </div> )`
- **Return at source:** `L18: ( <div className="product-media"> <img src={images[selected]} alt={product?.name || 'Product image'} /> {images.length > 1 && ( <div className="product-thumbs"> {images.map((image, index) => ( <button key={index} type="b`
- **Direct call identifiers in this body:** useState, map, setSelected
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/customer/ProductDetailPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
