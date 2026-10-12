# Declaration index: components/checkout/AddressForm.jsx

**Source:** `frontend/src/components/checkout/AddressForm.jsx`  
**Named declarations identified:** 1  
**Linked module report:** [AddressForm.md](../../../../../components/checkout/AddressForm.md)

## Individually reported named declarations

- [`AddressForm` (line 7)](AddressForm.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 32; lexical line fragment `onChange={(event) => onField('addressLine', event.target.value)}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 39; lexical line fragment `onChange={(event) => onField('landmark', event.target.value)}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 46; lexical line fragment `onChange={(event) => onField('city', event.target.value)}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 48; lexical line fragment `{(cities || []).map((city) => (` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 60; lexical line fragment `onChange={(event) => onField('state', event.target.value)}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 71; lexical line fragment `onChange={(event) => onField('pincode', event.target.value)}` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
