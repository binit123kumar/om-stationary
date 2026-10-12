# OrderMessages.NewOrder

- **Identity:** `OrderMessages.NewOrder` in `backend/OMStationary.Api/Services/WhatsAppNotificationService.cs`.
- **Source implementation:** [`WhatsAppNotificationService.cs`](../../../../../backend/OMStationary.Api/Services/WhatsAppNotificationService.cs).
- **Purpose (simple Hinglish):** Builds the WhatsApp new-order message from order, customer, item, price, and fulfillment details. Its `itemNumber` local prefixes each rendered order line.
- **Inputs:** `public static string NewOrder(Order o)`
- **Flow:** Branch checks: !string.IsNullOrWhiteSpace(o.CustomerEmail)) b.Field("Email", o.CustomerEmail; !string.IsNullOrWhiteSpace(o.City)) b.Line(o.City; !string.IsNullOrWhiteSpace(o.Pincode)) b.Line("PIN " + o.Pincode | Observed return paths: b.ToString()
- **Output:** Declared return type `static string`; observed returns: b.ToString()
- **Dependencies/calls:** No recognized framework/service call token; inspect source for indirect dependencies.
- **Endpoint:** Not an HTTP controller action.
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** Not an HTTP endpoint; method-level authorization attribute not identified.
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

