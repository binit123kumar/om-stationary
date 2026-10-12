# TopNav (exported)

**Source identity:** `frontend/src/components/layout/TopNav.jsx`, declaration at line 4  
**Declaration kind:** function declaration  
**Module report:** [TopNav.md](../../../../../components/layout/TopNav.md)

## Signature and responsibility

- **Name:** `TopNav` (exported).
- **Parameters:** `{ categories = [] }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `TopNav` UI render karta hai; body has 2 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L5: null`
- **Return at source:** `L6: ( <nav className="topnav" aria-label="Categories"> {categories.map((category) => ( <Link key={category} to={'/search?cat=' + encodeURIComponent(category)} > {category} </Link> ))} </nav> )`
- **Direct call identifiers in this body:** map, encodeURIComponent
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/layout/Header.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
