# Declaration index: components/products/ProductInfo.jsx

**Source:** `frontend/src/components/products/ProductInfo.jsx`  
**Named declarations identified:** 1  
**Linked module report:** [ProductInfo.md](../../../../../components/products/ProductInfo.md)

## Individually reported named declarations

- [`ProductInfo` (line 12)](ProductInfo.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 39; lexical line fragment `<button className="btn" disabled={outOfStock} onClick={() => (onAddQuantity ? onAddQuantity(p, quantity) : onAdd?.(p))}>` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 42; lexical line fragment `<button className="outline" disabled={outOfStock} onClick={() => onBuyNow?.(p, quantity)}>` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
