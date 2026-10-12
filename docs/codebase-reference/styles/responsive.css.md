# Responsive and Accessibility Overrides

- **Source:** [`frontend/src/responsive.css`](../../../frontend/src/responsive.css)
- **Loaded by:** `frontend/src/main.jsx`, after `styles.css` and `account-pages.css`.
- **Purpose:** Shared responsive/accessibility/PWA refinements added without creating a second application: minimum widths, horizontal overflow containment, focus-visible outlines, 44px interactive targets, image constraints, admin table scrolling, iOS safe-area spacing, responsive chart/footer grids and PWA notice/dialog styling.
- **Breakpoints:** 651–900px tablet rules, max 650px mobile rules, max 360px narrow-phone refinements.
- **Dependencies:** Existing selectors emitted by common layouts and feature components, including `.admin-table`, `.grid`, `.adminstats`, `.admin-chart-grid`, `.footer-details`, `.pwa-experience` and `.pwa-notice`.
- **Maintenance:** This is a later stylesheet layer, so it can override base styles. Prefer adding scoped media rules here when adapting an existing shared layout; keep selectors grounded in active JSX.
- **Verification:** Prior production-preview Chromium checks found no horizontal overflow in 108 route/viewport combinations across 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920 CSS px. Those are simulated viewports, not physical devices.
