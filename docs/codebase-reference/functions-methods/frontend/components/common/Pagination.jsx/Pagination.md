# Pagination (exported)

**Source identity:** `frontend/src/components/common/Pagination.jsx`, declaration at line 2  
**Declaration kind:** function declaration  
**Module report:** [Pagination.md](../../../../../components/common/Pagination.md)

## Signature and responsibility

- **Name:** `Pagination` (exported).
- **Parameters:** `{ page, pages, onPage }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `Pagination` UI render karta hai; body has 2 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L3: null`
- **Return at source:** `L4: ( <nav className="pagination" aria-label="Pages"> <button type="button" className="outline" disabled={page <= 1} onClick={() => onPage?.(page - 1)}> Previous </button> <span>Page {page} of {pages}</span> <button type="bu`
- **Direct call identifiers in this body:** None identified by lexical scan.
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/admin/AdminDataTable.jsx, pages/customer/ProductListingPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
