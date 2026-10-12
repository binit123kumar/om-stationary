# PartnerProductsPage

## Route and source identity

- Classification: active route-level page module dispatched by RouteView.
- Source: [frontend/src/pages/partner/PartnerProductsPage.jsx](../../../frontend/src/pages/partner/PartnerProductsPage.jsx)
- Route key(s): **partner-products**
- Route declarations and guards: **/partner/products** (PartnerShop)
- Registration: [frontend/src/App.jsx](../../../frontend/src/App.jsx); dispatch: [frontend/src/RouteView.jsx](../../../frontend/src/RouteView.jsx).
- Named exports detected: PartnerProductsPage.
- RouteView dispatch branch: case 'partner-products': return <PartnerProductsPage />;.

## Imported project modules

### components

- No imports from this source area detected.

### services

- No imports from this source area detected.

### hooks

- [usePartner](../hooks/usePartner.md) — source frontend/src/hooks/usePartner.js.

### utils

- rupeesShort — source frontend/src/utils/formatCurrency.js.

## Source observations

- Hook-call identifiers lexically invoked here: usePartner.
- Imported service functions whose names also appear as calls: none detected.
- Literal /api/ strings present in this module: none found. Service-mediated HTTP call expressions are documented in their service reports.

## Verification boundary

Static source inspection only. This report does not assert a rendered/browser result, successful service response, authorization outcome, or database effect. No backend mapping is asserted here unless independently source-mapped elsewhere.
