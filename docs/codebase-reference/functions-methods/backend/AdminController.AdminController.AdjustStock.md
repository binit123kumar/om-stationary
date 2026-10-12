# AdminController.AdjustStock

- **Identity:** `AdminController.AdjustStock` in `backend/OMStationary.Api/Controllers/AdminController.cs`.
- **Purpose (simple Hinglish):** Existing state ya collection ko source rules ke mutabik update karna hai; exact target/conditions source flow mein defined hain.
- **Inputs:** `public async Task<IActionResult> AdjustStock(int id, StockAdjustmentRequest request)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: NotFound, BadRequest, Add, SaveChangesAsync, Ok | Observed return paths: NotFound(); BadRequest(new { detail = "Stock cannot be reduced below zero." }); Ok(new { product.Id, product.Stock, product.LowStockThreshold, lowStock = product.Stock <= product.LowStockThreshold })
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: NotFound(); BadRequest(new { detail = "Stock cannot be reduced below zero." }); Ok(new { product.Id, product.Stock, product.LowStockThreshold, lowStock = product.Stock <= product.LowStockThreshold })
- **Dependencies/calls:** NotFound, BadRequest, Add, SaveChangesAsync, Ok
- **Endpoint:** HTTP attribute [HttpPost("products/{id:int}/stock")]; controller route [ApiController, Authorize(Roles = "Admin"), Route("api/admin")]
- **Data/external effects:** Add row(s) in AuditLogs, persist EF changes via SaveChanges
- **Security:** [ApiController, Authorize(Roles = "Admin"), Route("api/admin")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

