# LegalPage (exported)

**Source identity:** `frontend/src/pages/customer/LegalPages.jsx`, declaration at line 5  
**Declaration kind:** function declaration  
**Module report:** [LegalPages.md](../../../../../pages/customer/LegalPages.md)

## Signature and responsibility

- **Name:** `LegalPage` (exported).
- **Parameters:** `{kind}`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `LegalPage` UI render karta hai; body has 2 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L7: <div className="empty"><h1>Page not found</h1><Link className="btn" to="/">Back to home</Link></div>`
- **Return at source:** `L8: <><div className="pagehead"><small>OM STATIONARY</small><h1>{doc.title}</h1><p>{doc.intro}</p></div>`
- **Direct call identifiers in this body:** map
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
