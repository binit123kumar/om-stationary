# Checkbox (exported)

**Source identity:** `frontend/src/components/common/Checkbox.jsx`, declaration at line 2  
**Declaration kind:** function declaration  
**Module report:** [Checkbox.md](../../../../../components/common/Checkbox.md)

## Signature and responsibility

- **Name:** `Checkbox` (exported).
- **Parameters:** `{ label, error, id, ...rest }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `Checkbox` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** ` L4: ( <label className="check-field"> <input id={checkboxId} type="checkbox" aria-invalid={error ? 'true' : undefined} {...rest} /> <span>{label}</span> {error && <small className="field-error" role="alert">{error}</small>}  `
- **Direct call identifiers in this body:** None identified by lexical scan.
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/admin/AdminProductFormPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
