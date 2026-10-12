# Docker Compose Configuration

- **Source:** [`docker-compose.yml`](../../../docker-compose.yml)
- **Purpose:** Wires SQL Server 2022, ASP.NET API and nginx frontend services on an internal network.
- **Data persistence:** SQL Server data uses named volume `om-stationary-sqlserver-data`; volume is persistent data and is not a cleanup target.
- **Secrets/configuration:** Passwords, JWT signing key, origin, TLS mount and integration settings are passed as environment variables. Actual secrets must stay outside source and docs.
- **Dependencies/health:** API waits for SQL Server health check; frontend depends on API.
- **Networking:** Frontend exposes HTTP/HTTPS container ports; nginx configuration redirects HTTP to HTTPS and proxies `/api/` to API.
- **Maintenance:** Update environment names and service references together with deployment documentation. Avoid destructive volume operations; they can erase database data.
- **Validation:** Configuration source inspected only; Docker Compose was not started during this documentation task.
