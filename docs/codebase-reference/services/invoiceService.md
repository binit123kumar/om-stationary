# invoiceService.js

**Source:** `frontend/src/services/invoiceService.js`  
**Classification:** Service module

## Source-grounded summary

**Purpose:** invoiceService is the service-layer module identified by its source path. API paths and methods are listed only when their literals/options occur in this module; delegated client behavior is called out separately.

## API surface

- API endpoint path literals: No literal /api path in this file.
- Explicit HTTP methods: No method option literal detected; inspect listed exports for default GET or indirect behavior.
- API client/import boundary: apiFetch -> services/api.js

## Declarations and dependencies

- Exports: getInvoice, downloadInvoicePdf
- Named function-like declarations: getInvoice, downloadInvoicePdf
- Direct local imports: apiFetch -> services/api.js
- Direct static consumers (impact): pages/customer/InvoicePage.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: getInvoice, apiFetch, encodeURIComponent, downloadInvoicePdf
- Error/control-flow markers: No explicit try/throw/finally token found.
- Browser storage / network / navigation markers: network call
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../functions-methods/frontend/services/invoiceService.js/_index.md) for one report per statically identified named declaration in this source file.
