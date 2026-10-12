# Cleanup Deleted Files

The user explicitly approved removal of the three tracked byte-identical backup copies below. In each case, the identical retained copy remains in the repository.

| Exact path deleted | Category | Confirmation | Approx. size removed |
| --- | --- | --- | ---: |
| `frontend/src/main.jsx.before-invoice-fix-2.bak` | Duplicate source backup | SHA-256 matched retained `frontend/src/main.jsx.before-request-20261004-061857.bak`; no source/build reference found | 64,114 bytes |
| `frontend/src/main.jsx.blank-page-backup` | Duplicate source backup | SHA-256 matched retained `frontend/src/main.jsx.before-root-fix.bak`; no source/build reference found | 58,046 bytes |
| `frontend/src/session.js.before-request-20261004-061857.bak` | Duplicate session backup | SHA-256 matched retained `frontend/src/session.before-flow-20261003-021750.js` and other recovery copies; no source/build reference found | 1,914 bytes |

**Total removed: 124,074 bytes (approximately 121.2 KiB).**

No other file or directory was deleted.
