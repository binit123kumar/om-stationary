# AppErrorBoundary.constructor

- **ID:** `frontend:src/ErrorBoundary.jsx:AppErrorBoundary.constructor`
- **Identity:** Constructor of React class `AppErrorBoundary`.
- **Inputs:** React `props`, forwarded to `super(props)`.
- **Purpose (simple Hinglish):** Boundary ki initial state set karta hai taa ki normal render par child UI dikh sake.
- **Execution:** Calls parent constructor; initializes `failed` false and `error` null.
- **Output:** No explicit return; instance state initialized.
- **Dependencies/callees:** React.Component constructor.
- **Side effects:** None.
- **Call relationship:** React invokes on `AppErrorBoundary` instance creation.
- **Failure/security:** No validation needed for React props here.
- **Maintenance:** If fallback state shape changes, update `getDerivedStateFromError` and `render` together.
- **Tests:** No dedicated frontend test.
