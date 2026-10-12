# AppErrorBoundary.render

- **ID:** `frontend:src/ErrorBoundary.jsx:AppErrorBoundary.render`
- **Identity:** React class render method.
- **Inputs:** Instance state and `props.children`.
- **Purpose (simple Hinglish):** Error nahi ho to app children dikhata hai; error ho to refresh wala recovery panel dikhata hai.
- **Execution:** Returns children when `failed` is false. Otherwise creates fallback main/panel with recovery text, a development-only error `<pre>`, and a refresh button that calls `window.location.reload()`.
- **Output:** React element tree.
- **Dependencies/callees:** `window.location.reload`; CSS selectors `app-error`, `panel`, `btn`.
- **Side effects:** Refresh click reloads the current document.
- **Call relationship:** React renders this method as the error boundary.
- **Failure/security:** Error name/message is gated to `import.meta.env.DEV`; production does not expose it in the rendered fallback.
- **Maintenance:** Keep diagnostic details development-only and preserve keyboard-operable button semantics.
- **Tests:** No boundary-failure UI test found.
