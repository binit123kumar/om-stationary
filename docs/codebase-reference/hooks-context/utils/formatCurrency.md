# formatCurrency.js

**Source:** `frontend/src/utils/formatCurrency.js`  
**Classification:** Hook / utility source

## Source-grounded summary

**Purpose:** formatCurrency is a utility module identified by source path. Exports and callers are statically indexed; runtime behavior is not asserted.

## Declarations and dependencies

- Exports: rupees, rupeesShort, formatNumber
- Named function-like declarations: rupees, rupeesShort, formatNumber
- Direct local imports: None.
- Direct static consumers (impact): components/admin/AdminKpiCard.jsx, components/admin/RecentOrdersTable.jsx, components/admin/SalesChart.jsx, components/admin/TopProductsTable.jsx, components/cart/CartItem.jsx, components/checkout/CodConfirmation.jsx, components/checkout/CouponBox.jsx, components/checkout/DeliveryMethodSelector.jsx, components/checkout/OrderSummary.jsx, components/checkout/PlaceOrderButton.jsx, components/checkout/UpiPaymentPanel.jsx, components/delivery/DeliveryCard.jsx, components/invoice/InvoiceItemsTable.jsx, components/invoice/InvoiceTotals.jsx, components/orders/OrderCard.jsx, components/orders/OrderSummary.jsx, components/orders/TrackingTimeline.jsx, components/partner/PartnerOrderCard.jsx, pages/admin/AdminCouponsPage.jsx, pages/admin/AdminCustomersPage.jsx, pages/admin/AdminInventoryPage.jsx, pages/admin/AdminInvoicesPage.jsx, pages/admin/AdminOrderDetailPage.jsx, pages/admin/AdminOrdersPage.jsx, pages/admin/AdminPaymentsPage.jsx, pages/admin/AdminProductsPage.jsx, pages/admin/AdminReportsPage.jsx, pages/customer/CheckoutPage.jsx, pages/customer/PaymentPage.jsx, pages/partner/PartnerProductsPage.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: Number, toLocaleString
- Error/control-flow markers: No explicit try/throw/finally token found.
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/utils/formatCurrency.js/_index.md) for one report per statically identified named declaration in this source file.
