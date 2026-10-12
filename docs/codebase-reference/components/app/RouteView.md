# RouteView

- **Source:** [`frontend/src/RouteView.jsx`](../../../../frontend/src/RouteView.jsx)
- **Kind:** React function component / page dispatcher.
- **Purpose:** Converts the `page` key supplied by `App.jsx` into the actual route-level page component.
- **Inputs:** `page` prop; exact key values are set in `App.jsx`.
- **State and dependencies:** Reads `AppShellContext` via `useContext`, then constructs customer and admin prop objects from the shared state.
- **Rendered content:** A switch statement returns customer, admin, partner or delivery pages. Customer props include cart actions, catalog, categories and wishlist state; admin pages receive the user and logout callback; partner/delivery pages mostly obtain their own feature state.
- **Side effects/API:** None directly; child pages/hooks initiate their own requests and updates.
- **Failure behavior:** Unknown keys return `null`. Missing context is not explicitly guarded here; correctness depends on `AppShell` placement.
- **Callers/consumers:** Every declared route renders a `RouteView` instance from `App.jsx`.
- **Styles/responsive behavior:** No local styling; route page and shared layout styles apply.
- **Change safely:** When adding a page route, add a matching `case` and supply required props. Check page imports and route guard at the router. A mismatched page key silently renders `null`.
- **Tests:** No dedicated frontend tests configured. Route rendering was checked in production-preview browser for core customer routes and unauthenticated admin redirection.
- **Function report:** [RouteView](../../functions-methods/frontend/src/RouteView/RouteView.md).
