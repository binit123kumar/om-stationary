# AdminProductFormPage.jsx

**Source:** `frontend/src/pages/admin/AdminProductFormPage.jsx`  
**Classification:** Routed page source
**Route classification:** /admin/products/new (ProtectedRoute role: Admin); /admin/products/:id/edit (ProtectedRoute role: Admin)
**Shared shell:** App.jsx nests declared routes beneath AppShell and AppErrorBoundary; AppShell renders Header, main/Outlet, FooterMap, and PwaExperience.

## Source-grounded summary

**Purpose:** AdminProductFormPage is the routed page component identified by its source declaration and route mapping above. Directly composed UI and imports are recorded below; no behavior is inferred beyond source.

## UI and composition

- JSX component tags: AdminLayout, Link, Input, Checkbox, Button
- JSX text-region fragments (lexical; may include expressions): `ADMIN PANEL`; `{editMode ` 'Edit product' : 'Add product'}?; `{editMode ` `Product #${id}` : 'A new catalogue entry'}?; `All products`; `{error}`; `{message}`

## Declarations and dependencies

- Exports: AdminProductFormPage
- Named function-like declarations: AdminProductFormPage, setField, validate, submit
- Direct local imports: AdminLayout -> components/admin/AdminLayout.jsx; Input -> components/common/Input.jsx; Checkbox -> components/common/Checkbox.jsx; Button -> components/common/Button.jsx; adminHeaders, createProduct, updateProduct -> services/adminService.js; getProduct -> services/productService.js; readSession -> services/session.js
- Direct static consumers (impact): RouteView.jsx

## Props, hooks, and API usage

- First named function-like declaration parameters: { user, key, onLogout }
- React hooks/state APIs: useNavigate, useParams, useState, useEffect
- State bindings found in useState/useReducer pair destructuring: form, setForm, errors, setErrors, busy, setBusy, error, setError, message, setMessage
- API path literals in this file: None; calls may be delegated to imported hooks/services.
- Direct imports that can carry data/API behavior: adminHeaders, createProduct, updateProduct -> services/adminService.js; getProduct -> services/productService.js; readSession -> services/session.js

## Behavior, errors, security, and maintenance

- Statically observed calls: new, edit, AdminProductFormPage, useNavigate, useParams, Boolean, adminHeaders, readSession, useState, useEffect, async, getProduct, setError, setForm, setErrors, String, trim, Number, keys, preventDefault, validate, setBusy, setMessage, updateProduct
- Error/control-flow markers: try/catch, throw, finally
- Browser storage / network / navigation markers: navigation
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/pages/admin/AdminProductFormPage.jsx/_index.md) for one report per statically identified named declaration in this source file.
