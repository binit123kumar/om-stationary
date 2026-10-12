# AccountSidebar (exported)

**Source identity:** `frontend/src/components/account/AccountSidebar.jsx`, declaration at line 11  
**Declaration kind:** function declaration  
**Module report:** [AccountSidebar.md](../../../../../components/account/AccountSidebar.md)

## Signature and responsibility

- **Name:** `AccountSidebar` (exported).
- **Parameters:** `{ active = '/account' }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `AccountSidebar` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L12: ( <aside className="account-sidebar"> <h3>Your account</h3> <nav> {SECTIONS.map((section) => ( <Link key={section.to} to={section.to} className={active === section.to ? 'selected' : ''} > {section.label} </Link> ))} </na`
- **Direct call identifiers in this body:** map
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
