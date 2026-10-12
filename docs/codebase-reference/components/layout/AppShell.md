# AppShell.jsx

**Source:** `frontend/src/components/layout/AppShell.jsx`  
**Classification:** Reusable component source

## Source-grounded summary

**Purpose:** AppShell is the reusable UI module in its source folder. The report records JSX composition, parameters, state, event-related identifiers, styles, and direct consumers.

## Props, state, events, and styles

- First named function-like declaration parameters: (none declared)
- React hooks/state APIs referenced: useCatalog, useCategories, useState, useNotifications, useCallback, useEffect
- DOM/component event props and named event handlers found: onAuth, onLogout
- Stylesheet imports: No direct stylesheet imports.
- JSX component tags: AppShellContext, Header, Outlet, FooterMap, PwaExperience

## Declarations and dependencies

- Exports: AppShell
- Named function-like declarations: AppShell, onAuth, onLogout, add, addN, change, remove
- Direct local imports: apiFetch -> services/api.js; clearSession, mapServerCart, readSession -> services/session.js; useCatalog -> hooks/useCatalog.js; useCategories -> hooks/useCategories.js; useNotifications -> hooks/useNotifications.js; Header -> components/layout/Header.jsx; FooterMap -> components/layout/FooterMap.jsx; PwaExperience -> components/layout/PwaExperience.jsx
- Direct static consumers (impact): App.jsx, RouteView.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: createContext, AppShell, useCatalog, useCategories, useState, readSession, useNotifications, parse, getItem, isArray, useCallback, async, setWishlistLoading, apiFetch, setWishlist, setWishlistError, Error, json, map, setItem, stringify, useEffect, syncWishlistFromServer, removeItem
- Error/control-flow markers: try/catch, throw, finally
- Browser storage / network / navigation markers: network call, web storage
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/components/layout/AppShell.jsx/_index.md) for one report per statically identified named declaration in this source file.
