# AccountPage (exported)

**Source identity:** `frontend/src/pages/customer/AccountPage.jsx`, declaration at line 11  
**Declaration kind:** function declaration  
**Module report:** [AccountPage.md](../../../../../pages/customer/AccountPage.md)

## Signature and responsibility

- **Name:** `AccountPage` (exported).
- **Parameters:** `{ user, onLogout }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `AccountPage` UI render karta hai; body has 3 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 3 explicit return statement(s) identified.
- **Return at source:** `L81: ( <div className="account"> <div className="panel"> <User size={34} aria-hidden="true" /> <h1>Your OM Stationary account</h1> <p>Create an account to save addresses and see orders. Guest checkout and order tracking remai`
- **Return at source:** `L95: ( <section className="pagehead"> <small>ACCOUNT</small> <h1>{user.role} account</h1> <p>Signed in as {user.email}.</p> {user.role === 'Admin' && <Link className="btn" to="/admin">Open admin</Link>} {user.role === 'Partne`
- **Return at source:** `L108: ( <section className="account-page"> <div className="pagehead"> <small>YOUR ACCOUNT</small> <h1>Account and addresses</h1> <p>{user.email}</p> <Link to="/orders">View your orders</Link> <button className="outline" onClic`
- **Direct call identifiers in this body:** useState, async, all, apiFetch, setProfile, json, setError, setAddresses, useEffect, reload, preventDefault, setBusy, FormData, stringify, get, setMessage, fromEntries, entries, has, reset
- **Effects visible in this body:** network request, state update or dispatch
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
