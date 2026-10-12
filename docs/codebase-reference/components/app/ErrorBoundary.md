# AppErrorBoundary

- **Source:** [`frontend/src/ErrorBoundary.jsx`](../../../../frontend/src/ErrorBoundary.jsx)
- **Kind:** React class component and error boundary.
- **Purpose:** Catches render/lifecycle errors in descendant route UI and shows a recovery screen instead of leaving a blank app.
- **User experience:** Presents an error title, states that the cart remains saved locally, and offers a Refresh page button. Development builds additionally render the captured error name/message.
- **Props/state:** Receives `children`; state is `{ failed, error }`.
- **Methods:** `constructor` initializes state; `getDerivedStateFromError` transitions to the fallback; `componentDidCatch` logs; `render` chooses children or fallback.
- **Side effects/dependencies:** Logs caught errors with `console.error`; refresh control reloads the current page.
- **Styles/responsive behavior:** Uses existing `app-error`, `panel`, and `btn` style selectors.
- **Failure/security:** The raw error message is displayed only when `import.meta.env.DEV`; production omits it. It handles React descendant errors, not arbitrary async errors or event-handler exceptions.
- **Callers:** Wraps `<Routes>` in `App.jsx`.
- **Change safely:** Update fallback copy/markup here and related `.app-error` styles. Keep diagnostic detail development-only.
- **Tests:** No frontend unit tests configured; not independently tested with an injected render failure.
- **Method reports:** [constructor](../../functions-methods/frontend/src/ErrorBoundary/constructor.md), [getDerivedStateFromError](../../functions-methods/frontend/src/ErrorBoundary/getDerivedStateFromError.md), [componentDidCatch](../../functions-methods/frontend/src/ErrorBoundary/componentDidCatch.md), [render](../../functions-methods/frontend/src/ErrorBoundary/render.md).
