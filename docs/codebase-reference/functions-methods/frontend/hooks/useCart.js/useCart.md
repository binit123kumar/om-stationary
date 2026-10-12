# useCart (exported)

**Source identity:** `frontend/src/hooks/useCart.js`, declaration at line 9  
**Declaration kind:** function declaration  
**Module report:** [useCart.md](../../../../hooks-context/hooks/useCart.md)

## Signature and responsibility

- **Name:** `useCart` (exported).
- **Parameters:** `user`
- **Simple Hinglish responsibility:** Hook-shaped function. Hinglish: `useCart` application values/hook state ko compose karta hai; direct body calls are useState, readSession, useRef, useEffect, writeCart, setCartReady, getCart, then, setCart, setTimeout, apiFetch, stringify, map, clearTimeout, useCallback, find, min, max, round, Number, filter.

## Source flow and effects

- **Flow / return:** 7 explicit return statement(s) identified.
- **Return at source:** `L21: (bare return)`
- **Return at source:** `L27: () => { alive = false; }`
- **Return at source:** `L34: (bare return)`
- **Return at source:** `L42: () => clearTimeout(timer)`
- **Return at source:** `L48: existing ? c.map((i) => (i.id === p.id ? { ...i, q: Math.min(99, i.q + 1) } : i)) : [...c, { ...p, q: 1 }]`
- **Return at source:** `L60: existing ? c.map((i) => (i.id === p.id ? { ...i, q: Math.min(99, i.q + qty) } : i)) : [...c, { ...p, q: Math.min(99, qty) }]`
- **Return at source:** `L77: { cart, cartReady, setCart, add, addN, change, remove, replace, clear, setCartReady }`
- **Direct call identifiers in this body:** useState, readSession, useRef, useEffect, writeCart, setCartReady, getCart, then, setCart, setTimeout, apiFetch, stringify, map, clearTimeout, useCallback, find, min, max, round, Number, filter
- **Effects visible in this body:** network request, state update or dispatch
- **Error-flow markers visible in this body:** catch (2)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
