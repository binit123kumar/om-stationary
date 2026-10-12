# UpiPaymentPanel.jsx

**Source:** `frontend/src/components/checkout/UpiPaymentPanel.jsx`  
**Classification:** Reusable component source

## Source-grounded summary

**Purpose:** UpiPaymentPanel is the reusable UI module in its source folder. The report records JSX composition, parameters, state, event-related identifiers, styles, and direct consumers.

## Props, state, events, and styles

- First named function-like declaration parameters: { order, options, onVerified }
- React hooks/state APIs referenced: useState, useRef, useCallback, useEffect
- DOM/component event props and named event handlers found: onVerified, onClick
- Stylesheet imports: No direct stylesheet imports.
- JSX component tags: CheckCircle2, Link, QrCode, Loader2, QRCodeSVG, AlertTriangle, Lock

## Declarations and dependencies

- Exports: UpiPaymentPanel
- Named function-like declarations: UpiPaymentPanel
- Direct local imports: createPaymentIntent, verifyPayment -> services/paymentService.js; readFailure -> services/api.js; rupees -> utils/formatCurrency.js
- Direct static consumers (impact): pages/customer/PaymentPage.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: UpiPaymentPanel, useState, useRef, useCallback, async, setState, setMessage, createPaymentIntent, readFailure, json, setIntent, useEffect, loadIntent, clearInterval, setChecking, verifyPayment, setLastStatus, setInterval, encodeURIComponent, rupees, Payment
- Error/control-flow markers: try/catch, finally
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/components/checkout/UpiPaymentPanel.jsx/_index.md) for one report per statically identified named declaration in this source file.
