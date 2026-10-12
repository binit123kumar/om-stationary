# useWishlist (exported)

**Source identity:** `frontend/src/hooks/useWishlist.js`, declaration at line 9  
**Declaration kind:** function declaration  
**Module report:** [useWishlist.md](../../../../hooks-context/hooks/useWishlist.md)

## Signature and responsibility

- **Name:** `useWishlist` (exported).
- **Parameters:** `user`
- **Simple Hinglish responsibility:** Hook-shaped function. Hinglish: `useWishlist` application values/hook state ko compose karta hai; direct body calls are useState, useCallback, async, setWishlistLoading, getWishlist, setWishlist, setWishlistError, isArray, map, writeWishlist, useEffect, syncWishlistFromServer, clearWishlist, includes, filter, apiFetch, encodeURIComponent, Error.

## Source flow and effects

- **Flow / return:** 4 explicit return statement(s) identified.
- **Return at source:** `L18: (bare return)`
- **Return at source:** `L43: (bare return)`
- **Return at source:** `L48: (bare return)`
- **Return at source:** `L65: { wishlist, wishlistError, wishlistLoading, toggleWishlist, syncWishlistFromServer, clear }`
- **Direct call identifiers in this body:** useState, useCallback, async, setWishlistLoading, getWishlist, setWishlist, setWishlistError, isArray, map, writeWishlist, useEffect, syncWishlistFromServer, clearWishlist, includes, filter, apiFetch, encodeURIComponent, Error
- **Effects visible in this body:** network request, state update or dispatch
- **Error-flow markers visible in this body:** try (2), catch (2), throw (1), finally (1)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
