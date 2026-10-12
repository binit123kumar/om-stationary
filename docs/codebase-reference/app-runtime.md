# Frontend Runtime, Routing and Styling

## Entry point and startup

[`frontend/src/main.jsx`](../../frontend/src/main.jsx) imports the React root component and three stylesheet files, mounts `<App />` into `#root`, and registers `public/service-worker.js` in production after page load when the browser supports service workers. Service-worker registration failures are written to the console; the app itself continues to render.

[`frontend/index.html`](../../frontend/index.html) provides the root element, metadata, app manifest link, theme colour and Apple home-screen metadata.

## Route declaration and dispatch

- [`frontend/src/App.jsx`](../../frontend/src/App.jsx) owns the React Router table and role gates.
- [`frontend/src/RouteView.jsx`](../../frontend/src/RouteView.jsx) maps route keys to page components and passes selected shared state/props.
- [`frontend/src/components/layout/AppShell.jsx`](../../frontend/src/components/layout/AppShell.jsx) supplies the common customer shell, context, header/footer, cart/wishlist state and PWA experience.
- [`frontend/src/ErrorBoundary.jsx`](../../frontend/src/ErrorBoundary.jsx) presents a render-failure fallback.
- Root component reports: [App](components/app/App.md), [RouteView](components/app/RouteView.md), [AppErrorBoundary](components/app/ErrorBoundary.md), [AdminCharts](components/app/AdminCharts.md).

## Stylesheets

| Source file | Responsibility |
| --- | --- |
| `frontend/src/styles.css` | Main store, admin and feature visual styles; includes responsive rules |
| `frontend/src/account-pages.css` | Account/login/register visual experience |
| `frontend/src/responsive.css` | Additional responsive, focus, touch-target, safe-area, PWA-notice and admin-table rules |
| `frontend/src/styles.before-*` and `*.bak` | Historical snapshots, not imported by the active entry point |

Styles are imported in `main.jsx` in the listed order; later declarations may override earlier ones. Before adding layout rules, inspect selectors in all three active files.

Detailed notes: [main styles](styles/styles.css.md), [account styles](styles/account-pages.css.md), [responsive overrides](styles/responsive.css.md).

## Public PWA resources

- `frontend/public/manifest.webmanifest`: install identity, colours, display mode and icon references.
- `frontend/public/service-worker.js`: app-shell navigation fallback and same-origin static build asset cache. It excludes API paths, non-GET requests and cross-origin resources.
- `frontend/public/offline.html`: explanatory fallback content.
- `frontend/public/icons/`: 180px Apple touch icon and 192px/512px install icons.

See the detailed PWA implementation report in `docs/implementation/RESPONSIVE_PWA_QA.md`.

## Project/deployment configuration

- `frontend/package.json` and `package-lock.json`: Vite/React dependencies and scripts. No frontend unit-test script is declared.
- `frontend/.env.example`: frontend environment template; `VITE_API_URL` controls API base configuration as consumed in source.
- `Dockerfile`: backend build/publish and frontend build/nginx stages.
- `docker-compose.yml`: SQL Server, API and frontend service wiring; secrets are supplied through environment variables.
- `nginx.conf`: front-end reverse proxy/static hosting behavior.
- `backend/OMStationary.Api/OMStationary.Api.csproj`: .NET target/dependency configuration.

These files are documented here as project-owned runtime/deployment inputs; secrets and actual runtime settings must not be copied into reference docs.
