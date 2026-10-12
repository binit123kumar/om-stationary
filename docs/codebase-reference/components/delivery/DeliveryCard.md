# DeliveryCard.jsx

**Source:** `frontend/src/components/delivery/DeliveryCard.jsx`  
**Classification:** Reusable component source

## Source-grounded summary

**Purpose:** DeliveryCard is the reusable UI module in its source folder. The report records JSX composition, parameters, state, event-related identifiers, styles, and direct consumers.

## Props, state, events, and styles

- First named function-like declaration parameters: { delivery, onStatus }
- React hooks/state APIs referenced: useState
- DOM/component event props and named event handlers found: onStatus, onClick
- Stylesheet imports: No direct stylesheet imports.
- JSX component tags: OrderStatusBadge

## Declarations and dependencies

- Exports: DeliveryCard
- Named function-like declarations: DeliveryCard, run
- Direct local imports: OrderStatusBadge -> components/orders/OrderStatusBadge.jsx; rupees -> utils/formatCurrency.js
- Direct static consumers (impact): pages/delivery/AssignedDeliveriesPage.jsx, pages/delivery/DeliveryDashboardPage.jsx, pages/delivery/DeliveryDetailPage.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: DeliveryCard, useState, async, setBusy, onStatus, rupees, map, run
- Error/control-flow markers: try/catch, finally
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/components/delivery/DeliveryCard.jsx/_index.md) for one report per statically identified named declaration in this source file.
