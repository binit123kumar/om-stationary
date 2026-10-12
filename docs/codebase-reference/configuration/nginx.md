# Nginx Configuration

- **Source:** [`nginx.conf`](../../../nginx.conf)
- **Purpose:** Serves the built SPA, enforces HTTPS redirect, applies response security headers, and reverse-proxies API traffic.
- **Routing:** Port 80 responds with a 308 HTTPS redirect. HTTPS serves `/usr/share/nginx/html`; unknown frontend paths fall back to `index.html`. `/api/` proxies to `api:80`.
- **TLS:** Reads `fullchain.pem` and `privkey.pem` from `/etc/nginx/certs`.
- **Headers:** HSTS, frame, content-type, referrer and permissions policy headers are configured.
- **Static resources:** JS/CSS/images/fonts are sent long-lived immutable cache headers. Service worker and manifest are not in the explicit asset-extension regex, so they follow the general location behavior.
- **Maintenance:** Check SPA fallback, `/api/` proxy, HTTPS and caching behavior when adding service-worker assets or changing frontend hosting.
- **Validation:** File inspected; nginx syntax/config test was not run.
