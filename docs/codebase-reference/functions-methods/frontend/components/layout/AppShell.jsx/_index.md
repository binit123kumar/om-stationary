# Declaration index: components/layout/AppShell.jsx

**Source:** `frontend/src/components/layout/AppShell.jsx`  
**Named declarations identified:** 7  
**Linked module report:** [AppShell.md](../../../../../components/layout/AppShell.md)

## Individually reported named declarations

- [`AppShell` (line 14)](AppShell.md)
- [`onAuth` (line 98)](onAuth.md)
- [`onLogout` (line 99)](onLogout.md)
- [`add` (line 112)](add.md)
- [`addN` (line 118)](addN.md)
- [`change` (line 127)](change.md)
- [`remove` (line 129)](remove.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 17; lexical line fragment `const [user, setUser] = useState(() => readSession()?.user || null);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 18; lexical line fragment `const [cartReady, setCartReady] = useState(() => !readSession()?.user);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 20; lexical line fragment `const [wishlist, setWishlist] = useState(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 28; lexical line fragment `const syncWishlistFromServer = useCallback(async () => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 35; lexical line fragment `const ids = (Array.isArray(rows) ? rows : []).map((row) => row.productId);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 44; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 7: source line 49; lexical line fragment `const toggleWishlist = useCallback(async (id) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 8: source line 52; lexical line fragment `const next = saving ? [...wishlist, id] : wishlist.filter((item) => item !== id);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 9: source line 63; lexical line fragment `setWishlist(saving ? previous.filter((item) => item !== id) : [...previous, id]);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 10: source line 69; lexical line fragment `const [cart, setCart] = useState(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 11: source line 75; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 12: source line 78; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 13: source line 82; lexical line fragment `apiFetch('/api/cart').then(async (response) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 14: source line 86; lexical line fragment `}).catch(() => { if (active) setCartReady(false); });` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 15: source line 87; lexical line fragment `return () => { active = false; };` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 16: source line 89; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 17: source line 91; lexical line fragment `const timer = setTimeout(() => apiFetch('/api/cart', {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 18: source line 93; lexical line fragment `body: JSON.stringify({ items: cart.map((item) => ({ productId: item.id, quantity: item.q })) })` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 19: source line 94; lexical line fragment `}).catch(() => {}), 300);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 20: source line 95; lexical line fragment `return () => clearTimeout(timer);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 21: source line 138; lexical line fragment `<Header user={user} catalog={catalog} cartCount={cart.reduce((sum, item) => sum + item.q, 0)} wishlistCount={wishlist.length} unreadCount={notifications.unread} />` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
