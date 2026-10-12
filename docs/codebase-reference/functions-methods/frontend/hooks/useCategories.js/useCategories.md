# useCategories (exported)

**Source identity:** `frontend/src/hooks/useCategories.js`, declaration at line 5  
**Declaration kind:** function declaration  
**Module report:** [useCategories.md](../../../../hooks-context/hooks/useCategories.md)

## Signature and responsibility

- **Name:** `useCategories` (exported).
- **Parameters:** `(none)`
- **Simple Hinglish responsibility:** Hook-shaped function. Hinglish: `useCategories` application values/hook state ko compose karta hai; direct body calls are useState, useEffect, listCategories, then, isArray, setCategories.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L13: () => { active = false; }`
- **Return at source:** `L16: categories`
- **Direct call identifiers in this body:** useState, useEffect, listCategories, then, isArray, setCategories
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** catch (1)
- **Verified static import callers:** components/layout/AppShell.jsx, components/layout/Header.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
