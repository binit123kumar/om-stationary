# Responsive and PWA QA

## Responsive browser checks

| Result | Page coverage | Viewports | Method and evidence |
| --- | --- | --- | --- |
| PASS | Home, search/listing, product detail, cart, login, registration, checkout, payment, tracking, invoice, account and admin entry | 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920 CSS px | Production Vite preview in Chromium automation. 108 route/viewport navigations completed; document width was not greater than viewport width in any result. |
| PASS | Responsive app shell and navigation | Same viewport set | Confirmed page title/root content rendered. No responsive overflow reported. |
| PASS | Unauthenticated admin access | All nine viewports via `/admin` route check | Protected route redirected to `/login?return=%2Fadmin`; authenticated Admin dashboard layout was not exercised because no admin session was available. |
| PASS | Small-screen pickup footer | 768 CSS px | Initial test detected the pickup station extending to 799 px. Added a tablet single-column footer layout and repeated checks with no overflow. |
| NOT TESTED | iPhone/iPad Safari and Android physical devices | Physical devices | No hardware was available; Chromium viewport checks are not physical-device evidence. |
| NOT TESTED | Keyboard-only end-to-end coverage for all customer/admin flows | N/A | Focus-visible styles and PWA dialog keyboard handling are present, but full keyboard flow testing was not performed. |

## Responsive implementation

- Added `frontend/src/responsive.css`, imported by `frontend/src/main.jsx`.
- Kept the existing single React application, shared page layouts and OM Stationary blue/orange branding.
- Added narrow viewport sizing, wrapping, minimum-width safeguards, touch-sized controls, focus-visible outlines, safe-area padding, product/cart/checkout/admin chart adjustments, horizontally scrollable admin tables, and tablet footer layout.
- No separate mobile or desktop application was introduced.

## PWA implementation

| Requirement | Result | Evidence |
| --- | --- | --- |
| Manifest | PASS | `frontend/public/manifest.webmanifest`; browser fetched valid JSON with app name/short name `OM Stationary`, theme `#103f76`, background `#f7f9fc`, standalone display |
| App icons | PASS | `frontend/public/icons/om-stationary-180.png`, `om-stationary-192.png`, `om-stationary-512.png`; all were served successfully by the production preview |
| iOS metadata/icon | PASS | `frontend/index.html` links manifest, app title/status metadata and the 180px Apple touch icon |
| Service worker | PASS | `frontend/public/service-worker.js`; browser registration activated and controlled the production preview |
| Safe static caching | PASS | Worker caches the app shell and same-origin `/assets/` build resources only. `/api/` requests, non-GET requests and cross-origin requests are excluded. |
| Update strategy | PASS | New worker waits for user confirmation in `PwaExperience`; activation removes prior `om-stationary-shell-*` caches, then the client reloads on controller change. |
| Offline shell | PASS | With browser network emulation disabled, `/search` loaded the cached application shell. Server-dependent catalogue/API requests failed as expected; the offline page explicitly says ordering and payment are unavailable offline. |
| Install UI | PARTIAL | Chromium `beforeinstallprompt` and `appinstalled` handling is implemented. iOS Safari receives manual Add to Home Screen instructions. Actual browser installability criteria/prompt and installation were not independently verified. |
| Physical install verification | NOT TESTED | No physical iPhone, Android or Windows device/browser installation test was performed. |

## Installation instructions

- **iPhone/iPad:** Open the HTTPS site in Safari, tap **Share**, then choose **Add to Home Screen**. Other iOS browsers may not expose the same flow.
- **Android:** Open the HTTPS site in a supported browser such as Chrome; use the displayed **Install** prompt or browser menu **Install app** / **Add to Home screen**.
- **Windows:** Open the HTTPS site in a supported desktop browser such as Edge or Chrome; select the install icon in the address bar or browser menu **Install app**.
- Browser install options only appear when browser requirements are met. The app needs a connection for orders, account data, stock, payment and other server-backed features.

## Network and API observation

The production preview was tested without the local API running. The browser reported `ERR_CONNECTION_REFUSED` for `http://localhost:5000/api/categories`. This is a blocked live API check, not an application build failure. The service worker did not cache API responses and did not convert this failure into a successful API response.

## PWA limitations and maintenance

- The custom service-worker cache key is versioned in `frontend/public/service-worker.js`. Increment `CACHE_NAME` when changing cache behavior or shell strategy.
- The production host must serve the app over HTTPS (except localhost) and correctly serve `manifest.webmanifest` and `service-worker.js` at the application root.
- The app shell can open offline, but no customer data, authentication, checkout/payment requests, order updates, inventory operations or notification delivery are supported offline.
- Browser installability can vary by browser policy and user settings. Physical install and update behavior remain unverified.
