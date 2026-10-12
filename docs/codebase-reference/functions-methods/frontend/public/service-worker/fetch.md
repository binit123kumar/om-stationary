# Service worker fetch event

- **ID:** `frontend:public/service-worker.js:fetch`
- **Source:** `frontend/public/service-worker.js`, `fetch` listener.
- **Identity:** Service-worker request interception callback.
- **Inputs:** `FetchEvent` and its `Request`.
- **Purpose (simple Hinglish):** Sirf app shell navigation aur same-origin build assets ke offline behavior ko manage karta hai.
- **Execution:** Ignores non-GET and cross-origin requests; ignores `/api/`; for navigation tries network then cached index/offline fallback; for `/assets/` serves a cached immutable build resource or fetches and caches a successful basic response.
- **Output:** Uses `respondWith` for handled requests; unrelated requests use browser default network behavior.
- **Dependencies:** Fetch API, Cache Storage, `APP_SHELL` cache data, `CACHE_NAME`.
- **Side effects:** Reads/writes only app shell/static asset caches. Does not cache API responses, auth, payment or write operations.
- **Call relationship:** Browser dispatches for page requests; API exclusions deliberately bypass it.
- **Failure/security:** A navigation may show cached app shell on network failure, but its API calls still fail normally. Asset cache put is attached to `waitUntil`.
- **Maintenance/tests:** Review cache policy before adding paths; do not cache private/API responses. Local offline navigation passed; detailed branch/unit tests are not configured.
