# storage.js

**Source:** `frontend/src/utils/storage.js`  
**Classification:** Hook / utility source

## Source-grounded summary

**Purpose:** storage is a utility module identified by source path. Exports and callers are statically indexed; runtime behavior is not asserted.

## Declarations and dependencies

- Exports: readJSON, writeJSON, removeKey, readCart, writeCart, readWishlist, writeWishlist, clearWishlist, readRecentProducts, writeRecentProducts, readRecentOrders, rememberOrder, readTrackingToken
- Named function-like declarations: readJSON, writeJSON, removeKey, readCart, writeCart, readWishlist, writeWishlist, clearWishlist, readRecentProducts, writeRecentProducts, readRecentOrders, rememberOrder, readTrackingToken
- Direct local imports: CART_STORAGE_KEY, WISHLIST_STORAGE_KEY, RECENT_STORAGE_KEY, ORDERS_STORAGE_KEY, trackingTokenKey -> utils/constants.js
- Direct static consumers (impact): components/orders/TrackingTimeline.jsx, hooks/useCart.js, hooks/useOrders.js, hooks/useWishlist.js, pages/customer/CheckoutPage.jsx, pages/customer/HomePage.jsx, pages/customer/InvoicePage.jsx, pages/customer/OrderSuccessPage.jsx, pages/customer/PaymentPage.jsx, pages/customer/TrackOrderPage.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: readJSON, parse, getItem, writeJSON, setItem, stringify, removeKey, removeItem, isArray, readRecentOrders, filter, slice, trackingTokenKey
- Error/control-flow markers: try/catch
- Browser storage / network / navigation markers: web storage
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/utils/storage.js/_index.md) for one report per statically identified named declaration in this source file.
