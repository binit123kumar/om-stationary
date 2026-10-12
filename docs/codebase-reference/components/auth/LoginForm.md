# LoginForm.jsx

**Source:** `frontend/src/components/auth/LoginForm.jsx`  
**Classification:** Reusable component source

## Source-grounded summary

**Purpose:** LoginForm is the reusable UI module in its source folder. The report records JSX composition, parameters, state, event-related identifiers, styles, and direct consumers.

## Props, state, events, and styles

- First named function-like declaration parameters: { onAuth, register: registerMode = false }
- React hooks/state APIs referenced: useLocation, useNavigate, useMemo, useState, useEffect
- DOM/component event props and named event handlers found: onAuth, onChange, onSubmit, onContinue
- Stylesheet imports: No direct stylesheet imports.
- JSX component tags: PasswordField, Link, AuthError, AuthSuccessModal

## Declarations and dependencies

- Exports: LoginForm
- Named function-like declarations: LoginForm, updateAuthField, completeAuthentication, submitAuthForm, goShopping, renderAuthField
- Direct local imports: apiBase, mapServerCart, saveSession -> services/session.js; mergeGuestCart -> services/cartService.js; login, register -> services/authService.js; normaliseMobile, PASSWORD_MAX, PASSWORD_MIN, validateLogin, validateRegister -> utils/validation.js; AuthError -> components/auth/AuthError.jsx; AuthSuccessModal -> components/auth/AuthSuccessModal.jsx; PasswordField -> components/auth/PasswordField.jsx
- Direct static consumers (impact): components/auth/RegisterForm.jsx, pages/customer/LoginPage.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: backend, LoginForm, useLocation, useNavigate, useMemo, URLSearchParams, get, startsWith, useState, useEffect, setErrors, setError, setForm, cart, merge, async, saveSession, parse, getItem, isArray, map, min, Number, mergeGuestCart
- Error/control-flow markers: try/catch, throw, finally
- Browser storage / network / navigation markers: network call, web storage, navigation
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/components/auth/LoginForm.jsx/_index.md) for one report per statically identified named declaration in this source file.
