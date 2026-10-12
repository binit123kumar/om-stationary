# InvoicePage.jsx

**Source:** `frontend/src/pages/customer/InvoicePage.jsx`  
**Classification:** Routed page source
**Route classification:** /invoice/:id
**Shared shell:** App.jsx nests declared routes beneath AppShell and AppErrorBoundary; AppShell renders Header, main/Outlet, FooterMap, and PwaExperience.

## Source-grounded summary

**Purpose:** InvoicePage is the routed page component identified by its source declaration and route mapping above. Directly composed UI and imports are recorded below; no behavior is inferred beyond source.

## UI and composition

- JSX component tags: Receipt, Link, InvoiceActions, AlertTriangle, InvoiceHeader, InvoiceBusinessInfo, InvoiceCustomerInfo, InvoiceItemsTable, InvoiceTotals, InvoiceFooter
- JSX text-region fragments (lexical; may include expressions): `Preparing your invoice…`; `Invoice unavailable`; `{error}`; `Go to orders`; `Continue shopping`; `{downloadError}`; `Invoice Number`; `{invoice.invoiceNumber}`; `Invoice Date`; `{new Date(invoice.invoiceDate).toLocaleDateString('en-IN')}`

## Declarations and dependencies

- Exports: InvoicePage
- Named function-like declarations: InvoicePage, downloadPdf
- Direct local imports: downloadInvoicePdf, getInvoice -> services/invoiceService.js; InvoiceActions -> components/invoice/InvoiceActions.jsx; InvoiceBusinessInfo -> components/invoice/InvoiceBusinessInfo.jsx; InvoiceCustomerInfo -> components/invoice/InvoiceCustomerInfo.jsx; InvoiceFooter -> components/invoice/InvoiceFooter.jsx; InvoiceHeader -> components/invoice/InvoiceHeader.jsx; InvoiceItemsTable -> components/invoice/InvoiceItemsTable.jsx; InvoiceTotals -> components/invoice/InvoiceTotals.jsx; paymentLabel -> utils/formatOrderStatus.js; readTrackingToken -> utils/storage.js
- Direct static consumers (impact): RouteView.jsx

## Props, hooks, and API usage

- First named function-like declaration parameters: (none declared)
- React hooks/state APIs: useParams, useState, useEffect, useMemo
- State bindings found in useState/useReducer pair destructuring: invoice, setInvoice, error, setError, loading, setLoading, downloading, setDownloading, downloadError, setDownloadError
- API path literals in this file: None; calls may be delegated to imported hooks/services.
- Direct imports that can carry data/API behavior: downloadInvoicePdf, getInvoice -> services/invoiceService.js

## Behavior, errors, security, and maintenance

- Statically observed calls: InvoicePage, useParams, useState, useEffect, setLoading, setError, getInvoice, readTrackingToken, then, async, Error, json, setInvoice, finally, useMemo, String, toLowerCase, setDownloading, setDownloadError, downloadInvoicePdf, blob, createObjectURL, createElement, replace
- Error/control-flow markers: try/catch, throw, finally
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/pages/customer/InvoicePage.jsx/_index.md) for one report per statically identified named declaration in this source file.
