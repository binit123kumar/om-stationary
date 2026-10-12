# ProductsController.Get(catalog-query)

- **Identity:** `ProductsController.Get(catalog-query parameters)` in `backend/OMStationary.Api/Controllers/ProductsController.cs`.
- **Purpose (simple Hinglish):** Is method ka kaam source ke mutabik record/details ko query karke response dena hai; filters aur ownership checks source branches mein dekhein.
- **Inputs:** `public async Task<IActionResult> Get([FromQuery]string? q=null,[FromQuery]string? category=null,[FromQuery]string? sort=null,
        [FromQuery]string? brand=null,[FromQuery]string? sku=null,[FromQuery]decimal? minPrice=null,[FromQuery]decimal? maxPrice=null,
        [FromQuery]bool? available=null,[FromQuery]int page=1,[FromQuery]int pageSize=24,[FromQuery]bool paginated=false)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Where, OrderBy, OrderByDescending, BadRequest, Ok, Take, ToListAsync, CountAsync, Skip | Observed return paths: BadRequest("Page must be positive and page size must be between 1 and 100."); Ok(await query.Take(100).ToListAsync()); Ok(new { items=await query.Skip((page-1)*pageSize).Take(pageSize).ToListAsync(), total, page, pageSize })
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: BadRequest("Page must be positive and page size must be between 1 and 100."); Ok(await query.Take(100).ToListAsync()); Ok(new { items=await query.Skip((page-1)*pageSize).Take(pageSize).ToListAsync(), total, page, pageSize })
- **Dependencies/calls:** Where, OrderBy, OrderByDescending, BadRequest, Ok, Take, ToListAsync, CountAsync, Skip
- **Endpoint:** HTTP attribute [HttpGet]; controller route [Route("api/products")]
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** No explicit action/controller authorization attribute; check global auth configuration in Program.cs.
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.
