# Frontend source inventory

This inventory reflects current project source, excluding filename-marked historical snapshots/backups and generated/dependency output. It is a static source inventory, not proof that a file is bundled or reachable at runtime.

| Source group | Discovered | Individual reports |
|---|---:|---:|
| Active route-level page modules | 50 | 50 |
| Other page-folder modules | 3 | 0 (shared/non-route) |
| Project-owned components under frontend/src/components | 122 | 122 |
| Root React modules (App, RouteView, ErrorBoundary, AdminCharts) | 4 | 4 |
| Service modules | 14 | 14 |
| Hook modules | 12 | 12 |
| Utility modules | 7 | classified at group level |
| Active source modules under frontend/src | 213 | see groups above |

## Page-folder modules not routed by RouteView

- frontend/src/pages/customer/LegalContent.jsx — not imported/dispatched as a RouteView page; classified shared/non-route.
- frontend/src/pages/customer/LegalPages.jsx — not imported/dispatched as a RouteView page; classified shared/non-route.
- frontend/src/pages/customer/content.js — not imported/dispatched as a RouteView page; classified shared/non-route.

## Indexes

- [Routes](route-inventory.md)
- [Pages](../pages/)
- [Components](../components/)
- [Services](../services/)
- [Hooks](../hooks/)
- [Classification scope](../frontend/FRONTEND_SCOPE_SUMMARY.md)

## Exclusions

Filename-marked snapshots such as frontend/src/AccountPages.before-flow-20261003-021750.jsx, frontend/src/main.before-flow-20261003-021750.jsx and frontend/src/session.before-flow-20261003-021750.js are excluded from active counts. They remain untouched. No backend, config, or pre-existing documentation is changed.
