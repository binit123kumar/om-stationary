# Radio (exported)

**Source identity:** `frontend/src/components/common/Radio.jsx`, declaration at line 2  
**Declaration kind:** function declaration  
**Module report:** [Radio.md](../../../../../components/common/Radio.md)

## Signature and responsibility

- **Name:** `Radio` (exported).
- **Parameters:** `{ label, hint, checked, onChange, name, value, disabled = false, icon }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `Radio` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L3: ( <label className={checked ? 'payment-choice selected' : 'payment-choice'}> <input type="radio" name={name} checked={checked} disabled={disabled} onChange={onChange} value={value} /> {icon} <span> <b>{label}</b> {hint &`
- **Direct call identifiers in this body:** None identified by lexical scan.
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/checkout/DeliveryMethodSelector.jsx, components/checkout/PaymentMethodSelector.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
