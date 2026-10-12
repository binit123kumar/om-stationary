# AppErrorBoundary.componentDidCatch

- **ID:** `frontend:src/ErrorBoundary.jsx:AppErrorBoundary.componentDidCatch`
- **Identity:** React class lifecycle method.
- **Inputs:** Caught `error`; React may also pass error info, which this method does not consume.
- **Purpose (simple Hinglish):** Captured render error ko browser console mein log karta hai.
- **Execution:** Calls `console.error` with an OM Stationary prefix and the error object.
- **Output:** No return value.
- **Dependencies/callees:** Browser console.
- **Side effects:** Emits diagnostic log.
- **Call relationship:** React calls it after `getDerivedStateFromError` for a descendant error.
- **Failure/security:** No remote logging; logged data remains in local developer console. Avoid adding sensitive data.
- **Maintenance:** Add telemetry only through an approved privacy-aware logging path.
- **Tests:** No explicit test found.
