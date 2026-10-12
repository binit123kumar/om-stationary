# Service worker activate event

- **ID:** `frontend:public/service-worker.js:activate`
- **Source:** `frontend/public/service-worker.js`, `activate` listener.
- **Identity:** Service-worker lifecycle event callback.
- **Inputs:** `ExtendableEvent`.
- **Purpose (simple Hinglish):** Naye worker ke activate hote waqt purane OM Stationary shell caches hata kar clients ko control karta hai.
- **Execution:** Reads cache keys; deletes keys with `om-stationary-shell-` prefix except current cache; then calls `clients.claim()`.
- **Output:** No direct return; completion is attached to `waitUntil`.
- **Dependencies:** Cache Storage, `CACHE_PREFIX`, `CACHE_NAME`, service-worker clients.
- **Side effects:** Deletes only previous caches in the appâ€™s own prefix and claims open pages.
- **Failure/security:** Prefix check prevents deleting unrelated origin cache names.
- **Call relationship:** Browser calls it after successful installation and activation.
- **Maintenance/tests:** Keep cache namespace unique to this application; local worker activation was browser-verified.
