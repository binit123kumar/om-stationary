# readSession (exported)

**Source identity:** `frontend/src/services/session.js`, declaration at line 10  
**Declaration kind:** function declaration  
**Module report:** [session.md](../../../../services/session.md)

## Signature and responsibility

- **Name:** `readSession` (exported).
- **Parameters:** `(none)`
- **Simple Hinglish responsibility:** Named helper/handler. Hinglish: `readSession` local action/helper hai; body calls parse, getItem and has browser storage effect marker(s).

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L11: JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null')`
- **Return at source:** `L12: null`
- **Direct call identifiers in this body:** parse, getItem
- **Effects visible in this body:** browser storage
- **Error-flow markers visible in this body:** try (1), catch (1)
- **Verified static import callers:** components/layout/AppShell.jsx, components/layout/ProtectedRoute.jsx, hooks/useAdmin.js, hooks/useAuth.js, hooks/useCart.js, pages/admin/AdminAuditLogPage.jsx, pages/admin/AdminCategoriesPage.jsx, pages/admin/AdminCouponsPage.jsx, pages/admin/AdminCustomersPage.jsx, pages/admin/AdminDashboardPage.jsx, pages/admin/AdminDeliveryPage.jsx, pages/admin/AdminInventoryPage.jsx, pages/admin/AdminInvoicesPage.jsx, pages/admin/AdminNotificationsPage.jsx, pages/admin/AdminOrderDetailPage.jsx, pages/admin/AdminOrdersPage.jsx, pages/admin/AdminPartnerShopsPage.jsx, pages/admin/AdminPaymentsPage.jsx, pages/admin/AdminProductFormPage.jsx, pages/admin/AdminProductsPage.jsx, pages/admin/AdminReportsPage.jsx, pages/admin/AdminSettingsPage.jsx, pages/admin/AdminWhatsAppPage.jsx, pages/customer/CheckoutPage.jsx, pages/customer/NotificationsPage.jsx, services/api.js

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
