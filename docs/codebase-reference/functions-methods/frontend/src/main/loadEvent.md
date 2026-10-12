# Production service-worker load callback

- **ID:** `frontend:src/main.jsx:window.load`
- **Source:** `frontend/src/main.jsx`, callback passed to `window.addEventListener('load', ...)`.
- **Identity:** Anonymous browser load event callback.
- **Inputs:** Browser load event is ignored by the callback.
- **Purpose (simple Hinglish):** Production page load ke baad service worker register karta hai.
- **Execution:** Runs only when `import.meta.env.PROD` and `navigator.serviceWorker` are supported; after window load calls `register('/service-worker.js')`.
- **Output:** Registration Promise is not returned to React; registration begins after load.
- **Dependencies:** Browser service-worker API and `/service-worker.js`.
- **Side effects:** Registers a same-origin worker controlling the app scope.
- **Failure/security:** Unsupported browsers skip registration; rejected registration is passed to the separate catch logger.
- **Call relationship:** Module evaluation in `main.jsx` attaches the callback.
- **Tests:** Browser registration was verified in the production preview; no unit test exists.
