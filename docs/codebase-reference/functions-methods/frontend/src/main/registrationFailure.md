# Service-worker registration failure callback

- **ID:** `frontend:src/main.jsx:serviceWorkerRegistrationFailure`
- **Source:** `frontend/src/main.jsx`, catch callback on `navigator.serviceWorker.register(...)`.
- **Identity:** Anonymous Promise rejection callback, given a stable documentation ID.
- **Inputs:** Registration error object.
- **Purpose (simple Hinglish):** Registration fail ho to error ko console mein clearly log karta hai.
- **Execution:** Receives the rejection and calls `console.error` with a user-facing prefix and error value.
- **Output:** No explicit return; the handler resolves the catch chain without retrying.
- **Dependencies:** Browser console.
- **Side effects:** Diagnostic log only; app rendering continues.
- **Call relationship:** Invoked when worker registration rejects from the window-load callback.
- **Failure/security:** Does not disclose or transmit the error remotely.
- **Tests:** Failure path not simulated.
