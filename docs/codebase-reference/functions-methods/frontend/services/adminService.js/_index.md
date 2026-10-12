# Declaration index: services/adminService.js

**Source:** `frontend/src/services/adminService.js`  
**Named declarations identified:** 36  
**Linked module report:** [adminService.md](../../../../services/adminService.md)

## Individually reported named declarations

- [`adminHeaders` (line 6)](adminHeaders.md)
- [`getDashboard` (line 14)](getDashboard.md)
- [`getAnalytics` (line 19)](getAnalytics.md)
- [`getFilterOptions` (line 24)](getFilterOptions.md)
- [`listAdminOrders` (line 31)](listAdminOrders.md)
- [`updateOrderStatus` (line 41)](updateOrderStatus.md)
- [`confirmOrderPayment` (line 50)](confirmOrderPayment.md)
- [`assignDelivery` (line 60)](assignDelivery.md)
- [`assignDeliveryPartner` (line 73)](assignDeliveryPartner.md)
- [`listAdminProducts` (line 82)](listAdminProducts.md)
- [`createProduct` (line 89)](createProduct.md)
- [`updateProduct` (line 93)](updateProduct.md)
- [`deactivateProduct` (line 97)](deactivateProduct.md)
- [`adjustStock` (line 101)](adjustStock.md)
- [`listAdminCategories` (line 110)](listAdminCategories.md)
- [`createCategory` (line 116)](createCategory.md)
- [`updateCategory` (line 120)](updateCategory.md)
- [`listAdminCoupons` (line 129)](listAdminCoupons.md)
- [`createCoupon` (line 135)](createCoupon.md)
- [`updateCoupon` (line 139)](updateCoupon.md)
- [`listAdminCustomers` (line 144)](listAdminCustomers.md)
- [`listAdminPayments` (line 151)](listAdminPayments.md)
- [`listAdminInvoices` (line 158)](listAdminInvoices.md)
- [`getAdminNotifications` (line 165)](getAdminNotifications.md)
- [`getAdminWishlistStats` (line 171)](getAdminWishlistStats.md)
- [`getAuditLog` (line 176)](getAuditLog.md)
- [`getReport` (line 183)](getReport.md)
- [`exportReport` (line 191)](exportReport.md)
- [`getAdminSettings` (line 199)](getAdminSettings.md)
- [`saveAdminSettings` (line 205)](saveAdminSettings.md)
- [`listPartnerShops` (line 210)](listPartnerShops.md)
- [`setPartnerShopApproval` (line 216)](setPartnerShopApproval.md)
- [`listDeliveryPartners` (line 225)](listDeliveryPartners.md)
- [`createDeliveryPartner` (line 231)](createDeliveryPartner.md)
- [`listAllAssignments` (line 235)](listAllAssignments.md)
- [`getAdminOrder` (line 242)](getAdminOrder.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 112; lexical line fragment `if (!response.ok) throw new Error((await response.json().catch(() => ({}))).detail || 'Could not load categories.');` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 131; lexical line fragment `if (!response.ok) throw new Error((await response.json().catch(() => ({}))).detail || 'Could not load coupons.');` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 147; lexical line fragment `if (!response.ok) throw new Error((await response.json().catch(() => ({}))).detail || 'Could not load customers.');` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 154; lexical line fragment `if (!response.ok) throw new Error((await response.json().catch(() => ({}))).detail || 'Could not load payments.');` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 161; lexical line fragment `if (!response.ok) throw new Error((await response.json().catch(() => ({}))).detail || 'Could not load invoices.');` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 167; lexical line fragment `if (!response.ok) throw new Error((await response.json().catch(() => ({}))).detail || 'Could not load admin notifications.');` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 7: source line 178; lexical line fragment `if (!response.ok) throw new Error((await response.json().catch(() => ({}))).detail || 'Could not load the audit log.');` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 8: source line 201; lexical line fragment `if (!response.ok) throw new Error((await response.json().catch(() => ({}))).detail || 'Could not load store settings.');` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 9: source line 212; lexical line fragment `if (!response.ok) throw new Error((await response.json().catch(() => ({}))).detail || 'Could not load partner shops.');` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 10: source line 227; lexical line fragment `if (!response.ok) throw new Error((await response.json().catch(() => ({}))).detail || 'Could not load delivery partners.');` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 11: source line 237; lexical line fragment `if (!response.ok) throw new Error((await response.json().catch(() => ({}))).detail || 'Could not load delivery assignments.');` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
