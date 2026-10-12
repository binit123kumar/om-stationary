# PartnerInventoryPage

## Route and source identity

- Classification: active route-level page module dispatched by RouteView.
- Source: [frontend/src/pages/partner/PartnerInventoryPage.jsx](../../../frontend/src/pages/partner/PartnerInventoryPage.jsx)
- Route key(s): **partner-inventory**
- Route declarations and guards: **/partner/inventory** (PartnerShop)
- Registration: [frontend/src/App.jsx](../../../frontend/src/App.jsx); dispatch: [frontend/src/RouteView.jsx](../../../frontend/src/RouteView.jsx).
- Named exports detected: PartnerInventoryPage.
- RouteView dispatch branch: case 'partner-inventory': return <PartnerInventoryPage />;.

## Imported project modules

### components

- [PartnerInventoryForm](../components/partner/PartnerInventoryForm.md) — source frontend/src/components/partner/PartnerInventoryForm.jsx.

### services

- No imports from this source area detected.

### hooks

- [usePartner](../hooks/usePartner.md) — source frontend/src/hooks/usePartner.js.

### utils

- No imports from this source area detected.

## Source observations

- Hook-call identifiers lexically invoked here: usePartner.
- Imported service functions whose names also appear as calls: none detected.
- Literal /api/ strings present in this module: none found. Service-mediated HTTP call expressions are documented in their service reports.

## Verification boundary

Static source inspection only. This report does not assert a rendered/browser result, successful service response, authorization outcome, or database effect. No backend mapping is asserted here unless independently source-mapped elsewhere.
