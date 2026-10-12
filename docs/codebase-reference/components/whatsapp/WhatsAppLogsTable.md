# WhatsAppLogsTable.jsx

**Source:** `frontend/src/components/whatsapp/WhatsAppLogsTable.jsx`  
**Classification:** Reusable component source

## Source-grounded summary

**Purpose:** WhatsAppLogsTable is the reusable UI module in its source folder. The report records JSX composition, parameters, state, event-related identifiers, styles, and direct consumers.

## Props, state, events, and styles

- First named function-like declaration parameters: { logs = [], busy, onRetry }
- React hooks/state APIs referenced: None statically detected.
- DOM/component event props and named event handlers found: onRetry
- Stylesheet imports: No direct stylesheet imports.
- JSX component tags: WhatsAppRetryButton

## Declarations and dependencies

- Exports: WhatsAppLogsTable
- Named function-like declarations: WhatsAppLogsTable
- Direct local imports: WhatsAppRetryButton -> components/whatsapp/WhatsAppRetryButton.jsx; formatDateTime -> utils/formatDate.js
- Direct static consumers (impact): pages/admin/AdminWhatsAppPage.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: WhatsAppLogsTable, map, formatDateTime
- Error/control-flow markers: No explicit try/throw/finally token found.
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/components/whatsapp/WhatsAppLogsTable.jsx/_index.md) for one report per statically identified named declaration in this source file.
