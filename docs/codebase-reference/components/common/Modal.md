# Modal.jsx

**Source:** `frontend/src/components/common/Modal.jsx`  
**Classification:** Reusable component source

## Source-grounded summary

**Purpose:** Modal is the reusable UI module in its source folder. The report records JSX composition, parameters, state, event-related identifiers, styles, and direct consumers.

## Props, state, events, and styles

- First named function-like declaration parameters: { open, onClose, title, children, wide = false }
- React hooks/state APIs referenced: useEffect
- DOM/component event props and named event handlers found: onClose, onKey, onClick
- Stylesheet imports: No direct stylesheet imports.
- JSX component tags: None detected.

## Declarations and dependencies

- Exports: Modal
- Named function-like declarations: Modal, onKey
- Direct local imports: None.
- Direct static consumers (impact): components/admin/AdminModal.jsx, components/common/ConfirmDialog.jsx, pages/admin/AdminCategoriesPage.jsx, pages/admin/AdminCouponsPage.jsx, pages/admin/AdminDeliveryPage.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: Modal, useEffect, addEventListener, removeEventListener, stopPropagation
- Error/control-flow markers: No explicit try/throw/finally token found.
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/components/common/Modal.jsx/_index.md) for one report per statically identified named declaration in this source file.
