# Button (exported)

**Source identity:** `frontend/src/components/common/Button.jsx`, declaration at line 3  
**Declaration kind:** function declaration  
**Module report:** [Button.md](../../../../../components/common/Button.md)

## Signature and responsibility

- **Name:** `Button` (exported).
- **Parameters:** `{
  children,
  variant = 'primary',
  wide = false,
  busy = false,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...rest
}`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `Button` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.
  children,
  variant = 'primary',
  wide = false,
  busy = false,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...rest
}`. Hinglish: yeh UI render karta hai; exact source return fragments neeche diye gaye hain.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L19: ( <button type={type} className={classes} disabled={disabled || busy} onClick={onClick} {...rest}> {busy ? 'Please wait…' : children} </button> )`
- **Direct call identifiers in this body:** filter, join
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/checkout/AddressForm.jsx, components/checkout/PlaceOrderButton.jsx, pages/admin/AdminProductFormPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
