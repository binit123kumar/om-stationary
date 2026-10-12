# DeliveryController.Quote

- **Identity:** `DeliveryController.Quote` in `backend/OMStationary.Api/Controllers/DeliveryController.cs`.
- **Source implementation:** [`DeliveryController.cs`](../../../../backend/OMStationary.Api/Controllers/DeliveryController.cs).
- **Purpose (simple Hinglish):** Calculation/formatting helper hai; exact inputs aur returned value niche/source signature se milte hain.
- **Inputs:** `public async Task<IActionResult> Quote([FromBody] DeliveryQuoteRequest request, CancellationToken cancellationToken)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: BadRequest, Ok, Select, Where, Calculate | Observed return paths: BadRequest("A delivery quote requires Delivery as the fulfillment method."); Ok(new { available = false, reason = "Delivery is not configured yet." }); Ok(new { available = false, reason = "Delivery is not available in this city yet." }); Ok(new { available = false, reason = "Delivery is not available for this PIN code yet." }); Ok(new { available = false, reason = "Share your location to check whether a verified shop is within the delivery radius." }); Ok(new { available = false, reason = "Delivery charges are not configured." }); BadRequest("Provide each product once with its quantity."); Ok(new { available = false, reason = "One or more products are unavailable." })
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: BadRequest("A delivery quote requires Delivery as the fulfillment method."); Ok(new { available = false, reason = "Delivery is not configured yet." }); Ok(new { available = false, reason = "Delivery is not available in this city yet." }); Ok(new { available = false, reason = "Delivery is not available for this PIN code yet." }); Ok(new { available = false, reason = "Share your location to check whether a verified shop is within the delivery radius." }); Ok(new { available = false, reason = "Delivery charges are not configured." }); BadRequest("Provide each product once with its quantity."); Ok(new { available = false, reason = "One or more products are unavailable." })
- **Dependencies/calls:** BadRequest, Ok, Select, Where, Calculate
- **Endpoint:** HTTP attribute [HttpPost("quote"), EnableRateLimiting("order-writes")]; controller route [Route("api/delivery")]
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** No explicit action/controller authorization attribute; check global auth configuration in Program.cs.
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


