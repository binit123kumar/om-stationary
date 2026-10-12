# ErrorState.jsx

**Source:** `frontend/src/components/common/ErrorState.jsx`  
**Classification:** Reusable component source

## Source-grounded summary

**Purpose:** ErrorState is the reusable UI module in its source folder. The report records JSX composition, parameters, state, event-related identifiers, styles, and direct consumers.

## Props, state, events, and styles

- First named function-like declaration parameters: { icon, title, message, actionLabel, actionTo }
- React hooks/state APIs referenced: None statically detected.
- DOM/component event props and named event handlers found: onRetry, onClick
- Stylesheet imports: No direct stylesheet imports.
- JSX component tags: Link

## Declarations and dependencies

- Exports: EmptyState, ErrorState
- Named function-like declarations: EmptyState, ErrorState
- Direct local imports: None.
- Direct static consumers (impact): None found under frontend/src.

## Behavior, errors, security, and maintenance

- Statically observed calls: EmptyState, ErrorState
- Error/control-flow markers: No explicit try/throw/finally token found.
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/components/common/ErrorState.jsx/_index.md) for one report per statically identified named declaration in this source file.
