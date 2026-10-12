# Declaration index: hooks/useDelivery.js

**Source:** `frontend/src/hooks/useDelivery.js`  
**Named declarations identified:** 4  
**Linked module report:** [useDelivery.md](../../../../hooks-context/hooks/useDelivery.md)

## Individually reported named declarations

- [`useStoreConfig` (line 9)](useStoreConfig.md)
- [`useDeliveryAssignments` (line 32)](useDeliveryAssignments.md)
- [`reload` (line 36)](reload.md)
- [`changeStatus` (line 52)](changeStatus.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 12; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 15; lexical line fragment `getDeliveryOptions().catch(() => null),` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 16; lexical line fragment `getPaymentOptions().catch(() => null),` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 17; lexical line fragment `getPickupLocation().catch(() => null)` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 18; lexical line fragment `]).then(([delivery, payments, location]) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 26; lexical line fragment `return () => { active = false; };` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 7: source line 50; lexical line fragment `useEffect(() => { reload(); }, []);` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
