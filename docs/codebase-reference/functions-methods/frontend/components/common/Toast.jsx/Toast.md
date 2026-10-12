# Toast (exported)

**Source identity:** `frontend/src/components/common/Toast.jsx`, declaration at line 5  
**Declaration kind:** function declaration  
**Module report:** [Toast.md](../../../../../components/common/Toast.md)

## Signature and responsibility

- **Name:** `Toast` (exported).
- **Parameters:** `{ toast, onDismiss }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `Toast` UI render karta hai; body has 4 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 4 explicit return statement(s) identified.
- **Return at source:** `L7: undefined`
- **Return at source:** `L9: () => clearTimeout(timer)`
- **Return at source:** `L12: null`
- **Return at source:** ``L13: ( <div className={`toast toast-${toast.kind || 'info'}`} role="status"> <span>{toast.message}</span> <button type="button" aria-label="Dismiss" onClick={() => onDismiss?.(toast.id)}>&times;</button> </div> )``
- **Direct call identifiers in this body:** useEffect, setTimeout, clearTimeout
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
