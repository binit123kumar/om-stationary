# validation.js

**Source:** `frontend/src/utils/validation.js`  
**Classification:** Hook / utility source

## Source-grounded summary

**Purpose:** validation is a utility module identified by source path. Exports and callers are statically indexed; runtime behavior is not asserted.

## Declarations and dependencies

- Exports: normaliseMobile, validateRegister, validateLogin, validateCheckoutDetails
- Named function-like declarations: normaliseMobile, validateRegister, validateLogin, validateCheckoutDetails
- Direct local imports: None.
- Direct static consumers (impact): components/auth/LoginForm.jsx, components/auth/PasswordField.jsx, pages/customer/CheckoutPage.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: MinLength, MaxLength, normaliseMobile, String, replace, startsWith, slice, validateRegister, trim, name, test, validateLogin, validateCheckoutDetails, Date, getTime, now
- Error/control-flow markers: No explicit try/throw/finally token found.
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/utils/validation.js/_index.md) for one report per statically identified named declaration in this source file.
