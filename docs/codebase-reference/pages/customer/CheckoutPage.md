# CheckoutPage.jsx

**Source:** `frontend/src/pages/customer/CheckoutPage.jsx`  
**Classification:** Routed page source
**Route classification:** /checkout
**Shared shell:** App.jsx nests declared routes beneath AppShell and AppErrorBoundary; AppShell renders Header, main/Outlet, FooterMap, and PwaExperience.

## Source-grounded summary

**Purpose:** CheckoutPage is the routed page component identified by its source declaration and route mapping above. Directly composed UI and imports are recorded below; no behavior is inferred beyond source.

## UI and composition

- JSX component tags: AuthGate, Store, Link, DeliveryMethodSelector, Clock, Phone, AddressForm, CustomerDetailsForm, PaymentMethodSelector, ShieldCheck, OrderSummary, CouponBox, PlaceOrderButton, Lock
- JSX text-region fragments (lexical; may include expressions): `Your cart is empty`; `Add something to your cart before checking out.`; `Continue shopping`; `Loading checkout options…`; `SECURE CHECKOUT`; `Complete your order`; `Fulfillment`; `{config.location.hours}`; `Select a pickup slot`; `{formatSlot(slot)}`

## Declarations and dependencies

- Exports: CheckoutPage
- Named function-like declarations: CheckoutPage, requestLocation, updateCheckoutDetail, validateCheckoutForm, requestDeliveryQuote, placeOrder
- Direct local imports: apiFetch, readFailure -> services/api.js; createOrder -> services/orderService.js; readSession -> services/session.js; AuthGate -> components/checkout/AuthGate.jsx; AddressForm -> components/checkout/AddressForm.jsx; CouponBox -> components/checkout/CouponBox.jsx; CustomerDetailsForm -> components/checkout/CustomerDetailsForm.jsx; DeliveryMethodSelector -> components/checkout/DeliveryMethodSelector.jsx; OrderSummary -> components/checkout/OrderSummary.jsx; PaymentMethodSelector -> components/checkout/PaymentMethodSelector.jsx; PlaceOrderButton -> components/checkout/PlaceOrderButton.jsx; useStoreConfig -> hooks/useDelivery.js; rememberOrder -> utils/storage.js; formatSlot, toLocalInputValue, toMinutes -> utils/formatDate.js; rupees, rupeesShort -> utils/formatCurrency.js; validateCheckoutDetails -> utils/validation.js
- Direct static consumers (impact): RouteView.jsx

## Props, hooks, and API usage

- First named function-like declaration parameters: { cart, user, onCartCleared }
- React hooks/state APIs: useNavigate, useStoreConfig, useState, useMemo, useEffect
- State bindings found in useState/useReducer pair destructuring: fulfillment, setFulfillment, payment, setPayment, pickupSlot, setPickupSlot, details, setDetails, coordinates, setCoordinates, geoError, setGeoError, locating, setLocating, quote, setQuote, quoteError, setQuoteError, quoting, setQuoting, couponCode, setCouponCode, coupon, setCoupon, fieldErrors, setFieldErrors, error, setError, placing, setPlacing
- API path literals in this file: /api/delivery/quote
- Direct imports that can carry data/API behavior: apiFetch, readFailure -> services/api.js; createOrder -> services/orderService.js; readSession -> services/session.js; useStoreConfig -> hooks/useDelivery.js

## Behavior, errors, security, and maintenance

- Statically observed calls: step, CheckoutPage, useNavigate, useStoreConfig, useState, readSession, useMemo, reduce, Number, map, useEffect, setDetails, setFulfillment, Date, now, setMinutes, setPickupSlot, toLocalInputValue, setQuote, setQuoteError, getMinutes, getTime, getHours, toMinutes
- Error/control-flow markers: try/catch, finally
- Browser storage / network / navigation markers: network call, navigation
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/pages/customer/CheckoutPage.jsx/_index.md) for one report per statically identified named declaration in this source file.
