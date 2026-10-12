# EmptyState (exported)

**Source identity:** `frontend/src/components/common/EmptyState.jsx`, declaration at line 1  
**Declaration kind:** function declaration  
**Module report:** [EmptyState.md](../../../../../components/common/EmptyState.md)

## Signature and responsibility

- **Name:** `EmptyState` (exported).
- **Parameters:** `{ title, children, action, className = '' }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `EmptyState` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** ``L2: ( <section className={`empty-state ${className}`.trim()}> {title && <h2>{title}</h2>} {children && <p>{children}</p>} {action} </section> )``
- **Direct call identifiers in this body:** trim
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
