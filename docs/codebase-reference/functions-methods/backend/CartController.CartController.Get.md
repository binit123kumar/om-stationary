# CartController.Get

- **Identity:** `CartController.Get` in `backend/OMStationary.Api/Controllers/CartController.cs`.
- **Purpose (simple Hinglish):** Is method ka kaam source ke mutabik record/details ko query karke response dena hai; filters aur ownership checks source branches mein dekhein.
- **Inputs:** `public async Task<IActionResult> Get()`
- **Flow:** Calls/framework operations identified: Where, ToListAsync, Ok | Observed return paths: Ok(new { items = rows, subtotal = rows.Sum(x => x.Price * x.Quantity) })
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: Ok(new { items = rows, subtotal = rows.Sum(x => x.Price * x.Quantity) })
- **Dependencies/calls:** Where, ToListAsync, Ok
- **Endpoint:** HTTP attribute [HttpGet]; controller route [ApiController, Authorize(Roles = "Customer"), Route("api/cart")]
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** [ApiController, Authorize(Roles = "Customer"), Route("api/cart")]
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

