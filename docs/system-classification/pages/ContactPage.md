# ContactPage

## Route and source identity

- Classification: active route-level page module dispatched by RouteView.
- Source: [frontend/src/pages/customer/ContactPage.jsx](../../../frontend/src/pages/customer/ContactPage.jsx)
- Route key(s): **contact**
- Route declarations and guards: **/contact** (Public (no ProtectedRoute wrapper in declaration))
- Registration: [frontend/src/App.jsx](../../../frontend/src/App.jsx); dispatch: [frontend/src/RouteView.jsx](../../../frontend/src/RouteView.jsx).
- Named exports detected: ContactPage.
- RouteView dispatch branch: case 'contact': return <ContactPage />;.

## Imported project modules

### components

- No imports from this source area detected.

### services

- No imports from this source area detected.

### hooks

- [usePickupLocation](../hooks/usePickupLocation.md) — source frontend/src/hooks/usePickupLocation.js.

### utils

- OM_CONTACT — source frontend/src/utils/constants.js.

## Source observations

- Hook-call identifiers lexically invoked here: usePickupLocation.
- Imported service functions whose names also appear as calls: none detected.
- Literal /api/ strings present in this module: none found. Service-mediated HTTP call expressions are documented in their service reports.

## Verification boundary

Static source inspection only. This report does not assert a rendered/browser result, successful service response, authorization outcome, or database effect. No backend mapping is asserted here unless independently source-mapped elsewhere.
