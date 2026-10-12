# Declaration index: pages/partner/PartnerProfilePage.jsx

**Source:** `frontend/src/pages/partner/PartnerProfilePage.jsx`  
**Named declarations identified:** 2  
**Linked module report:** [PartnerProfilePage.md](../../../../../pages/partner/PartnerProfilePage.md)

## Individually reported named declarations

- [`PartnerProfilePage` (line 5)](PartnerProfilePage.md)
- [`save` (line 5)](save.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 5; lexical line fragment `export function PartnerProfilePage() { const {shop,error,reload}=usePartner(); const [busy,setBusy]=useState(false);const [message,setMessage]=useState(''); const save=as` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 5; lexical line fragment `export function PartnerProfilePage() { const {shop,error,reload}=usePartner(); const [busy,setBusy]=useState(false);const [message,setMessage]=useState(''); const save=as` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
