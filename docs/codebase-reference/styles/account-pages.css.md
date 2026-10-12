# Account Page Styles

- **Source:** [`frontend/src/account-pages.css`](../../../frontend/src/account-pages.css)
- **Loaded by:** `frontend/src/main.jsx`, after `styles.css` and before `responsive.css`.
- **Purpose:** Login, registration and account/dashboard visual treatment. The file defines account-specific visual tokens and applies layered dark/blue/purple/cyan gradients to `.account-page` and `.account`, with supporting form/card styles.
- **Dependencies:** Login/register/account page and auth component class names; check the actual JSX before changing a selector.
- **Cascade behavior:** It declares root custom properties such as account surface, text and accent colours. Because this stylesheet is loaded after `styles.css`, overlapping declarations may override base styles; `responsive.css` remains later in the cascade.
- **Maintenance:** Keep changes scoped to account/auth classes. Before changing root tokens or generic controls, review side effects on global store styles and accessibility contrast.
- **Tests:** Included in Vite build; no separate CSS test. Physical-device visual validation is not implied.
