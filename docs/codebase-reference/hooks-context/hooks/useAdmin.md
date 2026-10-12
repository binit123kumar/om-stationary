# useAdmin.js

**Source:** `frontend/src/hooks/useAdmin.js`  
**Classification:** Hook / utility source

## Source-grounded summary

**Purpose:** useAdmin is a React hook module identified by source path. Exports and callers are statically indexed; runtime behavior is not asserted.

## Declarations and dependencies

- Exports: useAdminKey, useAdmin, apiFetch
- Named function-like declarations: useAdminKey, useAdmin
- Direct local imports: readSession -> services/session.js; apiFetch -> services/api.js; adminHeaders, adjustStock, assignDelivery, confirmOrderPayment, deactivateProduct, getDashboard, listAdminOrders, listAdminProducts, saveAdminSettings, updateOrderStatus, updateProduct -> services/adminService.js
- Direct static consumers (impact): components/admin/AdminSignIn.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: useAdminKey, useState, getItem, useCallback, preventDefault, setItem, setKey, useAdmin, readSession, adminHeaders, async, setLoading, setError, all, listAdminOrders, getDashboard, listAdminProducts, Error, setOrders, json, setDashboard, setProducts, useEffect, load
- Error/control-flow markers: try/catch, throw, finally
- Browser storage / network / navigation markers: web storage
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/hooks/useAdmin.js/_index.md) for one report per statically identified named declaration in this source file.
