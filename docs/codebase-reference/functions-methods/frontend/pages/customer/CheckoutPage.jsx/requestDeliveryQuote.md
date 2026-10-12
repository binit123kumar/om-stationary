# requestDeliveryQuote

**Source identity:** `frontend/src/pages/customer/CheckoutPage.jsx`, declaration at line 160  
**Signature:** `async requestDeliveryQuote()`

Validates checkout fields, posts the existing delivery-quote request to `/api/delivery/quote`, updates quote/error state from the API result, reports connection errors, and clears the in-progress state in `finally`. Hinglish: entered address aur cart ke liye API se delivery availability aur quote mangta hai.

**Effects:** HTTP POST and React state updates.
**Contract:** Endpoint and serialized request fields are unchanged.
**Validation:** Frontend production build passed. Browser preview could not reach the API; quote behavior is not runtime-verified.
