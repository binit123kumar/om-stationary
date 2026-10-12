# App

- **ID:** `frontend:src/App.jsx:App`
- **Identity:** JavaScript React component function in `frontend/src/App.jsx`.
- **Inputs:** No parameters.
- **Purpose (simple Hinglish):** App ka root router banata hai. Har URL ko shared layout, optional role guard, aur sahi page key se connect karta hai.
- **Execution:** Returns `BrowserRouter`; wraps routes in `AppErrorBoundary`; defines `AppShell` parent route; registers page routes; role-protects admin/partner/delivery route groups; sends unmatched paths to the home view.
- **Output:** React element tree.
- **Dependencies/callees:** `AppErrorBoundary`, `AppShell`, `ProtectedRoute`, `RouteView`, React Router.
- **Side effects:** None apparent.
- **Call relationship:** `main.jsx` renders `App`; route components invoke `RouteView` for matching paths.
- **Failure/security:** Frontend role guards are navigation controls, not a substitute for backend authorization. Unknown routes fall back to home.
- **Maintenance:** Change paths/roles in `App.jsx`; keep `RouteView` page keys synchronized and confirm corresponding backend `[Authorize]` policy.
- **Tests:** Browser production-preview route checks passed for core routes; no frontend test script is configured.
