# Project Architecture and Runtime Boundaries

## System shape

```text
Browser
  └─ React + Vite storefront (`frontend/src/`)
       ├─ React Router route registry (`App.jsx`)
       ├─ route-key resolver (`RouteView.jsx`)
       ├─ shared store/auth/cart shell (`components/layout/AppShell.jsx`)
       ├─ pages, reusable components, hooks, services, utilities
       ├─ shared fetch/session helpers
       └─ PWA manifest + service worker (`frontend/public/`)
            └─ API calls bypass service-worker caching

ASP.NET Core Web API (`backend/OMStationary.Api/`)
  ├─ Program.cs: configuration, DI, auth, CORS, rate limiting, middleware/endpoints
  ├─ Controllers/: HTTP entry points and request/response shaping
  ├─ Services/: business logic, provider abstractions, notifications
  ├─ Dtos/ + Models/: input contracts and EF entities/types
  └─ Data/OmDbContext + Migrations/: EF model and declared schema history
       └─ SQL Server (connection configured externally/appsettings; live state not checked)
```

## Route composition

`frontend/src/App.jsx` registers routes beneath `AppShell` and `AppErrorBoundary`. It applies `ProtectedRoute` with `Admin`, `PartnerShop`, or `DeliveryPartner` roles to the corresponding route groups. Customer routes are not wrapped in the outer role guard; page-level operations may still require a signed-in customer. `RouteView.jsx` translates page keys into imported page components. Product-form create/edit URLs share the same route key; the wildcard path renders the home page.

Frontend route guards are a UI navigation gate, not proof of API authorization. Backend controllers apply their own route/auth attributes and use the configured authentication handler/policies; inspect the individual endpoint reports for actual authorization.

## Frontend-to-backend boundary

Frontend service modules form the HTTP boundary. `services/api.js` centralizes authenticated fetch, base URL resolution, and one refresh attempt after an eligible 401. Most services use `apiFetch`; direct `fetch` usages must be individually called out in service/page reports. API base URL comes from `VITE_API_URL`, falling back to `http://localhost:5000`. This is configuration behavior, not an availability check.

The service worker handles only same-origin GET application navigation and built assets and explicitly bypasses `/api/` requests. Offline shell rendering must not be interpreted as offline ordering/payment/API support.

## Backend-to-database boundary

`Program.cs` registers `OmDbContext` with SQL Server using `ConnectionStrings:DefaultConnection`, service/provider implementations and their HTTP clients, JWT authentication, CORS, and rate-limiting policies. Controllers and services consume `OmDbContext` directly; the inspected project does not establish a separate repository abstraction. `OnModelCreating` supplies EF indexes, precision, lengths and relationships. `Migrations/` gives schema history.

The reports describe **declared EF/migration schema only**. No database connection or schema introspection is part of this audit; live table/column existence, migration application state, and production data are `NOT_TESTED`.

## Evidence convention

For each chain, follow the source references in the relevant page/component, frontend service, controller action, service/data, and table/migration report. A missing link in one report is `NOT_MAPPED`, not an implied connection. Runtime status appears separately from source implementation status.
