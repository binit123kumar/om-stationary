# AddressForm (exported)

**Source identity:** `frontend/src/components/account/AddressForm.jsx`, declaration at line 2  
**Declaration kind:** function declaration  
**Module report:** [AddressForm.md](../../../../../components/account/AddressForm.md)

## Signature and responsibility

- **Name:** `AddressForm` (exported).
- **Parameters:** `{ profile, user, onSave, busy = false }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `AddressForm` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L3: ( <form className="panel account-form" onSubmit={onSave}> <h2>Add delivery address</h2> <label> Label <input name="label" defaultValue="Home" required /> </label> <label> Recipient name <input name="recipientName" defaul`
- **Direct call identifiers in this body:** None identified by lexical scan.
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/customer/AccountPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
