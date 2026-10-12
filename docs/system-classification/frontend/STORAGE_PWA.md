# Storage and PWA classification

## Storage source

- [frontend/src/utils/storage.js](../../../frontend/src/utils/storage.js): JSON/localStorage helpers for cart, wishlist, recent products/orders and tracking tokens.
- [frontend/src/utils/constants.js](../../../frontend/src/utils/constants.js): storage constants/key names.
- [frontend/src/services/session.js](../../../frontend/src/services/session.js): session access/refresh source; see [session service report](../services/session.md).
- [frontend/src/components/layout/AppShell.jsx](../../../frontend/src/components/layout/AppShell.jsx): shared application state and direct local/session storage access.

## PWA/app entry files

- [frontend/src/main.jsx](../../../frontend/src/main.jsx)
- [frontend/src/components/layout/PwaExperience.jsx](../../../frontend/src/components/layout/PwaExperience.jsx)
- [frontend/public/service-worker.js](../../../frontend/public/service-worker.js)
- [frontend/public/manifest.webmanifest](../../../frontend/public/manifest.webmanifest)
- [frontend/public/offline.html](../../../frontend/public/offline.html)
- [frontend/index.html](../../../frontend/index.html)

Static evidence in main.jsx: worker registration is gated by PROD and navigator.serviceWorker, starts on window load, and logs a rejected registration. No runtime registration, cache/offline behavior, install/update prompt, or browser compatibility was tested here.
