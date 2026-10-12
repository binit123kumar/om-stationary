# updateCheckoutDetail

**Source identity:** `frontend/src/pages/customer/CheckoutPage.jsx`, declaration at line 146  
**Signature:** `updateCheckoutDetail(key) => (value) => ...`

Returns a field-value handler that updates the matching checkout detail and clears that field's existing validation error. Hinglish: checkout ke specified customer/address field ko update karke uska error clear karta hai.

**Effects:** React state updates only.
**Call sites:** Customer details, address, and billing address controls.
**Validation:** Frontend production build passed; no dedicated frontend tests are configured.
