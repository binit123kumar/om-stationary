# Authentication and profile flow

## Flow chain

| Layer | Source-supported behavior |
|---|---|
| Route/page | `/login` → `RouteView` → `LoginPage` → `LoginForm`; `/register` → `RegisterPage` → `RegisterForm`. The account shell receives `onAuth` from `AppShell`. |
| Handler/state | Login/register pages submit credentials/profile fields, parse the response, persist returned session via `saveSession`, reconcile the guest cart, and call the shell auth callback. `AppShell` stores the current user; logout clears session and app cart/wishlist state. |
| Hook/service | `authService.login` and `.register` issue raw POST fetches; `.logout` and `.getMe` use `apiFetch`. `session.js` stores the session in `sessionStorage`, refreshes access tokens with a single in-flight `/api/auth/refresh`, and maps server cart rows. `apiFetch` retries a 401 once after refresh unless a token override was supplied. |
| HTTP contract | `POST /api/auth/login`; `POST /api/auth/register`; `POST /api/auth/refresh`; authenticated `POST /api/auth/logout`; authenticated `GET /api/auth/me`. |
| Backend | `AuthController.Login`, `Register`, `Refresh`, `Logout`, and `Me`; `TokenService` creates access/refresh tokens. Login accepts email or a 10-digit mobile number; registration validates password complexity and uniqueness and assigns the Customer role. |
| Data | `ApplicationUser` → `OmDbContext.Users`; `AppRole` → `Roles`; `CustomerProfile` → `CustomerProfiles`; `RefreshToken` → `RefreshTokens`. Profile editing/addresses are handled by `CustomersController` and covered separately below. |

## Response and error path

Successful sign-in/registration returns access token, refresh token, and user data from `CreateSession`. Registration creates the user/profile before attempting a best-effort new-customer WhatsApp notification. Bad input returns 400; duplicate email/mobile returns 409; invalid credentials or refresh token return 401; missing Customer role configuration returns 503. The frontend surfaces response detail where available; `apiFetch` uses `readFailure` for API-safe fallback messages. Logout is best-effort in the shell and clears local session state even if the request fails.

## Tests and status

- **Tests:** No frontend authentication integration test or backend AuthController test was found in the checked test sources. This is **NOT_MAPPED** as a route-level test. Existing `backend/OMStationary.Api.Tests` contains order-state and notification tests, not auth-flow tests.
- **Source status:** **Confirmed** from [App.jsx](../../../frontend/src/App.jsx), [RouteView.jsx](../../../frontend/src/RouteView.jsx), [AppShell.jsx](../../../frontend/src/components/layout/AppShell.jsx), [authService.js](../../../frontend/src/services/authService.js), [session.js](../../../frontend/src/services/session.js), [AuthController.cs](../../../backend/OMStationary.Api/Controllers/AuthController.cs), and [OmDbContext.cs](../../../backend/OMStationary.Api/Data/OmDbContext.cs).
- **Runtime status:** **Unverified.** No live login/registration request or database query was run for this report. Token creation in source does not establish deployed key/configuration validity.
