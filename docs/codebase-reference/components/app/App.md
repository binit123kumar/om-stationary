# App

- **Source:** [`frontend/src/App.jsx`](../../../../frontend/src/App.jsx)
- **Kind:** React function component; also the root route registry.
- **Purpose:** Builds the `BrowserRouter` tree and places all customer, admin, partner and delivery routes inside the shared `AppShell`.
- **User experience:** Selects the route-level view for a URL. Unmatched paths currently resolve to the home view. An `AppErrorBoundary` wraps the route tree.
- **Inputs/state:** No props or local state.
- **Dependencies:** `BrowserRouter`, `Routes`, `Route`, `AppErrorBoundary`, `AppShell`, `ProtectedRoute`, `RouteView`.
- **Route guard behavior:** Admin routes require role `Admin`; partner routes require `PartnerShop`; delivery routes require `DeliveryPartner`. Public/customer paths are declared without this outer role wrapper; pages may perform their own authentication checks.
- **Styles/responsive behavior:** No local styles; shell and page CSS own layout.
- **Failure/validation:** Render-time errors within the boundary are delegated to `AppErrorBoundary`. Route path matching is delegated to React Router.
- **Callers/consumers:** Imported and rendered by `frontend/src/main.jsx`.
- **Change safely:** Add/remove route declarations here and update `RouteView` mapping and page docs. For access changes, inspect `ProtectedRoute` and verify role semantics in backend authorization too. Do not infer backend authorization from this frontend gate.
- **Tests:** No frontend test suite is configured in `frontend/package.json`. Browser route checks were previously run in Chromium; authenticated routes were not exercised.
- **Function report:** [App](../../functions-methods/frontend/src/App/App.md).
