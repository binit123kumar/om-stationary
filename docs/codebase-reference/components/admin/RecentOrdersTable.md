# RecentOrdersTable.jsx

**Source:** `frontend/src/components/admin/RecentOrdersTable.jsx`  
**Classification:** Reusable component source

## Source-grounded summary

**Purpose:** RecentOrdersTable is the reusable UI module in its source folder. The report records JSX composition, parameters, state, event-related identifiers, styles, and direct consumers.

## Props, state, events, and styles

- First named function-like declaration parameters: { orders = [], money }
- React hooks/state APIs referenced: None statically detected.
- DOM/component event props and named event handlers found: None detected.
- Stylesheet imports: No direct stylesheet imports.
- JSX component tags: Link, OrderStatusBadge

## Declarations and dependencies

- Exports: RecentOrdersTable
- Named function-like declarations: RecentOrdersTable
- Direct local imports: rupeesShort -> utils/formatCurrency.js; formatDateTime -> utils/formatDate.js; OrderStatusBadge -> components/orders/OrderStatusBadge.jsx
- Direct static consumers (impact): pages/admin/AdminDashboardPage.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: RecentOrdersTable, rupeesShort, slice, map, formatDateTime, inr
- Error/control-flow markers: No explicit try/throw/finally token found.
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/components/admin/RecentOrdersTable.jsx/_index.md) for one report per statically identified named declaration in this source file.
