# Modal (exported)

**Source identity:** `frontend/src/components/common/Modal.jsx`, declaration at line 4  
**Declaration kind:** function declaration  
**Module report:** [Modal.md](../../../../../components/common/Modal.md)

## Signature and responsibility

- **Name:** `Modal` (exported).
- **Parameters:** `{ open, onClose, title, children, wide = false }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `Modal` UI render karta hai; body has 4 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 4 explicit return statement(s) identified.
- **Return at source:** `L6: undefined`
- **Return at source:** `L9: () => document.removeEventListener('keydown', onKey)`
- **Return at source:** `L12: null`
- **Return at source:** ``L13: ( <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}> <div className={`modal-card ${wide ? 'modal-wide' : ''}`} onClick={(event) => event.stopPropagation()}> <div classNa``
- **Direct call identifiers in this body:** useEffect, addEventListener, removeEventListener, stopPropagation
- **Effects visible in this body:** browser/console global
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/admin/AdminModal.jsx, components/common/ConfirmDialog.jsx, pages/admin/AdminCategoriesPage.jsx, pages/admin/AdminCouponsPage.jsx, pages/admin/AdminDeliveryPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
