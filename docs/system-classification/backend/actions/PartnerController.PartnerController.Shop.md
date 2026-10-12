# PartnerController.Shop

- **Identity:** `PartnerController.Shop` in `backend/OMStationary.Api/Controllers/PartnerController.cs`.
- **Source implementation:** [`PartnerController.cs`](../../../../backend/OMStationary.Api/Controllers/PartnerController.cs).
- **Purpose (simple Hinglish):** `Shop` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `public async Task<IActionResult> Shop()`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: NotFound, Ok | Observed return paths: NotFound("No partner shop is linked to this account yet."); Ok(Project(shop))
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: NotFound("No partner shop is linked to this account yet."); Ok(Project(shop))
- **Dependencies/calls:** NotFound, Ok
- **Endpoint:** HTTP attribute [Authorize(Roles = "PartnerShop"), HttpGet("shop")]; controller route [ApiController, Route("api/partner")]
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** [Authorize(Roles = "PartnerShop"), HttpGet("shop")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


