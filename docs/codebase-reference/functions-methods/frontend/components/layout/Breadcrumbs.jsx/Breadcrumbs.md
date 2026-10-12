# Breadcrumbs (exported)

**Source identity:** `frontend/src/components/layout/Breadcrumbs.jsx`, declaration at line 6  
**Declaration kind:** function declaration  
**Module report:** [Breadcrumbs.md](../../../../../components/layout/Breadcrumbs.md)

## Signature and responsibility

- **Name:** `Breadcrumbs` (exported).
- **Parameters:** `{ items = [] }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `Breadcrumbs` UI render karta hai; body has 2 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L7: null`
- **Return at source:** `L8: ( <nav className="breadcrumbs" aria-label="Breadcrumb"> {items.slice(0, -1).map((item) => ( <span key={item.to} className="breadcrumb-item"> <Link to={item.to}>{item.label}</Link> <ChevronRight size={13} /> </span> ))} <`
- **Direct call identifiers in this body:** slice, map
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/customer/ProductDetailPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
