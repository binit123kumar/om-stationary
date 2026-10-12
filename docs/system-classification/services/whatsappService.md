# whatsappService service

## Source identity

- Source: [frontend/src/services/whatsappService.js](../../../frontend/src/services/whatsappService.js)
- Classification: frontend service module under frontend/src/services.
- Exported declarations detected: getWhatsAppConfig, saveWhatsAppSettings, sendWhatsAppTest, retryWhatsAppNotification.
- Important function exports, signatures, and adjacent source comments:
- **getWhatsAppConfig(headers, params = {})** — No directly preceding source comment.
- **saveWhatsAppSettings(patch, headers)** — No directly preceding source comment.
- **sendWhatsAppTest(headers)** — No directly preceding source comment.
- **retryWhatsAppNotification(id, headers)** — No directly preceding source comment.

## HTTP call expressions detected
- GET/DEFAULT via apiFetch; path expression: /api/admin/whatsapp?${query.toString()}.
- PUT via apiFetch; path expression: /api/admin/whatsapp/settings.
- POST via apiFetch; path expression: /api/admin/whatsapp/test.
- POST via apiFetch; path expression: /api/admin/whatsapp/${encodeURIComponent(id)}/retry.

## Local dependencies

- apiFetch from frontend/src/services/api.js.

## Backend mapping and runtime status

The listed expressions are frontend source call sites; method labels use a static scan of the nearby options object and otherwise say GET/default. They are not observed network traffic. No backend route/action mapping is asserted in this report, and response behavior or availability is not runtime-verified.
