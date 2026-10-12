# useWishlist.js

**Source:** `frontend/src/hooks/useWishlist.js`  
**Classification:** Hook / utility source

## Source-grounded summary

**Purpose:** useWishlist is a React hook module identified by source path. Exports and callers are statically indexed; runtime behavior is not asserted.

## Declarations and dependencies

- Exports: useWishlist
- Named function-like declarations: useWishlist
- Direct local imports: apiFetch -> services/api.js; getWishlist -> services/wishlistService.js; clearWishlist, readWishlist, writeWishlist -> utils/storage.js
- Direct static consumers (impact): None found under frontend/src.

## Behavior, errors, security, and maintenance

- Statically observed calls: useWishlist, useState, useCallback, async, setWishlistLoading, getWishlist, setWishlist, setWishlistError, isArray, map, writeWishlist, useEffect, syncWishlistFromServer, clearWishlist, includes, filter, apiFetch, encodeURIComponent, Error
- Error/control-flow markers: try/catch, throw, finally
- Browser storage / network / navigation markers: network call, web storage
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/hooks/useWishlist.js/_index.md) for one report per statically identified named declaration in this source file.
