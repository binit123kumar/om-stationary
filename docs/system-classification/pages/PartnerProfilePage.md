# PartnerProfilePage

## Route and source identity

- Classification: active route-level page module dispatched by RouteView.
- Source: [frontend/src/pages/partner/PartnerProfilePage.jsx](../../../frontend/src/pages/partner/PartnerProfilePage.jsx)
- Route key(s): **partner-profile**
- Route declarations and guards: **/partner/profile** (PartnerShop)
- Registration: [frontend/src/App.jsx](../../../frontend/src/App.jsx); dispatch: [frontend/src/RouteView.jsx](../../../frontend/src/RouteView.jsx).
- Named exports detected: PartnerProfilePage.
- RouteView dispatch branch: case 'partner-profile': return <PartnerProfilePage />;.

## Imported project modules

### components

- No imports from this source area detected.

### services

- [updatePartnerShop](../services/partnerService.md) — source frontend/src/services/partnerService.js.

### hooks

- [usePartner](../hooks/usePartner.md) — source frontend/src/hooks/usePartner.js.

### utils

- No imports from this source area detected.

## Source observations

- Hook-call identifiers lexically invoked here: usePartner, useState.
- Imported service functions whose names also appear as calls: [updatePartnerShop](../services/partnerService.md).
- Literal /api/ strings present in this module: none found. Service-mediated HTTP call expressions are documented in their service reports.

## Verification boundary

Static source inspection only. This report does not assert a rendered/browser result, successful service response, authorization outcome, or database effect. No backend mapping is asserted here unless independently source-mapped elsewhere.
