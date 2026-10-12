# Callback index: public/service-worker.js

**Source:** `frontend/public/service-worker.js`  
**Named declarations identified:** 0

## Separately reported anonymous callbacks

- [`install event callback`](../service-worker/install.md): pre-caches the declared app shell and activates the worker.
- [`activate event callback`](../service-worker/activate.md): removes older caches with the app-specific prefix and claims clients.
- [`message event callback`](../service-worker/message.md): handles the `SKIP_WAITING` message.
- [`fetch event callback`](../service-worker/fetch.md): applies same-origin GET navigation and static asset caching rules while bypassing API requests.

The callbacks only implement the documented app-shell/static-resource behavior. API, authentication, payment and private responses are excluded from service-worker caching. Runtime behavior is not inferred beyond separately recorded browser verification.
