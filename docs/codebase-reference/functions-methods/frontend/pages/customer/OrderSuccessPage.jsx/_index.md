# Declaration index: pages/customer/OrderSuccessPage.jsx

**Source:** `frontend/src/pages/customer/OrderSuccessPage.jsx`  
**Named declarations identified:** 2  
**Linked module report:** [OrderSuccessPage.md](../../../../../pages/customer/OrderSuccessPage.md)

## Individually reported named declarations

- [`OrderSuccessPage` (line 17)](OrderSuccessPage.md)
- [`loadOrder` (line 26)](loadOrder.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 46; lexical line fragment `useEffect(() => { loadOrder(); }, [orderNumber]);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 84; lexical line fragment `: <CodConfirmation order={order} onContinue={() => navigate('/search')} />}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 96; lexical line fragment `items={(order.items || []).map((line) => ({` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
