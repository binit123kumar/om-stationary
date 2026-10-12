# AdminCouponsPage.jsx

**Source:** `frontend/src/pages/admin/AdminCouponsPage.jsx`  
**Classification:** Routed page source
**Route classification:** /admin/coupons (ProtectedRoute role: Admin)
**Shared shell:** App.jsx nests declared routes beneath AppShell and AppErrorBoundary; AppShell renders Header, main/Outlet, FooterMap, and PwaExperience.

## Source-grounded summary

**Purpose:** AdminCouponsPage is the routed page component identified by its source declaration and route mapping above. Directly composed UI and imports are recorded below; no behavior is inferred beyond source.

## UI and composition

- JSX component tags: AdminLayout, AdminDataTable, Modal
- JSX text-region fragments (lexical; may include expressions): `ADMIN PANEL`; `Coupons`; `Manage real coupon rules and usage limits.`; `Create coupon`; `{error &&`; `{error}`; `{c.code}`; `{c.discountType === 'Percentage' ` `${c.discountValue}%` : rupeesShort(c.discountValue)}?; `{rupeesShort(c.minimumOrderValue)}`; `{c.maximumDiscount == null ` '-' : rupeesShort(c.maximumDiscount)}?

## Declarations and dependencies

- Exports: AdminCouponsPage
- Named function-like declarations: blank, localInput, AdminCouponsPage, open, set, save
- Direct local imports: AdminLayout -> components/admin/AdminLayout.jsx; AdminDataTable -> components/admin/AdminDataTable.jsx; Modal -> components/common/Modal.jsx; adminHeaders, createCoupon, listAdminCoupons, updateCoupon -> services/adminService.js; readSession -> services/session.js; formatDateTime -> utils/formatDate.js; rupeesShort -> utils/formatCurrency.js
- Direct static consumers (impact): RouteView.jsx

## Props, hooks, and API usage

- First named function-like declaration parameters: (none declared)
- React hooks/state APIs: useState, useCallback, useEffect
- State bindings found in useState/useReducer pair destructuring: rows, setRows, loading, setLoading, error, setError, busy, setBusy, editing, setEditing, form, setForm
- API path literals in this file: None; calls may be delegated to imported hooks/services.
- Direct imports that can carry data/API behavior: adminHeaders, createCoupon, listAdminCoupons, updateCoupon -> services/adminService.js; readSession -> services/session.js

## Behavior, errors, security, and maintenance

- Statically observed calls: Date, toISOString, slice, AdminCouponsPage, adminHeaders, readSession, useState, blank, useCallback, async, setLoading, setError, setRows, listAdminCoupons, useEffect, load, setEditing, setForm, String, localInput, preventDefault, setBusy, Number, trim
- Error/control-flow markers: try/catch, throw, finally
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/pages/admin/AdminCouponsPage.jsx/_index.md) for one report per statically identified named declaration in this source file.
