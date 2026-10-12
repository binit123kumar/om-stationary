# wishlistService service

## Source identity

- Source: [frontend/src/services/wishlistService.js](../../../frontend/src/services/wishlistService.js)
- Classification: frontend service module under frontend/src/services.
- Exported declarations detected: getWishlist, addToWishlist, removeFromWishlist, moveToCart.
- Important function exports, signatures, and adjacent source comments:
- **getWishlist()** — No directly preceding source comment.
- **addToWishlist(productId)** — No directly preceding source comment.
- **removeFromWishlist(productId)** — No directly preceding source comment.
- **moveToCart(productId)** — No directly preceding source comment.

## HTTP call expressions detected
- GET/DEFAULT via apiFetch; path expression: /api/wishlist.
- POST via apiFetch; path expression: dynamic first argument: '/api/wishlist/' + encodeURIComponent(productId).
- DELETE via apiFetch; path expression: dynamic first argument: '/api/wishlist/' + encodeURIComponent(productId).
- POST via apiFetch; path expression: /api/wishlist/' + encodeURIComponent(productId) + '/move-to-cart.

## Local dependencies

- apiFetch from frontend/src/services/api.js.

## Backend mapping and runtime status

The listed expressions are frontend source call sites; method labels use a static scan of the nearby options object and otherwise say GET/default. They are not observed network traffic. No backend route/action mapping is asserted in this report, and response behavior or availability is not runtime-verified.
