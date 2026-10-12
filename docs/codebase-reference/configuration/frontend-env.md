# Frontend Environment Configuration

- **Source:** `frontend/.env.example`
- **Purpose:** Documents environment variables exposed to the frontend build.
- **Known use:** `VITE_API_URL` is read by the shared API client and some page-level requests; absent/empty configuration in source falls back to `http://localhost:5000`.
- **Security boundary:** Vite `VITE_*` values are bundled into client code and are public. Never put passwords, tokens or private provider credentials in these variables.
- **Maintenance:** Keep browser-visible base URLs non-secret and consistent with CORS, nginx proxying and the deployed API origin.
- **Runtime status:** Actual deployment environment values were not read or documented.
