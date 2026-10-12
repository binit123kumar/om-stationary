# OrdersController.Get(orderNumber)

- **Identity:** `OrdersController.Get(string orderNumber)` in `backend/OMStationary.Api/Controllers/OrdersController.cs`.
- **Purpose (simple Hinglish):** Is method ka kaam source ke mutabik record/details ko query karke response dena hai; filters aur ownership checks source branches mein dekhein.
- **Inputs:** `public async Task<IActionResult> Get()`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Ok, Include, OrderByDescending, Select, NextStatuses, ToListAsync | Observed return paths: AdminRequired(); Ok(await db.Orders.AsNoTracking().Include(x => x.Items).OrderByDescending(x => x.CreatedAt).Select(x => new
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: AdminRequired(); Ok(await db.Orders.AsNoTracking().Include(x => x.Items).OrderByDescending(x => x.CreatedAt).Select(x => new
- **Dependencies/calls:** Ok, Include, OrderByDescending, Select, NextStatuses, ToListAsync
- **Endpoint:** HTTP attribute [HttpGet]; controller route [Route("api/orders")]
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** No explicit action/controller authorization attribute; check global auth configuration in Program.cs.
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.
