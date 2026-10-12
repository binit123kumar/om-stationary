# AddressCard (exported)

**Source identity:** `frontend/src/components/account/AddressCard.jsx`, declaration at line 2  
**Declaration kind:** function declaration  
**Module report:** [AddressCard.md](../../../../../components/account/AddressCard.md)

## Signature and responsibility

- **Name:** `AddressCard` (exported).
- **Parameters:** `{ address, onRemove }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `AddressCard` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** ``L3: ( <article> <b>{address.label}{address.isDefault ? ' · Default' : ''}</b> <span>{address.recipientName} · {address.phone}</span> <span> {address.line1}{address.line2 ? `, ${address.line2}` : ''}, {address.city}, {address``
- **Direct call identifiers in this body:** onRemove
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/account/AddressList.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
