# ProductQuantity (exported)

**Source identity:** `frontend/src/components/products/ProductQuantity.jsx`, declaration at line 4  
**Declaration kind:** function declaration  
**Module report:** [ProductQuantity.md](../../../../../components/products/ProductQuantity.md)

## Signature and responsibility

- **Name:** `ProductQuantity` (exported).
- **Parameters:** `{ quantity, onChange, min = 1, max = 99 }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `ProductQuantity` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L6: ( <div className="qty-mini"> <button type="button" aria-label="Decrease quantity" onClick={() => onChange(Math.max(min, value - 1))} > <Minus size={14} /> </button> <b>{value}</b> <button type="button" aria-label="Increa`
- **Direct call identifiers in this body:** max, min, Number, onChange
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/products/ProductCard.jsx, components/products/ProductInfo.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
