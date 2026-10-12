# WishlistPage.jsx

**Source:** `frontend/src/pages/customer/WishlistPage.jsx`  
**Classification:** Routed page source
**Route classification:** /wishlist
**Shared shell:** App.jsx nests declared routes beneath AppShell and AppErrorBoundary; AppShell renders Header, main/Outlet, FooterMap, and PwaExperience.

## Source-grounded summary

**Purpose:** WishlistPage is the routed page component identified by its source declaration and route mapping above. Directly composed UI and imports are recorded below; no behavior is inferred beyond source.

## UI and composition

- JSX component tags: ProductCard, Heart, Link
- JSX text-region fragments (lexical; may include expressions): `SAVED PRODUCTS`; `Your wishlist`; `Saved to your OM Stationary account - it stays on every device you sign in from.`; `Retry`; `Loading saved products...`; `Your wishlist is empty`; `Tap the heart on any product to save it here.`; `Browse products`; ?You&rsquo;re browsing as a guest. Sign in to save this wishlist to your account.?; `{showError}`

## Declarations and dependencies

- Exports: WishlistPage
- Named function-like declarations: WishlistPage
- Direct local imports: getWishlist -> services/wishlistService.js; ProductCard -> components/products/ProductCard.jsx
- Direct static consumers (impact): RouteView.jsx

## Props, hooks, and API usage

- First named function-like declaration parameters: {
  catalog,
  wishlist,
  add,
  addN,
  toggleWishlist,
  user,
  error = '',
  loading = false,
  reload
}
- React hooks/state APIs: useState, useCallback, useEffect
- State bindings found in useState/useReducer pair destructuring: rows, setRows, rowLoading, setRowLoading, rowError, setRowError
- API path literals in this file: None; calls may be delegated to imported hooks/services.
- Direct imports that can carry data/API behavior: getWishlist -> services/wishlistService.js

## Behavior, errors, security, and maintenance

- Statically observed calls: loader, WishlistPage, useState, useCallback, async, setRows, setRowLoading, setRowError, getWishlist, isArray, map, useEffect, loadRows, filter, includes
- Error/control-flow markers: try/catch, finally
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/pages/customer/WishlistPage.jsx/_index.md) for one report per statically identified named declaration in this source file.
