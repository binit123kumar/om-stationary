# ProductStock (exported)

**Source identity:** `frontend/src/components/products/ProductStock.jsx`, declaration at line 5  
**Declaration kind:** function declaration  
**Module report:** [ProductStock.md](../../../../../components/products/ProductStock.md)

## Signature and responsibility

- **Name:** `ProductStock` (exported).
- **Parameters:** `{ product }`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `ProductStock` body ke direct calls Number, stock hain; 4 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 4 explicit return statement(s) identified.
- **Return at source:** `L12: <span className="product-stock product-stock-unknown">Availability confirmed at order</span>`
- **Return at source:** `L17: <span className="product-stock product-stock-out">Out of stock</span>`
- **Return at source:** `L20: <span className="product-stock product-stock-low">Only {count} left</span>`
- **Return at source:** `L22: <span className="product-stock product-stock-ok">In stock ({count})</span>`
- **Direct call identifiers in this body:** Number, stock
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/products/ProductCard.jsx, components/products/ProductInfo.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
