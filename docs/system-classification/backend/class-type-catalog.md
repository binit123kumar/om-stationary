# Backend class and type catalog

This catalog identifies declarations in the backend source. Individual controller/service/type descriptions are linked from the existing [backend reference index](../../codebase-reference/backend/_index.md); the links do not replace the corresponding source.

## Controllers

There are 21 controller declarations in 19 source files. Shared source files are called out explicitly. Individual source-linked class reports are indexed under [controllers](controllers/_index.md). Each action has a separate source-linked report under [actions](actions/); the [endpoint inventory](../evidence/endpoint-inventory.md) links each route to its report.

| Source | Controller class(es) |
|---|---|
| `Controllers/AdminCatalogueController.cs` | `AdminOrdersController`, `AdminCategoriesController`, `AdminCouponsController` |
| `Controllers/AdminController.cs` | `AdminController` |
| `Controllers/AdminReportsController.cs` | `AdminReportsController` |
| `Controllers/AdminSettingsController.cs` | `AdminSettingsController` |
| `Controllers/AdminWhatsAppController.cs` | `AdminWhatsAppController` |
| `Controllers/AuthController.cs` | `AuthController` |
| `Controllers/CartController.cs` | `CartController` |
| `Controllers/CategoriesController.cs` | `CategoriesController` |
| `Controllers/CouponsController.cs` | `CouponsController` |
| `Controllers/CustomersController.cs` | `CustomersController` |
| `Controllers/DeliveryController.cs` | `DeliveryController` |
| `Controllers/DeliveryOperationsController.cs` | `DeliveryOperationsController` |
| `Controllers/LocationsController.cs` | `LocationsController` |
| `Controllers/NotificationsController.cs` | `NotificationsController` |
| `Controllers/OrdersController.cs` | `OrdersController` |
| `Controllers/PartnerController.cs` | `PartnerController` |
| `Controllers/PaymentsController.cs` | `PaymentsController` |
| `Controllers/ProductsController.cs` | `ProductsController` |
| `Controllers/WishlistController.cs` | `WishlistController` |

Each class's declared route prefix, action attributes, and role attributes are shown in the [endpoint inventory](../evidence/endpoint-inventory.md). The matching source methods and return/data-access details are linked row by row.

## Services and backend support types

The 17 source files under `backend/OMStationary.Api/Services/` contain service classes, interfaces, options/results, providers, and helper types. Individual method and type reports are in the [local services index](services/_index.md); existing [codebase-reference service reports](../../codebase-reference/backend/_index.md#services) are secondary navigation only. This list follows source-file boundaries rather than pretending every file contains exactly one type:

`CouponService`, `EmailNotificationService`, `FulfillmentSelection`, `GeoDistance`, `InvoiceService`, `JwtAuthenticationHandler`, `NotificationService`, `OrderStateMachine`, `PaymentProviders`, `PaytmQrPaymentGateway`, `SettlementService`, `SmsNotificationService`, `StockAlertService`, `StoreSettingsService`, `TaxCalculator`, `TokenService`, `WhatsAppNotificationService`.

Data and startup support types are described under [Data access](../../codebase-reference/backend/_index.md#data-access) and [Program startup](../../codebase-reference/backend/Program.cs.md).

## Entity, DTO, and request/response types

- `Models/Models.cs` declares 30 DbSet-backed entity classes and the `WhatsAppNotificationTypes` / `WhatsAppNotificationStatuses` static constant classes. Each entity has an individual [table/column report](../database/_index.md#declared-entity-tables).
- The two notification constant types have individual reports under [model types](types/models/).
- Three DTO source files declare request/response shapes. The local [DTO type index](types/dtos/_index.md) links each of 23 source-linked request/response type reports.
- EF entity declarations, configured relationships, and fields without explicit relationships are distinguished in [database relationships and mapping notes](../database/relationships.md).

## Tests

The two test files contain 14 `[Fact]` methods and a recording HTTP handler helper. See the local [test inventory](tests.md) for method names and source paths. All are **NOT TESTED** during this documentation task.
