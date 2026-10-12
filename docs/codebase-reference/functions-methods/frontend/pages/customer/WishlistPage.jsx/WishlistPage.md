# WishlistPage (exported)

**Source identity:** `frontend/src/pages/customer/WishlistPage.jsx`, declaration at line 13  
**Declaration kind:** function declaration  
**Module report:** [WishlistPage.md](../../../../../pages/customer/WishlistPage.md)

## Signature and responsibility

- **Name:** `WishlistPage` (exported).
- **Parameters:** `{
  catalog,
  wishlist,
  add,
  addN,
  toggleWishlist,
  user,
  error = '',
  loading = false,
  reload
}`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `WishlistPage` UI render karta hai; body has 4 return statement(s) and JSX is documented in the linked module report.
  catalog,
  wishlist,
  add,
  addN,
  toggleWishlist,
  user,
  error = '',
  loading = false,
  reload
}`. Hinglish: yeh UI render karta hai; exact source return fragments neeche diye gaye hain.

## Source flow and effects

- **Flow / return:** 4 explicit return statement(s) identified.
- **Return at source:** `L30: (bare return)`
- **Return at source:** `L35: (bare return)`
- **Return at source:** `L63: ( <> <div className="pagehead"> <small>SAVED PRODUCTS</small> <h1>Your wishlist</h1> <p>Saved to your OM Stationary account - it stays on every device you sign in from.</p> </div> {showError ? ( <div className="catalog-s`
- **Return at source:** `L109: ( <> <div className="pagehead"> <small>SAVED PRODUCTS</small> <h1>Your wishlist</h1> <p>You&rsquo;re browsing as a guest. Sign in to save this wishlist to your account.</p> </div> {showError ? <div className="catalog-sta`
- **Direct call identifiers in this body:** useState, useCallback, async, setRows, setRowLoading, setRowError, getWishlist, isArray, map, useEffect, loadRows, filter, includes
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** try (1), catch (1), finally (1)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
