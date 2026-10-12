# Main Application Styles

- **Source:** [`frontend/src/styles.css`](../../../frontend/src/styles.css)
- **Loaded by:** `frontend/src/main.jsx`, before `account-pages.css` and `responsive.css`.
- **Purpose:** Main visual layer for the storefront and feature pages plus admin/shared operational UI. It contains global typography/box sizing, header and nav, hero, product grid/cards, product detail, cart/checkout, order tracking, footer, account-adjacent content and admin tables/charts.
- **Important global selectors:** `:root`, `*`, `body`, `header`, `nav`, `main`, `footer`. These selectors affect the shared app; changes can impact multiple route groups.
- **Responsive rules:** This file contains multiple media-query sections (29 occurrences at inspection), including storefront breakpoints around 1000/650px and admin/content adjustments at 900/800px. Additional route-specific rules are interspersed later in the file.
- **Dependencies:** Components emit class names such as `.top`, `.logo`, `.search`, `.grid`, `.card`, `.product`, `.cartlayout`, `.checkout`, `.admin-table`, `.admin-chart-grid`, and many feature-specific classes.
- **Maintenance:** Search a class name from the component/page before changing it. Prefer narrow feature selectors over modifying broad global element selectors. Check interaction with `account-pages.css` and last-loaded `responsive.css`.
- **Tests:** CSS build is included in Vite production build; no dedicated visual regression test suite is configured. Responsive browser checks were performed previously for a documented route/viewpoint subset.
