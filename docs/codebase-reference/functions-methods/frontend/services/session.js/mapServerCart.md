# mapServerCart (exported)

**Source identity:** `frontend/src/services/session.js`, declaration at line 41  
**Declaration kind:** function declaration  
**Module report:** [session.md](../../../../services/session.md)

## Signature and responsibility

- **Name:** `mapServerCart` (exported).
- **Parameters:** `rows = []`
- **Simple Hinglish responsibility:** Server cart rows ko storefront cart shape mein map karta hai. Hinglish: har row ke product, quantity, price aur image fields ko local naming mein badalta hai.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L42: rows.map((row) => ({ id: row.productId, q: row.quantity, name: row.name, cat: row.category, price: row.price, mrp: row.mrp, img: row.imageUrl }))`
- **Direct call identifiers in this body:** map
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/auth/LoginForm.jsx, components/layout/AppShell.jsx, hooks/useCart.js, services/cartService.js

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
