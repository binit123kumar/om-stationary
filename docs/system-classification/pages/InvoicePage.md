# InvoicePage

## Route and source identity

- Classification: active route-level page module dispatched by RouteView.
- Source: [frontend/src/pages/customer/InvoicePage.jsx](../../../frontend/src/pages/customer/InvoicePage.jsx)
- Route key(s): **invoice**
- Route declarations and guards: **/invoice/:id** (Public (no ProtectedRoute wrapper in declaration))
- Registration: [frontend/src/App.jsx](../../../frontend/src/App.jsx); dispatch: [frontend/src/RouteView.jsx](../../../frontend/src/RouteView.jsx).
- Named exports detected: InvoicePage.
- RouteView dispatch branch: case 'invoice': return <InvoicePage />;.

## Imported project modules

### components

- [InvoiceActions](../components/invoice/InvoiceActions.md) — source frontend/src/components/invoice/InvoiceActions.jsx.
- [InvoiceBusinessInfo](../components/invoice/InvoiceBusinessInfo.md) — source frontend/src/components/invoice/InvoiceBusinessInfo.jsx.
- [InvoiceCustomerInfo](../components/invoice/InvoiceCustomerInfo.md) — source frontend/src/components/invoice/InvoiceCustomerInfo.jsx.
- [InvoiceFooter](../components/invoice/InvoiceFooter.md) — source frontend/src/components/invoice/InvoiceFooter.jsx.
- [InvoiceHeader](../components/invoice/InvoiceHeader.md) — source frontend/src/components/invoice/InvoiceHeader.jsx.
- [InvoiceItemsTable](../components/invoice/InvoiceItemsTable.md) — source frontend/src/components/invoice/InvoiceItemsTable.jsx.
- [InvoiceTotals](../components/invoice/InvoiceTotals.md) — source frontend/src/components/invoice/InvoiceTotals.jsx.

### services

- [downloadInvoicePdf, getInvoice](../services/invoiceService.md) — source frontend/src/services/invoiceService.js.

### hooks

- No imports from this source area detected.

### utils

- paymentLabel — source frontend/src/utils/formatOrderStatus.js.
- readTrackingToken — source frontend/src/utils/storage.js.

## Source observations

- Hook-call identifiers lexically invoked here: useParams, useState, useEffect, useMemo.
- Imported service functions whose names also appear as calls: [downloadInvoicePdf](../services/invoiceService.md), [getInvoice](../services/invoiceService.md).
- Literal /api/ strings present in this module: none found. Service-mediated HTTP call expressions are documented in their service reports.

## Verification boundary

Static source inspection only. This report does not assert a rendered/browser result, successful service response, authorization outcome, or database effect. No backend mapping is asserted here unless independently source-mapped elsewhere.
