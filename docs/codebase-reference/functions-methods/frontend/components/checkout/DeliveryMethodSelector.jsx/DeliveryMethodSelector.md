# DeliveryMethodSelector (exported)

**Source identity:** `frontend/src/components/checkout/DeliveryMethodSelector.jsx`, declaration at line 6  
**Declaration kind:** function declaration  
**Module report:** [DeliveryMethodSelector.md](../../../../../components/checkout/DeliveryMethodSelector.md)

## Signature and responsibility

- **Name:** `DeliveryMethodSelector` (exported).
- **Parameters:** `{
  fulfillment,
  pickupAvailable,
  deliveryAvailable,
  deliveryOptions,
  onChange
}`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `DeliveryMethodSelector` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.
  fulfillment,
  pickupAvailable,
  deliveryAvailable,
  deliveryOptions,
  onChange
}`. Hinglish: yeh UI render karta hai; exact source return fragments neeche diye gaye hain.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L13: ( <div className="payment-choice-grid"> <Radio name="fulfillment" value="Pickup" label="Pickup" hint={pickupAvailable ? 'Collect from OM Stationary' : 'Pickup is being configured'} checked={fulfillment === 'Pickup'} disa`
- **Direct call identifiers in this body:** onChange
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/customer/CheckoutPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
