# cartService service

## Source identity

- Source: [frontend/src/services/cartService.js](../../../frontend/src/services/cartService.js)
- Classification: frontend service module under frontend/src/services.
- Exported declarations detected: getCart, saveCart, mergeGuestCart.
- Important function exports, signatures, and adjacent source comments:
- **getCart()** — No directly preceding source comment.
- **saveCart(items)** — No directly preceding source comment.
- **mergeGuestCart(guestItems, accessToken)** — No directly preceding source comment.

## HTTP call expressions detected
- GET/DEFAULT via apiFetch; path expression: /api/cart.
- PUT via apiFetch; path expression: /api/cart.

## Local dependencies

- apiFetch from frontend/src/services/api.js.
- mapServerCart from frontend/src/services/session.js.

## Backend mapping and runtime status

The listed expressions are frontend source call sites; method labels use a static scan of the nearby options object and otherwise say GET/default. They are not observed network traffic. No backend route/action mapping is asserted in this report, and response behavior or availability is not runtime-verified.
