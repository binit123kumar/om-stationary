# Input (exported)

**Source identity:** `frontend/src/components/common/Input.jsx`, declaration at line 2  
**Declaration kind:** function declaration  
**Module report:** [Input.md](../../../../../components/common/Input.md)

## Signature and responsibility

- **Name:** `Input` (exported).
- **Parameters:** `{
  label,
  error,
  className = '',
  id,
  ...rest
}`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `Input` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.
  label,
  error,
  className = '',
  id,
  ...rest
}`. Hinglish: yeh UI render karta hai; exact source return fragments neeche diye gaye hain.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** ``L10: ( <label className={`field-label ${className}`}> {label} <input id={inputId} aria-invalid={error ? 'true' : undefined} {...rest} /> {error && <small className="field-error" role="alert">{error}</small>} </label> )``
- **Direct call identifiers in this body:** None identified by lexical scan.
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/checkout/AddressForm.jsx, components/checkout/CustomerDetailsForm.jsx, pages/admin/AdminProductFormPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
