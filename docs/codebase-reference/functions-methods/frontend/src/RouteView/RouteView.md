# RouteView

- **ID:** `frontend:src/RouteView.jsx:RouteView`
- **Identity:** JavaScript React function component in `frontend/src/RouteView.jsx`.
- **Inputs:** `page` route key.
- **Purpose (simple Hinglish):** Router se mila page key dekhkar matching customer, admin, partner ya delivery page render karta hai.
- **Execution:** Reads `AppShellContext`; builds `customerProps` and `adminProps`; switches on `page`; returns the matching imported page with required props; returns `null` for an unknown key.
- **Output:** React element or `null`.
- **Dependencies/callees:** `useContext`, `AppShellContext`, route-level page modules. Child pages own their API and local interaction flows.
- **Side effects:** No direct network/storage side effect.
- **Call relationship:** `App.jsx` renders it for route elements; its page result is rendered under `AppShell`.
- **Failure/security:** Assumes context exists; route role checks are made in `App.jsx`, while backend must enforce API permissions independently.
- **Maintenance:** Update imports, switch case and `App.jsx` route together. Check forwarded prop names against destination component signature.
- **Tests:** No frontend automated test configured; production preview resolved core routes.
