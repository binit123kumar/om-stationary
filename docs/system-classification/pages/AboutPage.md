# AboutPage

## Route and source identity

- Classification: active route-level page module dispatched by RouteView.
- Source: [frontend/src/pages/customer/AboutPage.jsx](../../../frontend/src/pages/customer/AboutPage.jsx)
- Route key(s): **about**
- Route declarations and guards: **/about** (Public (no ProtectedRoute wrapper in declaration))
- Registration: [frontend/src/App.jsx](../../../frontend/src/App.jsx); dispatch: [frontend/src/RouteView.jsx](../../../frontend/src/RouteView.jsx).
- Named exports detected: AboutPage.
- RouteView dispatch branch: case 'about': return <AboutPage />;.

## Imported project modules

### components

- No imports from this source area detected.

### services

- No imports from this source area detected.

### hooks

- No imports from this source area detected.

### utils

- OM_CONTACT — source frontend/src/utils/constants.js.

## Source observations

- Hook-call identifiers lexically invoked here: none found.
- Imported service functions whose names also appear as calls: none detected.
- Literal /api/ strings present in this module: none found. Service-mediated HTTP call expressions are documented in their service reports.

## Verification boundary

Static source inspection only. This report does not assert a rendered/browser result, successful service response, authorization outcome, or database effect. No backend mapping is asserted here unless independently source-mapped elsewhere.
