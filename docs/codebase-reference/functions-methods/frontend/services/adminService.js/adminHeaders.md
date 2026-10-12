# adminHeaders (exported)

**Source identity:** `frontend/src/services/adminService.js`, declaration at line 6  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [adminService.md](../../../../services/adminService.md)

## Signature and responsibility

- **Name:** `adminHeaders` (exported).
- **Parameters:** `session, legacyKey`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `adminHeaders` body ke direct calls none identified hain; 1 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** ``L8: { ...(hasAdminSession ? { Authorization: `Bearer ${session.accessToken}` } : { 'X-Admin-Key': legacyKey }), 'Content-Type': 'application/json' }``
- **Direct call identifiers in this body:** None identified by lexical scan.
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** hooks/useAdmin.js, pages/admin/AdminAuditLogPage.jsx, pages/admin/AdminCategoriesPage.jsx, pages/admin/AdminCouponsPage.jsx, pages/admin/AdminCustomersPage.jsx, pages/admin/AdminDashboardPage.jsx, pages/admin/AdminDeliveryPage.jsx, pages/admin/AdminInventoryPage.jsx, pages/admin/AdminInvoicesPage.jsx, pages/admin/AdminNotificationsPage.jsx, pages/admin/AdminOrderDetailPage.jsx, pages/admin/AdminOrdersPage.jsx, pages/admin/AdminPartnerShopsPage.jsx, pages/admin/AdminPaymentsPage.jsx, pages/admin/AdminProductFormPage.jsx, pages/admin/AdminProductsPage.jsx, pages/admin/AdminReportsPage.jsx, pages/admin/AdminSettingsPage.jsx, pages/admin/AdminWhatsAppPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
