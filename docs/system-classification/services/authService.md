# authService service

## Source identity

- Source: [frontend/src/services/authService.js](../../../frontend/src/services/authService.js)
- Classification: frontend service module under frontend/src/services.
- Exported declarations detected: login, register, logout, getMe.
- Important function exports, signatures, and adjacent source comments:
- **login(email, password)** — No directly preceding source comment.
- **register(payload)** — No directly preceding source comment.
- **logout(refreshToken)** — No directly preceding source comment.
- **getMe()** — No directly preceding source comment.

## HTTP call expressions detected
- POST via fetch; path expression: ${apiBase}/api/auth/login.
- POST via fetch; path expression: ${apiBase}/api/auth/register.
- POST via apiFetch; path expression: /api/auth/logout.
- GET/DEFAULT via apiFetch; path expression: /api/auth/me.

## Local dependencies

- apiFetch from frontend/src/services/api.js.
- apiBase from frontend/src/services/session.js.

## Backend mapping and runtime status

The listed expressions are frontend source call sites; method labels use a static scan of the nearby options object and otherwise say GET/default. They are not observed network traffic. No backend route/action mapping is asserted in this report, and response behavior or availability is not runtime-verified.
