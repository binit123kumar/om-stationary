# ProductDetailPage.jsx

**Source:** `frontend/src/pages/customer/ProductDetailPage.jsx`  
**Classification:** Routed page source
**Route classification:** /product/:id
**Shared shell:** App.jsx nests declared routes beneath AppShell and AppErrorBoundary; AppShell renders Header, main/Outlet, FooterMap, and PwaExperience.

## Source-grounded summary

**Purpose:** ProductDetailPage is the routed page component identified by its source declaration and route mapping above. Directly composed UI and imports are recorded below; no behavior is inferred beyond source.

## UI and composition

- JSX component tags: PackageCheck, Link, Breadcrumbs, ProductGallery, ProductInfo, ProductTabs
- JSX text-region fragments (lexical; may include expressions): `Loading product...`; `Product not found`; `Browse products`

## Declarations and dependencies

- Exports: ProductDetailPage
- Named function-like declarations: ProductDetailPage, buyNow, addQuantity
- Direct local imports: getProduct -> services/productService.js; ProductGallery -> components/products/ProductGallery.jsx; ProductInfo -> components/products/ProductInfo.jsx; ProductTabs -> components/products/ProductTabs.jsx; Breadcrumbs -> components/layout/Breadcrumbs.jsx; rememberRecentProduct -> pages/customer/HomePage.jsx
- Direct static consumers (impact): RouteView.jsx

## Props, hooks, and API usage

- First named function-like declaration parameters: { add, addN, catalog, wishlist, toggleWishlist }
- React hooks/state APIs: useNavigate, useParams, useState, useEffect
- State bindings found in useState/useReducer pair destructuring: remote, setRemote, missing, setMissing
- API path literals in this file: None; calls may be delegated to imported hooks/services.
- Direct imports that can carry data/API behavior: getProduct -> services/productService.js

## Behavior, errors, security, and maintenance

- Statically observed calls: ProductDetailPage, useNavigate, useParams, find, Number, useState, useEffect, setRemote, setMissing, getProduct, then, rememberRecentProduct, addN, add, navigate
- Error/control-flow markers: No explicit try/throw/finally token found.
- Browser storage / network / navigation markers: navigation
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/pages/customer/ProductDetailPage.jsx/_index.md) for one report per statically identified named declaration in this source file.
