# AdminProductsPage.jsx

**Source:** `frontend/src/pages/admin/AdminProductsPage.jsx`  
**Classification:** Routed page source
**Route classification:** /admin/products (ProtectedRoute role: Admin)
**Shared shell:** App.jsx nests declared routes beneath AppShell and AppErrorBoundary; AppShell renders Header, main/Outlet, FooterMap, and PwaExperience.

## Source-grounded summary

**Purpose:** AdminProductsPage is the routed page component identified by its source declaration and route mapping above. Directly composed UI and imports are recorded below; no behavior is inferred beyond source.

## UI and composition

- JSX component tags: AdminLayout, Link, AdminKpiCard, AdminDataTable
- JSX text-region fragments (lexical; may include expressions): `ADMIN PANEL`; `Products`; `{data.total} products`; `Add product`; `{error}`; `{message}`; `{product.name}`; `{product.category} · {product.unit}`; `{product.sku || '—'}`; `{rupeesShort(product.price)}`

## Declarations and dependencies

- Exports: AdminProductsPage
- Named function-like declarations: AdminProductsPage, runAdjust, runToggle, runDeactivate
- Direct local imports: AdminLayout -> components/admin/AdminLayout.jsx; AdminKpiCard -> components/admin/AdminKpiCard.jsx; AdminDataTable -> components/admin/AdminDataTable.jsx; adminHeaders, adjustStock, deactivateProduct, listAdminProducts, updateProduct -> services/adminService.js; readSession -> services/session.js; rupeesShort -> utils/formatCurrency.js; stockStateLabel -> utils/formatOrderStatus.js; ADMIN_PAGE_SIZE -> utils/constants.js
- Direct static consumers (impact): RouteView.jsx

## Props, hooks, and API usage

- First named function-like declaration parameters: { user, key, onLogout }
- React hooks/state APIs: useState, useCallback, useEffect
- State bindings found in useState/useReducer pair destructuring: data, setData, loading, setLoading, error, setError, message, setMessage, pending, setPending, q, setQ, category, setCategory, lowStockOnly, setLowStockOnly, page, setPage
- API path literals in this file: None; calls may be delegated to imported hooks/services.
- Direct imports that can carry data/API behavior: adminHeaders, adjustStock, deactivateProduct, listAdminProducts, updateProduct -> services/adminService.js; readSession -> services/session.js

## Behavior, errors, security, and maintenance

- Statically observed calls: AdminProductsPage, adminHeaders, readSession, useState, useCallback, async, setLoading, setError, String, listAdminProducts, setData, useEffect, load, setPending, setMessage, adjustStock, json, Error, updateProduct, deactivateProduct, setQ, setPage, setCategory, setLowStockOnly
- Error/control-flow markers: try/catch, throw, finally
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/pages/admin/AdminProductsPage.jsx/_index.md) for one report per statically identified named declaration in this source file.
