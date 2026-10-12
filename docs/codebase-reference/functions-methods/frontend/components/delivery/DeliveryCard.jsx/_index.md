# Declaration index: components/delivery/DeliveryCard.jsx

**Source:** `frontend/src/components/delivery/DeliveryCard.jsx`  
**Named declarations identified:** 2  
**Linked module report:** [DeliveryCard.md](../../../../../components/delivery/DeliveryCard.md)

## Individually reported named declarations

- [`DeliveryCard` (line 26)](DeliveryCard.md)
- [`run` (line 30)](run.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 48; lexical line fragment `{(delivery.items || []).map((item, index) => (` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 52; lexical line fragment `{actions.map((status) => (` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 56; lexical line fragment `onClick={() => run(status)}` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
