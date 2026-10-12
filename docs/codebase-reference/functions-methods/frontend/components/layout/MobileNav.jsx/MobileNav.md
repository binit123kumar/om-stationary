# MobileNav (exported)

**Source identity:** `frontend/src/components/layout/MobileNav.jsx`, declaration at line 15  
**Declaration kind:** function declaration  
**Module report:** [MobileNav.md](../../../../../components/layout/MobileNav.md)

## Signature and responsibility

- **Name:** `MobileNav` (exported).
- **Parameters:** `{ categories = [], cartCount = 0 }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `MobileNav` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L18: ( <nav className="mobile-nav" aria-label="Mobile"> <button type="button" className="mobile-nav-toggle" aria-expanded={open} aria-label="Menu" onClick={() => setOpen((value) => !value)} > {open ? <X size={20} /> : <Menu s`
- **Direct call identifiers in this body:** useState, setOpen, map, encodeURIComponent
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/layout/Header.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
