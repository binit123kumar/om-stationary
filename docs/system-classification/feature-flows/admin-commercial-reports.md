# Admin coupons, payments, invoices, and reports

## Flow chain

| Admin surface | Frontend chain and HTTP | Backend/data |
|---|---|---|
| Coupons `/admin/coupons` | `AdminCouponsPage` → `adminService.listAdminCoupons`, `createCoupon`, `updateCoupon`; `GET /api/admin/coupons`, `POST /api/coupons`, `PUT /api/admin/coupons/{id}`. Customer validation is shared at `POST /api/coupons/validate`. | `AdminCouponsController`, `CouponsController`, `CouponService`; `Coupon` → `Coupons`, usage and order totals → `Orders`. |
| Payments `/admin/payments` | `AdminPaymentsPage` → `listAdminPayments`; `GET /api/admin/payments` with optional filters. | `AdminReportsController.Payments`; reads `Payments` and associated `Orders`. |
| Invoices `/admin/invoices` | `AdminInvoicesPage` → `listAdminInvoices`; `GET /api/admin/invoices` with query filters. This is an admin list endpoint, not the customer invoice-document URL. | `AdminReportsController.Invoices`; `Invoice`/`InvoiceLine` → `Invoices`/`InvoiceLines`, with order/customer fields. |
| Reports `/admin/reports` | `AdminReportsPage` → `getReport`, `exportReport`, `getAnalytics`, `getFilterOptions`; `GET /api/admin/reports`, `/api/admin/reports/export`, `/api/admin/analytics`, `/api/admin/filter-options`. | `AdminReportsController` produces data/report export; `AdminController.Dashboard` supplies `/api/admin/dashboard` KPI aggregates. Reads `Orders`, `OrderItems`, `Products`, `Users`, `Payments`, `Invoices`, `Wishlists`, etc. as the report requires. |

## Shared endpoints / response path

Coupon creation is a POST to `/api/coupons` (controller-level Admin authorization), while subsequent admin edits/listing use the `/api/admin/coupons` controller; customer validation is a public endpoint. Coupon service validates time window, limits, minimum spend, discount type/value and redemption. Bad request/duplicate code responses are surfaced as UI errors. Payment/invoice/report lists return JSON from admin-only endpoints; report export is an HTTP response handled by the page. No data is inferred from chart labels: backend aggregates are the source when present.

## Tests and status

- **Tests:** No coupon/payment/invoice/report controller integration tests were found (**NOT_MAPPED**). `OrderStateMachineTests` concerns order state transitions only.
- **Source status:** **Confirmed** from [adminService.js](../../../frontend/src/services/adminService.js), [AdminReportsController.cs](../../../backend/OMStationary.Api/Controllers/AdminReportsController.cs), [AdminCatalogueController.cs](../../../backend/OMStationary.Api/Controllers/AdminCatalogueController.cs), [CouponsController.cs](../../../backend/OMStationary.Api/Controllers/CouponsController.cs), [CouponService.cs](../../../backend/OMStationary.Api/Services/CouponService.cs), and [OmDbContext.cs](../../../backend/OMStationary.Api/Data/OmDbContext.cs).
- **Runtime status:** **Unverified.** No live report query/export, coupon redemption, payment listing, or invoice-list response was exercised.
