# Declaration index: components/partner/PartnerInventoryForm.jsx

**Source:** `frontend/src/components/partner/PartnerInventoryForm.jsx`  
**Named declarations identified:** 2  
**Linked module report:** [PartnerInventoryForm.md](../../../../../components/partner/PartnerInventoryForm.md)

## Individually reported named declarations

- [`PartnerInventoryForm` (line 6)](PartnerInventoryForm.md)
- [`submit` (line 12)](submit.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 38; lexical line fragment `onChange={(event) => setPrice(event.target.value)}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 48; lexical line fragment `onChange={(event) => setStock(event.target.value)}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 56; lexical line fragment `onChange={(event) => setAvailable(event.target.checked)}` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
