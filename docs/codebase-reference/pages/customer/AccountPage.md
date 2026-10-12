# AccountPage.jsx

**Source:** `frontend/src/pages/customer/AccountPage.jsx`  
**Classification:** Routed page source
**Route classification:** /account
**Shared shell:** App.jsx nests declared routes beneath AppShell and AppErrorBoundary; AppShell renders Header, main/Outlet, FooterMap, and PwaExperience.

## Source-grounded summary

**Purpose:** AccountPage is the routed page component identified by its source declaration and route mapping above. Directly composed UI and imports are recorded below; no behavior is inferred beyond source.

## UI and composition

- JSX component tags: User, Link, ProfileForm, AddressForm, AddressList
- JSX text-region fragments (lexical; may include expressions): `Your OM Stationary account`; `Sign in`; `Create account`; `ACCOUNT`; `{user.role} account`; `Signed in as {user.email}.`; `Open admin`; `Open partner dashboard`; `Open delivery dashboard`; `Sign out`

## Declarations and dependencies

- Exports: AccountPage
- Named function-like declarations: AccountPage, reload, saveProfile, addAddress, removeAddress
- Direct local imports: apiFetch -> services/api.js; AddressForm -> components/account/AddressForm.jsx; AddressList -> components/account/AddressList.jsx; ProfileForm -> components/account/ProfileForm.jsx
- Direct static consumers (impact): RouteView.jsx

## Props, hooks, and API usage

- First named function-like declaration parameters: { user, onLogout }
- React hooks/state APIs: useState, useEffect
- State bindings found in useState/useReducer pair destructuring: profile, setProfile, addresses, setAddresses, message, setMessage, error, setError, busy, setBusy
- API path literals in this file: /api/customers/me, /api/customers/addresses
- Direct imports that can carry data/API behavior: apiFetch -> services/api.js

## Behavior, errors, security, and maintenance

- Statically observed calls: AccountPage, useState, async, all, apiFetch, setProfile, json, setError, setAddresses, useEffect, reload, preventDefault, setBusy, FormData, stringify, get, setMessage, fromEntries, entries, has, reset
- Error/control-flow markers: No explicit try/throw/finally token found.
- Browser storage / network / navigation markers: network call
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/pages/customer/AccountPage.jsx/_index.md) for one report per statically identified named declaration in this source file.
