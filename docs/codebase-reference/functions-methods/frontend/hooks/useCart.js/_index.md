# Declaration index: hooks/useCart.js

**Source:** `frontend/src/hooks/useCart.js`  
**Named declarations identified:** 1  
**Linked module report:** [useCart.md](../../../../hooks-context/hooks/useCart.md)

## Individually reported named declarations

- [`useCart` (line 9)](useCart.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 11; lexical line fragment `const [cartReady, setCartReady] = useState(() => !readSession()?.user);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 15; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 20; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 25; lexical line fragment `.then((serverCart) => { if (alive) setCart(serverCart); })` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 26; lexical line fragment `.catch(() => { if (alive) setCartReady(false); });` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 27; lexical line fragment `return () => { alive = false; };` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 7: source line 33; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 8: source line 35; lexical line fragment `const timer = setTimeout(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 9: source line 39; lexical line fragment `body: JSON.stringify({ items: cart.map((i) => ({ productId: i.id, quantity: i.q })) })` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 10: source line 40; lexical line fragment `}).catch(() => {});` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 11: source line 42; lexical line fragment `return () => clearTimeout(timer);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 12: source line 45; lexical line fragment `const add = useCallback((p) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 13: source line 46; lexical line fragment `setCart((c) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 14: source line 47; lexical line fragment `const existing = c.find((i) => i.id === p.id);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 15: source line 49; lexical line fragment `? c.map((i) => (i.id === p.id ? { ...i, q: Math.min(99, i.q + 1) } : i))` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 16: source line 56; lexical line fragment `const addN = useCallback((p, n) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 17: source line 58; lexical line fragment `setCart((c) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 18: source line 59; lexical line fragment `const existing = c.find((i) => i.id === p.id);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 19: source line 61; lexical line fragment `? c.map((i) => (i.id === p.id ? { ...i, q: Math.min(99, i.q + qty) } : i))` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 20: source line 66; lexical line fragment `const change = useCallback((id, delta) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 21: source line 67; lexical line fragment `setCart((c) => c.map((i) => (i.id === id ? { ...i, q: Math.max(0, i.q + delta) } : i)).filter((i) => i.q));` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 22: source line 67; lexical line fragment `setCart((c) => c.map((i) => (i.id === id ? { ...i, q: Math.max(0, i.q + delta) } : i)).filter((i) => i.q));` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 23: source line 67; lexical line fragment `setCart((c) => c.map((i) => (i.id === id ? { ...i, q: Math.max(0, i.q + delta) } : i)).filter((i) => i.q));` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 24: source line 70; lexical line fragment `const remove = useCallback((id) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 25: source line 71; lexical line fragment `setCart((c) => c.filter((i) => i.id !== id));` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 26: source line 71; lexical line fragment `setCart((c) => c.filter((i) => i.id !== id));` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 27: source line 74; lexical line fragment `const replace = useCallback((nextCart) => setCart(nextCart), []);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 28: source line 75; lexical line fragment `const clear = useCallback(() => setCart([]), []);` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
