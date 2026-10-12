# AddressForm.jsx

**Source:** `frontend/src/components/checkout/AddressForm.jsx`  
**Classification:** Reusable component source

## Source-grounded summary

**Purpose:** AddressForm is the reusable UI module in its source folder. The report records JSX composition, parameters, state, event-related identifiers, styles, and direct consumers.

## Props, state, events, and styles

- First named function-like declaration parameters: {
  details,
  errors,
  cities = [],
  locating = false,
  quoting = false,
  geoError = '',
  quote,
  quoteError = '',
  onField,
  onRequestLocation,
  onRequestQuote
}
- React hooks/state APIs referenced: None statically detected.
- DOM/component event props and named event handlers found: onField, onRequestLocation, onRequestQuote, onChange, onClick
- Stylesheet imports: No direct stylesheet imports.
- JSX component tags: Input, Select, Navigation, Button

## Declarations and dependencies

- Exports: AddressForm
- Named function-like declarations: AddressForm
- Direct local imports: Input -> components/common/Input.jsx; Select -> components/common/Select.jsx; Button -> components/common/Button.jsx
- Direct static consumers (impact): pages/customer/CheckoutPage.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: AddressForm, onField, Landmark, map
- Error/control-flow markers: No explicit try/throw/finally token found.
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/components/checkout/AddressForm.jsx/_index.md) for one report per statically identified named declaration in this source file.
