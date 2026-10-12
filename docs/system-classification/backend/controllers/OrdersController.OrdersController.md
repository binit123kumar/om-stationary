# OrdersController

- **Identity:** `class OrdersController` in `backend/OMStationary.Api/Controllers/OrdersController.cs`.
- **Source implementation:** [`OrdersController.cs`](../../../../backend/OMStationary.Api/Controllers/OrdersController.cs).
- **Purpose (simple Hinglish):** Yeh `OrdersController` HTTP controller or controller support type hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** OmDbContext db, IConfiguration configuration, FulfillmentSelectionService fulfillment, ICodPaymentProvider codPayments, CouponService coupons, InvoiceService invoices, NotificationService notifications, IWhatsAppNotificationService whatsapp, StockAlertService stockAlerts, StoreSettingsService storeSettings, SettlementService settlements, IEmailNotificationService emailNotifications, ISmsNotificationService smsNotifications
- **Routes/security attributes:** [ApiController] [Route("api/orders")]
- **Declared properties:** No public property/expression property parsed.
- **Named callable methods:** IsAdmin, AdminRequired, Get, StatusWorkflow, GetInvoice, GetInvoicePdf, MayViewOrder, NumberToWords, RupeesInWords, IndianGroup, Thousand, Lakh, Crore, Create, Status, PaymentStatus, AssignDelivery
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.

