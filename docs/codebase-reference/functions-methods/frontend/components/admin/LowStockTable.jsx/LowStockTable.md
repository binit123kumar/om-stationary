# LowStockTable (exported)

**Source identity:** `frontend/src/components/admin/LowStockTable.jsx`, declaration at line 5  
**Declaration kind:** function declaration  
**Module report:** [LowStockTable.md](../../../../../components/admin/LowStockTable.md)

## Signature and responsibility

- **Name:** `LowStockTable` (exported).
- **Parameters:** `{ products = [], money }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `LowStockTable` UI render karta hai; body has 2 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L6: <p className="catalog-state">No low-stock products.</p>`
- **Return at source:** `L9: ( <table className="admin-table"> <thead> <tr> <th>Product</th><th>SKU</th><th>Price</th><th>Stock</th><th>Threshold</th><th>State</th> </tr> </thead> <tbody> {products.map((product) => ( <tr key={product.id}> <td> <Link`
- **Direct call identifiers in this body:** Number, toLocaleString, map, inr
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
