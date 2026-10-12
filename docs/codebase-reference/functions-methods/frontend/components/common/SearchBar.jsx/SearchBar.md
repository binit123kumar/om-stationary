# SearchBar (exported)

**Source identity:** `frontend/src/components/common/SearchBar.jsx`, declaration at line 6  
**Declaration kind:** function declaration  
**Module report:** [SearchBar.md](../../../../../components/common/SearchBar.md)

## Signature and responsibility

- **Name:** `SearchBar` (exported).
- **Parameters:** `{ placeholder = 'Search…', initialValue = '', buttonLabel = 'Search' }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `SearchBar` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L16: ( <form className="search" action="/search" onSubmit={submit}> <SearchIcon size={20} /> <input name="q" value={value} placeholder={placeholder} onChange={(event) => setValue(event.target.value)} aria-label="Search produc`
- **Direct call identifiers in this body:** useState, useNavigate, preventDefault, trim, navigate, setValue
- **Effects visible in this body:** state update or dispatch, navigation
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
