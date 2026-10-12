# Cleanup Preserved Files

## Intentionally retained backups and historical copies

These files differ from their active counterparts or form timestamped recovery snapshots. Their historical content may be useful; none is removed based on naming alone.

- `frontend/src/AccountPages.before-flow-20261003-021750.jsx`
- `frontend/src/AccountPages.jsx.before-request-20261004-061857.bak`
- `frontend/src/AccountPages.jsx.login-backup`
- `frontend/src/AccountPages.jsx.register-backup`
- `frontend/src/main.before-flow-20261003-021750.jsx`
- `frontend/src/main.jsx.before-invoice-fix.bak`
- `frontend/src/main.jsx.before-location-fix-2.bak`
- `frontend/src/main.jsx.before-root-fix.bak` (retained representative of a duplicate pair)
- `frontend/src/session.before-flow-20261003-021750.js` (retained representative of a duplicate group)
- `frontend/src/styles.before-3d-dashboard.css`
- `frontend/src/styles.before-flow-20261003-021750.css`
- `frontend/src/styles.css.before-request-20261004-061857.bak`
- `_backups/20261004-0652/`
- `_backups/20261004-121027/`
- `_backups/frontend-refactor-20261006-083048/`

`_backups/` includes distinct source snapshots; its logs and partial file sets were not treated as disposable just because duplicates exist elsewhere.

## Ignored files, generated output and user artifacts retained

- `.kilo/` ignored worktree: retained as possible active user work.
- `_logs/`, `_smoke.*`, `_em.txt`, `_order.txt`: retained; smoke outputs may contain sensitive test information.
- `frontend/dist/`, `frontend/node_modules/`: retained; the first is generated and reproducible, the second is required for immediate frontend builds.
- Backend `bin/` and `obj/` directories for API and tests: retained as generated build/restore outputs.
- Existing untracked modularization and implementation documentation: retained.
- PWA source and public assets from the prior implementation: retained.

## Duplicate data retained within recovery snapshots

Some exact copies also exist between source-side snapshots and `_backups/` (including old styles and session files). The enclosing historical backup directories are preserved as recovery sets; deleting individual members could make those sets incomplete.

