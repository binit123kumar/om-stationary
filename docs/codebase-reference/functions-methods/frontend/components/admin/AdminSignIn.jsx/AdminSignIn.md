# AdminSignIn (exported)

**Source identity:** `frontend/src/components/admin/AdminSignIn.jsx`, declaration at line 10  
**Declaration kind:** function declaration  
**Module report:** [AdminSignIn.md](../../../../../components/admin/AdminSignIn.md)

## Signature and responsibility

- **Name:** `AdminSignIn` (exported).
- **Parameters:** `(none)`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `AdminSignIn` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** ` L13: ( <div className="account panel"> <h1>Admin sign in</h1> <p>Sign in with an Admin account to manage orders, catalogue and stock.</p> <Link className="btn wide" to="/login">Sign in</Link> <form onSubmit={saveKey}> <label  `
- **Direct call identifiers in this body:** useAdminKey, setEntry
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
