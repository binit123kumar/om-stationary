# AppErrorBoundary.getDerivedStateFromError

- **ID:** `frontend:src/ErrorBoundary.jsx:AppErrorBoundary.getDerivedStateFromError`
- **Identity:** Static React error-boundary lifecycle method.
- **Inputs:** Caught `error` from descendant render/lifecycle.
- **Purpose (simple Hinglish):** Render error aane par boundary ko failed state mein le jaata hai.
- **Execution:** Returns `{ failed: true, error }`; React merges this into state before rendering fallback.
- **Output:** Partial state object.
- **Dependencies/callees:** React error-boundary lifecycle.
- **Side effects:** State transition managed by React.
- **Call relationship:** Invoked by React after a descendant error; `render` consumes the resulting state.
- **Failure/security:** Captured error detail is shown only in development by `render`.
- **Maintenance:** Keep returned key names aligned with constructor and fallback rendering.
- **Tests:** No injected-error test found.
