# CartList (exported)

**Source identity:** `frontend/src/components/cart/CartList.jsx`, declaration at line 4  
**Declaration kind:** function declaration  
**Module report:** [CartList.md](../../../../../components/cart/CartList.md)

## Signature and responsibility

- **Name:** `CartList` (exported).
- **Parameters:** `{ items, onChange, onRemove }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `CartList` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L5: ( <div> {items.map((item) => ( <CartItem key={item.id} item={item} onChange={onChange} onRemove={onRemove} /> ))} </div> )`
- **Direct call identifiers in this body:** map
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/customer/CartPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
