# session service

## Source identity

- Source: [frontend/src/services/session.js](../../../frontend/src/services/session.js)
- Classification: frontend service module under frontend/src/services.
- Exported declarations detected: apiBase, readSession, saveSession, clearSession, mapServerCart.
- Important function exports, signatures, and adjacent source comments:
- **readSession()** — No directly preceding source comment.
- **saveSession(session)** — No directly preceding source comment.
- **clearSession()** — No directly preceding source comment.
- **mapServerCart(rows = [])** — Maps the server cart rows to the shape the storefront cart state uses.

## HTTP call expressions detected
- POST via fetch; path expression: ${apiBase}/api/auth/refresh.

## Local dependencies

- API_BASE from frontend/src/utils/constants.js.

## Backend mapping and runtime status

The listed expressions are frontend source call sites; method labels use a static scan of the nearby options object and otherwise say GET/default. They are not observed network traffic. No backend route/action mapping is asserted in this report, and response behavior or availability is not runtime-verified.
