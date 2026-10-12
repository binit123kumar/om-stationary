# invoiceService service

## Source identity

- Source: [frontend/src/services/invoiceService.js](../../../frontend/src/services/invoiceService.js)
- Classification: frontend service module under frontend/src/services.
- Exported declarations detected: getInvoice, downloadInvoicePdf.
- Important function exports, signatures, and adjacent source comments:
- **getInvoice(orderNumber, trackingToken = '')** — No directly preceding source comment.
- **downloadInvoicePdf(orderNumber, trackingToken = '')** — No directly preceding source comment.

## HTTP call expressions detected
- GET/DEFAULT via apiFetch; path expression: /api/orders/${encodeURIComponent(orderNumber)}/invoice.
- GET/DEFAULT via apiFetch; path expression: /api/orders/${encodeURIComponent(orderNumber)}/invoice/pdf.

## Local dependencies

- apiFetch from frontend/src/services/api.js.

## Backend mapping and runtime status

The listed expressions are frontend source call sites; method labels use a static scan of the nearby options object and otherwise say GET/default. They are not observed network traffic. No backend route/action mapping is asserted in this report, and response behavior or availability is not runtime-verified.
