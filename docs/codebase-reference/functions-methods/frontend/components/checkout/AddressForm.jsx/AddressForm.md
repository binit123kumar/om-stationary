# AddressForm (exported)

**Source identity:** `frontend/src/components/checkout/AddressForm.jsx`, declaration at line 7  
**Declaration kind:** function declaration  
**Module report:** [AddressForm.md](../../../../../components/checkout/AddressForm.md)

## Signature and responsibility

- **Name:** `AddressForm` (exported).
- **Parameters:** `{
  details,
  errors,
  cities = [],
  locating = false,
  quoting = false,
  geoError = '',
  quote,
  quoteError = '',
  onField,
  onRequestLocation,
  onRequestQuote
}`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `AddressForm` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.
  details,
  errors,
  cities = [],
  locating = false,
  quoting = false,
  geoError = '',
  quote,
  quoteError = '',
  onField,
  onRequestLocation,
  onRequestQuote
}`. Hinglish: yeh UI render karta hai; exact source return fragments neeche diye gaye hain.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L20: ( <div className="delivery-panel"> <div className="flow-fields"> <Input label="Address" name="addressLine" value={details.addressLine} maxLength={300} autoComplete="street-address" placeholder="House / street" className=`
- **Direct call identifiers in this body:** onField, map
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/customer/CheckoutPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
