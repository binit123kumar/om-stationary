# Declaration index: pages/admin/AdminProductFormPage.jsx

**Source:** `frontend/src/pages/admin/AdminProductFormPage.jsx`  
**Named declarations identified:** 4  
**Linked module report:** [AdminProductFormPage.md](../../../../../pages/admin/AdminProductFormPage.md)

## Individually reported named declarations

- [`AdminProductFormPage` (line 21)](AdminProductFormPage.md)
- [`setField` (line 72)](setField.md)
- [`validate` (line 77)](validate.md)
- [`submit` (line 86)](submit.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 38; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 41; lexical line fragment `(async () => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 68; lexical line fragment `return () => { active = false; };` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 113; lexical line fragment `const body = await response.json().catch(() => ({}));` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 147; lexical line fragment `onChange={(event) => setField('name')(event.target.value)}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 155; lexical line fragment `onChange={(event) => setField('sku')(event.target.value)}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 7: source line 162; lexical line fragment `onChange={(event) => setField('brand')(event.target.value)}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 8: source line 169; lexical line fragment `onChange={(event) => setField('unit')(event.target.value)}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 9: source line 176; lexical line fragment `onChange={(event) => setField('category')(event.target.value)}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 10: source line 186; lexical line fragment `onChange={(event) => setField('price')(event.target.value)}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 11: source line 195; lexical line fragment `onChange={(event) => setField('mrp')(event.target.value)}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 12: source line 204; lexical line fragment `onChange={(event) => setField('stock')(Number(event.target.value))}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 13: source line 212; lexical line fragment `onChange={(event) => setField('lowStockThreshold')(Number(event.target.value))}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 14: source line 220; lexical line fragment `onChange={(event) => setField('imageUrl')(event.target.value)}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 15: source line 228; lexical line fragment `onChange={(event) => setField('shortDescription')(event.target.value)}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 16: source line 237; lexical line fragment `onChange={(event) => setField('description')(event.target.value)}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 17: source line 244; lexical line fragment `onChange={(event) => setField('isActive')(event.target.checked)}` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
