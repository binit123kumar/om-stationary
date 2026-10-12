# AccountPage

## Route and source identity

- Classification: active route-level page module dispatched by RouteView.
- Source: [frontend/src/pages/customer/AccountPage.jsx](../../../frontend/src/pages/customer/AccountPage.jsx)
- Route key(s): **account**
- Route declarations and guards: **/account** (Public (no ProtectedRoute wrapper in declaration))
- Registration: [frontend/src/App.jsx](../../../frontend/src/App.jsx); dispatch: [frontend/src/RouteView.jsx](../../../frontend/src/RouteView.jsx).
- Named exports detected: AccountPage.
- RouteView dispatch branch: case 'account': return <AccountPage user={state.user} onLogout={state.onLogout} />;.

## Imported project modules

### components

- [AddressForm](../components/account/AddressForm.md) — source frontend/src/components/account/AddressForm.jsx.
- [AddressList](../components/account/AddressList.md) — source frontend/src/components/account/AddressList.jsx.
- [ProfileForm](../components/account/ProfileForm.md) — source frontend/src/components/account/ProfileForm.jsx.

### services

- [apiFetch](../services/api.md) — source frontend/src/services/api.js.

### hooks

- No imports from this source area detected.

### utils

- No imports from this source area detected.

## Source observations

- Hook-call identifiers lexically invoked here: useState, useEffect.
- Imported service functions whose names also appear as calls: [apiFetch](../services/api.md).
- Literal /api/ strings present in this module: /api/customers/me, /api/customers/addresses, /api/customers/addresses/${address.id}. Service-mediated HTTP call expressions are documented in their service reports.

## Verification boundary

Static source inspection only. This report does not assert a rendered/browser result, successful service response, authorization outcome, or database effect. No backend mapping is asserted here unless independently source-mapped elsewhere.
