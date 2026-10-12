# validateCheckoutForm

**Source identity:** `frontend/src/pages/customer/CheckoutPage.jsx`, declaration at line 151  
**Signature:** `validateCheckoutForm()`

Runs `validateCheckoutDetails` against the current customer details, fulfillment method, and pickup slot. For delivery, it also reports a location-sharing error when coordinates are missing, stores all field errors, and returns whether the form is valid. Hinglish: order se pehle checkout details aur delivery location ki validity check karta hai.

**Effects:** Updates field-error state.
**Call sites:** Delivery quote request and order placement.
**Validation:** Frontend production build passed; backend-dependent workflow was not exercised because the API was unavailable.
