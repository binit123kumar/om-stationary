# CartQuantityControl (exported)

**Source identity:** `frontend/src/components/cart/CartQuantityControl.jsx`, declaration at line 4  
**Declaration kind:** function declaration  
**Module report:** [CartQuantityControl.md](../../../../../components/cart/CartQuantityControl.md)

## Signature and responsibility

- **Name:** `CartQuantityControl` (exported).
- **Parameters:** `{ quantity, label, onChange }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `CartQuantityControl` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L5: ( <div className="qty"> <button type="button" aria-label={'Decrease ' + label} onClick={() => onChange(-1)} > <Minus /> </button> <b>{quantity}</b> <button type="button" aria-label={'Increase ' + label} onClick={() => on`
- **Direct call identifiers in this body:** onChange
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/cart/CartItem.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
