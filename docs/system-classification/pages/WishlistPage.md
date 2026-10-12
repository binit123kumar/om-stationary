# WishlistPage

## Route and source identity

- Classification: active route-level page module dispatched by RouteView.
- Source: [frontend/src/pages/customer/WishlistPage.jsx](../../../frontend/src/pages/customer/WishlistPage.jsx)
- Route key(s): **wishlist**
- Route declarations and guards: **/wishlist** (Public (no ProtectedRoute wrapper in declaration))
- Registration: [frontend/src/App.jsx](../../../frontend/src/App.jsx); dispatch: [frontend/src/RouteView.jsx](../../../frontend/src/RouteView.jsx).
- Named exports detected: WishlistPage.
- RouteView dispatch branch: case 'wishlist': return <WishlistPage catalog={state.catalog} wishlist={state.wishlist} add={state.add} addN={state.addN} toggleWishlist={state.toggleWishlist} user={state.user} error={state.wishlistError} loading={state.wishlistLoading} reload={state.syncWishlistFromServer} />;.

## Imported project modules

### components

- [ProductCard](../components/products/ProductCard.md) — source frontend/src/components/products/ProductCard.jsx.

### services

- [getWishlist](../services/wishlistService.md) — source frontend/src/services/wishlistService.js.

### hooks

- No imports from this source area detected.

### utils

- No imports from this source area detected.

## Source observations

- Hook-call identifiers lexically invoked here: useState, useCallback, useEffect.
- Imported service functions whose names also appear as calls: [getWishlist](../services/wishlistService.md).
- Literal /api/ strings present in this module: none found. Service-mediated HTTP call expressions are documented in their service reports.

## Verification boundary

Static source inspection only. This report does not assert a rendered/browser result, successful service response, authorization outcome, or database effect. No backend mapping is asserted here unless independently source-mapped elsewhere.
