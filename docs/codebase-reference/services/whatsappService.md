# whatsappService.js

**Source:** `frontend/src/services/whatsappService.js`  
**Classification:** Service module

## Source-grounded summary

**Purpose:** whatsappService is the service-layer module identified by its source path. API paths and methods are listed only when their literals/options occur in this module; delegated client behavior is called out separately.

## API surface

- API endpoint path literals: /api/admin/whatsapp/settings, /api/admin/whatsapp/test
- Explicit HTTP methods: PUT, POST
- API client/import boundary: apiFetch -> services/api.js

## Declarations and dependencies

- Exports: getWhatsAppConfig, saveWhatsAppSettings, sendWhatsAppTest, retryWhatsAppNotification
- Named function-like declarations: getWhatsAppConfig, saveWhatsAppSettings, sendWhatsAppTest, retryWhatsAppNotification
- Direct local imports: apiFetch -> services/api.js
- Direct static consumers (impact): pages/admin/AdminWhatsAppPage.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: settings, getWhatsAppConfig, URLSearchParams, apiFetch, toString, Error, json, saveWhatsAppSettings, stringify, sendWhatsAppTest, retryWhatsAppNotification, encodeURIComponent
- Error/control-flow markers: throw
- Browser storage / network / navigation markers: network call
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../functions-methods/frontend/services/whatsappService.js/_index.md) for one report per statically identified named declaration in this source file.
