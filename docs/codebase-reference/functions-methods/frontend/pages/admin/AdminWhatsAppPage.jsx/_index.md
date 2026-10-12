# Declaration index: pages/admin/AdminWhatsAppPage.jsx

**Source:** `frontend/src/pages/admin/AdminWhatsAppPage.jsx`  
**Named declarations identified:** 5  
**Linked module report:** [AdminWhatsAppPage.md](../../../../../pages/admin/AdminWhatsAppPage.md)

## Individually reported named declarations

- [`AdminWhatsAppPage` (line 10)](AdminWhatsAppPage.md)
- [`load` (line 10)](load.md)
- [`patch` (line 10)](patch.md)
- [`test` (line 10)](test.md)
- [`retry` (line 10)](retry.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 10; lexical line fragment `export function AdminWhatsAppPage({user,onLogout}) { const [config,setConfig]=useState(null); const [error,setError]=useState(''); const [busy,setBusy]=useState(false); c` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 10; lexical line fragment `export function AdminWhatsAppPage({user,onLogout}) { const [config,setConfig]=useState(null); const [error,setError]=useState(''); const [busy,setBusy]=useState(false); c` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
