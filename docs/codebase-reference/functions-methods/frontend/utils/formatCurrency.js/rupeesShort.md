# rupeesShort (exported)

**Source identity:** `frontend/src/utils/formatCurrency.js`, declaration at line 9  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [formatCurrency.md](../../../../hooks-context/utils/formatCurrency.md)

## Signature and responsibility

- **Name:** `rupeesShort` (exported).
- **Parameters:** `value`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `rupeesShort` body ke direct calls Number, toLocaleString hain; 0 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** No explicit return statement identified in the extracted body.
- **Direct call identifiers in this body:** Number, toLocaleString
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/admin/AdminKpiCard.jsx, components/admin/RecentOrdersTable.jsx, components/admin/SalesChart.jsx, components/admin/TopProductsTable.jsx, components/checkout/DeliveryMethodSelector.jsx, components/orders/OrderCard.jsx, pages/admin/AdminCouponsPage.jsx, pages/admin/AdminCustomersPage.jsx, pages/admin/AdminInventoryPage.jsx, pages/admin/AdminInvoicesPage.jsx, pages/admin/AdminOrdersPage.jsx, pages/admin/AdminPaymentsPage.jsx, pages/admin/AdminProductsPage.jsx, pages/admin/AdminReportsPage.jsx, pages/customer/CheckoutPage.jsx, pages/partner/PartnerProductsPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
