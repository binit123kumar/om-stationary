# addN

**Source identity:** `frontend/src/components/layout/AppShell.jsx`, declaration at line 118  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [AppShell.md](../../../../../components/layout/AppShell.md)

## Signature and responsibility

- **Name:** `addN` (not lexically marked exported).
- **Parameters:** `product, amount`
- **Simple Hinglish responsibility:** Named helper/handler. Hinglish: `addN` local action/helper hai; body calls max, min, round, Number, setCart, find, map and has state update or dispatch effect marker(s).

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L122: existing ? current.map((item) => item.id === product.id ? { ...item, q: Math.min(99, item.q + quantity) } : item) : [...current, { ...product, q: quantity }]`
- **Direct call identifiers in this body:** max, min, round, Number, setCart, find, map
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
