# Cleanup Plan

## Baseline

- Repository: `D:\om-stationary-final`
- Initial branch: `feature/customer-flow`
- Initial tracked modified files: `frontend/index.html`, `frontend/src/components/layout/AppShell.jsx`, `frontend/src/main.jsx`
- Initial untracked user work: root `MODULARIZATION_*.md` files, `docs/`, and the PWA additions under `frontend/public/` and `frontend/src/`.
- The above existing changes are preserved and are not cleanup candidates.

## Exact high-confidence duplicate candidates

All candidates below are byte-identical to another existing source-side snapshot according to SHA-256. Searches found no references to the backup filenames from source, route registries, build/deployment configuration or project text. They are not loaded by Vite (which builds from `src/main.jsx`) and are not referenced by Docker (which copies `frontend/` to build and invokes the package build script). These candidates are tracked files, so removal requires explicit user approval.

| Candidate path | Retained identical copy | Size | References checked | Risk |
| --- | --- | ---: | --- | --- |
| `frontend/src/main.jsx.before-invoice-fix-2.bak` | `frontend/src/main.jsx.before-request-20261004-061857.bak` | 64,114 bytes | No reference found; neither file is an entry point/import target | Low; redundant historical copy, but tracked |
| `frontend/src/main.jsx.blank-page-backup` | `frontend/src/main.jsx.before-root-fix.bak` | 58,046 bytes | No reference found; neither file is an entry point/import target | Low; redundant historical copy, but tracked |
| `frontend/src/session.js.before-request-20261004-061857.bak` | `frontend/src/session.before-flow-20261003-021750.js` | 1,914 bytes | No reference found; neither file is imported or configured as an entry point | Low; redundant historical copy, but tracked |

The user explicitly approved these exact deletions. All three duplicate paths have now been removed; the identical copies listed above remain. Total removed: **124,074 bytes**.

## Other inspected candidates

- `frontend/dist/` is ignored and reproducible, but its recent bundle was used for browser checks and rebuilding recreates it. Retained.
- `frontend/node_modules/` is ignored but needed for immediate frontend builds; removal would require reinstalling 11,071 dependency files. Retained.
- Backend `bin/` and `obj/` directories are ignored generated outputs, but are retained to avoid unnecessary rebuild/restore churn and because the user did not explicitly request build-cache removal.
- No ZIP/RAR/7z archives or standalone `.old`, `.orig` or `.tmp` candidates were discovered outside ignored dependency/build trees.
- No source/component/service deletion is proposed; the active page and feature surface is preserved.
