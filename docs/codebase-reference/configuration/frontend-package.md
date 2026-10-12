# Frontend Package Configuration

- **Source:** [`frontend/package.json`](../../../frontend/package.json), `frontend/package-lock.json`
- **Purpose:** Declares the Vite/React frontend scripts and package dependencies.
- **Scripts:** `dev`, `start`, `build`, `preview`.
- **Test status:** No test script declared; frontend automated test suite is therefore `NOT CONFIGURED`.
- **Dependencies:** React/React DOM, React Router, Vite/React plugin, Lucide icons, qrcode.react and Recharts. The package lock fixes the resolved install graph.
- **Maintenance:** Change package declarations deliberately and update the lockfile with the repository’s package manager. Verify compatibility/build after dependency changes. Do not edit installed `node_modules` files as application source.
- **Runtime relation:** Docker frontend stage runs `npm ci` then `npm run build`.
