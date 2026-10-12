# Service worker install event

- **ID:** `frontend:public/service-worker.js:install`
- **Source:** `frontend/public/service-worker.js`, `install` listener.
- **Identity:** Service-worker lifecycle event callback.
- **Inputs:** `ExtendableEvent`.
- **Purpose (simple Hinglish):** App shell resources ko initial install par cache karta hai aur phir worker activation ko immediately allow karta hai.
- **Execution:** Opens versioned `CACHE_NAME`; calls `cache.addAll(APP_SHELL)`; then `self.skipWaiting()`.
- **Output:** No direct return; event lifetime is extended with `waitUntil`.
- **Dependencies:** Cache Storage, `APP_SHELL`, `CACHE_NAME`.
- **Side effects:** Writes only the explicitly listed same-origin shell files to the namespaced cache; may skip waiting.
- **Failure/security:** `addAll` rejection rejects installation; no API or user data is included.
- **Call relationship:** Browser invokes this on worker install; activation handler follows.
- **Maintenance/tests:** Update shell list/cache version when resources change; browser install/lifecycle checked in local preview, unit test not configured.
