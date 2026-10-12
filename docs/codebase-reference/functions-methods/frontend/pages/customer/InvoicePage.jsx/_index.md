# Declaration index: pages/customer/InvoicePage.jsx

**Source:** `frontend/src/pages/customer/InvoicePage.jsx`  
**Named declarations identified:** 2  
**Linked module report:** [InvoicePage.md](../../../../../pages/customer/InvoicePage.md)

## Individually reported named declarations

- [`InvoicePage` (line 21)](InvoicePage.md)
- [`downloadPdf` (line 58)](downloadPdf.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 29; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 34; lexical line fragment `.then(async (response) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 39; lexical line fragment `const body = await response.json().catch(() => ({}));` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 44; lexical line fragment `.then((data) => { if (active) setInvoice(data); })` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 45; lexical line fragment `.catch((e) => { if (active) setError(e.message || 'The invoice could not be loaded.'); })` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 46; lexical line fragment `.finally(() => { if (active) setLoading(false); });` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 7: source line 47; lexical line fragment `return () => { active = false; };` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 8: source line 51; lexical line fragment `() => String(invoice?.paymentStatus || '').toLowerCase() === 'paid',` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
