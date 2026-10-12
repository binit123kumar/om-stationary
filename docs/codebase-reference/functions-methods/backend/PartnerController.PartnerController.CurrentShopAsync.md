# PartnerController.CurrentShopAsync

- **Identity:** `PartnerController.CurrentShopAsync` in `backend/OMStationary.Api/Controllers/PartnerController.cs`.
- **Purpose (simple Hinglish):** `CurrentShopAsync` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `private async Task<PartnerShop?> CurrentShopAsync()`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: FirstOrDefaultAsync | Observed return paths: null; null; await db.PartnerShops.AsNoTracking().FirstOrDefaultAsync(x => x.UserId == userId)
- **Output:** Declared return type `async Task<PartnerShop?>`; observed returns: null; null; await db.PartnerShops.AsNoTracking().FirstOrDefaultAsync(x => x.UserId == userId)
- **Dependencies/calls:** FirstOrDefaultAsync
- **Endpoint:** No HTTP verb attribute on this method in source; likely a helper/non-action.
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** No explicit action/controller authorization attribute; check global auth configuration in Program.cs.
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

