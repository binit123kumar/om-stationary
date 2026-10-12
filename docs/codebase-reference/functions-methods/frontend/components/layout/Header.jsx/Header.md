# Header (exported)

**Source identity:** `frontend/src/components/layout/Header.jsx`, declaration at line 10  
**Declaration kind:** function declaration  
**Module report:** [Header.md](../../../../../components/layout/Header.md)

## Signature and responsibility

- **Name:** `Header` (exported).
- **Parameters:** `{
  user,
  cartCount = 0,
  wishlistCount = 0,
  unreadCount,
  catalog
}`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `Header` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.
  user,
  cartCount = 0,
  wishlistCount = 0,
  unreadCount,
  catalog
}`. Hinglish: yeh UI render karta hai; exact source return fragments neeche diye gaye hain.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** ` L24: ( <header> <div className="top"> <Link className="logo" to="/"> <span>OM</span> STATIONARY <small>Your Learning &amp; Office Partner</small> </Link> <form className="search" action="/search"> <Search size={20} /> <input  `
- **Direct call identifiers in this body:** useCategories, Set, map
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/layout/AppShell.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
