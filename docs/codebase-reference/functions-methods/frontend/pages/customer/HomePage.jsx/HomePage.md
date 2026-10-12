# HomePage (exported)

**Source identity:** `frontend/src/pages/customer/HomePage.jsx`, declaration at line 7  
**Declaration kind:** function declaration  
**Module report:** [HomePage.md](../../../../../pages/customer/HomePage.md)

## Signature and responsibility

- **Name:** `HomePage` (exported).
- **Parameters:** `{ add, addN, catalog, categories = [], wishlist = [], toggleWishlist }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `HomePage` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L20: ( <div className="store-home"> <section className="hero hero-premium"> <div className="hero-copy"> <p className="eyebrow">YOUR LOCAL STATIONERY STORE</p> <h1>Make room for<br /><strong>brighter ideas.</strong></h1> <p>Ev`
- **Direct call identifiers in this body:** Set, map, filter, useState, find, Number, slice, sort, Date, includes, reload, cardProps
- **Effects visible in this body:** navigation, browser/console global
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
