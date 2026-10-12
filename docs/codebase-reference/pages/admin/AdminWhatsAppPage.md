# AdminWhatsAppPage.jsx

**Source:** `frontend/src/pages/admin/AdminWhatsAppPage.jsx`  
**Classification:** Routed page source
**Route classification:** /admin/whatsapp (ProtectedRoute role: Admin)
**Shared shell:** App.jsx nests declared routes beneath AppShell and AppErrorBoundary; AppShell renders Header, main/Outlet, FooterMap, and PwaExperience.

## Source-grounded summary

**Purpose:** AdminWhatsAppPage is the routed page component identified by its source declaration and route mapping above. Directly composed UI and imports are recorded below; no behavior is inferred beyond source.

## UI and composition

- JSX component tags: AdminLayout, WhatsAppSettingsForm, WhatsAppTestButton, WhatsAppLogsTable
- JSX text-region fragments (lexical; may include expressions): `ADMIN PANEL`; `WhatsApp`; `Manage server-configured notifications and inspect delivery attempts.`; `{error&&`; `{error}`; `{config&&`

## Declarations and dependencies

- Exports: AdminWhatsAppPage
- Named function-like declarations: AdminWhatsAppPage, load, patch, test, retry
- Direct local imports: AdminLayout -> components/admin/AdminLayout.jsx; WhatsAppSettingsForm -> components/whatsapp/WhatsAppSettingsForm.jsx; WhatsAppLogsTable -> components/whatsapp/WhatsAppLogsTable.jsx; WhatsAppTestButton -> components/whatsapp/WhatsAppTestButton.jsx; getWhatsAppConfig, saveWhatsAppSettings, sendWhatsAppTest, retryWhatsAppNotification -> services/whatsappService.js; adminHeaders -> services/adminService.js; readSession -> services/session.js
- Direct static consumers (impact): RouteView.jsx

## Props, hooks, and API usage

- First named function-like declaration parameters: {user,onLogout}
- React hooks/state APIs: useState, useEffect
- State bindings found in useState/useReducer pair destructuring: config, setConfig, error, setError, busy, setBusy
- API path literals in this file: None; calls may be delegated to imported hooks/services.
- Direct imports that can carry data/API behavior: getWhatsAppConfig, saveWhatsAppSettings, sendWhatsAppTest, retryWhatsAppNotification -> services/whatsappService.js; adminHeaders -> services/adminService.js; readSession -> services/session.js

## Behavior, errors, security, and maintenance

- Statically observed calls: AdminWhatsAppPage, useState, adminHeaders, readSession, getWhatsAppConfig, then, setError, useEffect, load, setBusy, saveWhatsAppSettings, async, sendWhatsAppTest, Error, json, retryWhatsAppNotification, patch
- Error/control-flow markers: try/catch, throw, finally
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/pages/admin/AdminWhatsAppPage.jsx/_index.md) for one report per statically identified named declaration in this source file.
