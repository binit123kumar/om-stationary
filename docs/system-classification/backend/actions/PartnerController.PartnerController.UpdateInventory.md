# PartnerController.UpdateInventory

- **Identity:** `PartnerController.UpdateInventory` in `backend/OMStationary.Api/Controllers/PartnerController.cs`.
- **Source implementation:** [`PartnerController.cs`](../../../../backend/OMStationary.Api/Controllers/PartnerController.cs).
- **Purpose (simple Hinglish):** Existing state ya collection ko source rules ke mutabik update karna hai; exact target/conditions source flow mein defined hain.
- **Inputs:** `public async Task<IActionResult> UpdateInventory([FromBody] ShopInventoryRequest request)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: NotFound, FirstOrDefaultAsync, BadRequest, SaveChangesAsync, Ok | Observed return paths: NotFound("No partner shop is linked to this account yet."); NotFound("This product is not listed in your shop inventory."); BadRequest(new { detail = "Selling price must be greater than zero." }); Ok(new { row.ProductId, row.SellingPrice, row.Stock, row.IsAvailable })
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: NotFound("No partner shop is linked to this account yet."); NotFound("This product is not listed in your shop inventory."); BadRequest(new { detail = "Selling price must be greater than zero." }); Ok(new { row.ProductId, row.SellingPrice, row.Stock, row.IsAvailable })
- **Dependencies/calls:** NotFound, FirstOrDefaultAsync, BadRequest, SaveChangesAsync, Ok
- **Endpoint:** HTTP attribute [Authorize(Roles = "PartnerShop"), HttpPut("inventory")]; controller route [ApiController, Route("api/partner")]
- **Data/external effects:** persist EF changes via SaveChanges
- **Security:** [Authorize(Roles = "PartnerShop"), HttpPut("inventory")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


