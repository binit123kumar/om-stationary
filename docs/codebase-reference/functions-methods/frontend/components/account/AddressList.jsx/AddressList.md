# AddressList (exported)

**Source identity:** `frontend/src/components/account/AddressList.jsx`, declaration at line 4  
**Declaration kind:** function declaration  
**Module report:** [AddressList.md](../../../../../components/account/AddressList.md)

## Signature and responsibility

- **Name:** `AddressList` (exported).
- **Parameters:** `{ addresses = [], onRemove }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `AddressList` UI render karta hai; body has 2 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L6: ( <section className="panel saved-addresses"> <h2>Saved addresses</h2> <p>No saved addresses yet. Add one below to speed up checkout.</p> </section> )`
- **Return at source:** `L13: ( <section className="panel saved-addresses"> <h2>Saved addresses</h2> {addresses.map((address) => ( <AddressCard key={address.id} address={address} onRemove={onRemove} /> ))} </section> )`
- **Direct call identifiers in this body:** map
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/customer/AccountPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
