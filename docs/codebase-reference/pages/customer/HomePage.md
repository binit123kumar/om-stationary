# HomePage.jsx

**Source:** `frontend/src/pages/customer/HomePage.jsx`  
**Classification:** Routed page source
**Route classification:** /; * (fallback route)
**Shared shell:** App.jsx nests declared routes beneath AppShell and AppErrorBoundary; AppShell renders Header, main/Outlet, FooterMap, and PwaExperience.

## Source-grounded summary

**Purpose:** HomePage is the routed page component identified by its source declaration and route mapping above. Directly composed UI and imports are recorded below; no behavior is inferred beyond source.

## UI and composition

- JSX component tags: Link, ArrowRight, ShieldCheck, Store, PackageCheck, Truck, BadgeCheck, BookOpen, ProductCard
- JSX text-region fragments (lexical; may include expressions): `YOUR LOCAL STATIONERY STORE`; `Make room for`; `brighter ideas.`; `Shop the catalogue`; `Explore products`; `Secure checkout · Local service · Pickup available`; `OM`; `OM Stationary · Your learning partner`; `Easy order tracking`; `Follow your order updates`

## Declarations and dependencies

- Exports: HomePage, rememberRecentProduct
- Named function-like declarations: HomePage, cardProps, rememberRecentProduct
- Direct local imports: ProductCard -> components/products/ProductCard.jsx; readRecentProducts, writeRecentProducts -> utils/storage.js
- Direct static consumers (impact): pages/customer/ProductDetailPage.jsx, RouteView.jsx

## Props, hooks, and API usage

- First named function-like declaration parameters: { add, addN, catalog, categories = [], wishlist = [], toggleWishlist }
- React hooks/state APIs: useState
- State bindings found in useState/useReducer pair destructuring: recentIds
- API path literals in this file: None; calls may be delegated to imported hooks/services.
- Direct imports that can carry data/API behavior: None.

## Behavior, errors, security, and maintenance

- Statically observed calls: HomePage, Set, map, filter, useState, find, Number, slice, sort, Date, includes, encodeURIComponent, reload, cardProps, rememberRecentProduct, readRecentProducts, writeRecentProducts
- Error/control-flow markers: No explicit try/throw/finally token found.
- Browser storage / network / navigation markers: navigation
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/pages/customer/HomePage.jsx/_index.md) for one report per statically identified named declaration in this source file.
