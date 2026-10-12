# AdminWhatsAppPage

## Route and source identity

- Classification: active route-level page module dispatched by RouteView.
- Source: [frontend/src/pages/admin/AdminWhatsAppPage.jsx](../../../frontend/src/pages/admin/AdminWhatsAppPage.jsx)
- Route key(s): **admin-whatsapp**
- Route declarations and guards: **/admin/whatsapp** (Admin)
- Registration: [frontend/src/App.jsx](../../../frontend/src/App.jsx); dispatch: [frontend/src/RouteView.jsx](../../../frontend/src/RouteView.jsx).
- Named exports detected: AdminWhatsAppPage.
- RouteView dispatch branch: case 'admin-whatsapp': return <AdminWhatsAppPage {...adminProps} />;.

## Imported project modules

### components

- [AdminLayout](../components/admin/AdminLayout.md) — source frontend/src/components/admin/AdminLayout.jsx.
- [WhatsAppSettingsForm](../components/whatsapp/WhatsAppSettingsForm.md) — source frontend/src/components/whatsapp/WhatsAppSettingsForm.jsx.
- [WhatsAppLogsTable](../components/whatsapp/WhatsAppLogsTable.md) — source frontend/src/components/whatsapp/WhatsAppLogsTable.jsx.
- [WhatsAppTestButton](../components/whatsapp/WhatsAppTestButton.md) — source frontend/src/components/whatsapp/WhatsAppTestButton.jsx.

### services

- [getWhatsAppConfig, saveWhatsAppSettings, sendWhatsAppTest, retryWhatsAppNotification](../services/whatsappService.md) — source frontend/src/services/whatsappService.js.
- [adminHeaders](../services/adminService.md) — source frontend/src/services/adminService.js.
- [readSession](../services/session.md) — source frontend/src/services/session.js.

### hooks

- No imports from this source area detected.

### utils

- No imports from this source area detected.

## Source observations

- Hook-call identifiers lexically invoked here: useState, useEffect.
- Imported service functions whose names also appear as calls: [getWhatsAppConfig](../services/whatsappService.md), [saveWhatsAppSettings](../services/whatsappService.md), [sendWhatsAppTest](../services/whatsappService.md), [retryWhatsAppNotification](../services/whatsappService.md), [adminHeaders](../services/adminService.md), [readSession](../services/session.md).
- Literal /api/ strings present in this module: none found. Service-mediated HTTP call expressions are documented in their service reports.

## Verification boundary

Static source inspection only. This report does not assert a rendered/browser result, successful service response, authorization outcome, or database effect. No backend mapping is asserted here unless independently source-mapped elsewhere.
