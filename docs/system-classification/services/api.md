# api service

## Source identity

- Source: [frontend/src/services/api.js](../../../frontend/src/services/api.js)
- Classification: frontend service module under frontend/src/services.
- Exported declarations detected: apiFetch, readFailure.
- Important function exports, signatures, and adjacent source comments:
- **apiFetch(path, options = {}, tokenOverride = null)** — No directly preceding source comment.
- **readFailure(response, fallback)** — Turns any failed fetch into a customer-safe message. Stack traces and raw HTML never reach the UI.

## HTTP call expressions detected
- GET/DEFAULT via apiFetch; path expression: dynamic first argument: path.
- GET/DEFAULT via fetch; path expression: dynamic first argument: path.startsWith('http') ? path : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${path}`.

## Local dependencies

- refreshSession, readSession from frontend/src/services/session.js.

## Backend mapping and runtime status

The listed expressions are frontend source call sites; method labels use a static scan of the nearby options object and otherwise say GET/default. They are not observed network traffic. No backend route/action mapping is asserted in this report, and response behavior or availability is not runtime-verified.
