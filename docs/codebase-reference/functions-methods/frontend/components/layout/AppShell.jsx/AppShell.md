# AppShell (exported)

**Source identity:** `frontend/src/components/layout/AppShell.jsx`, declaration at line 14  
**Declaration kind:** function declaration  
**Module report:** [AppShell.md](../../../../../components/layout/AppShell.md)

## Signature and responsibility

- **Name:** `AppShell` (exported).
- **Parameters:** `(none)`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `AppShell` UI render karta hai; body has 14 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 14 explicit return statement(s) identified.
- **Return at source:** `L23: Array.isArray(saved) ? saved : []`
- **Return at source:** `L24: []`
- **Return at source:** `L32: (bare return)`
- **Return at source:** `L55: (bare return)`
- **Return at source:** `L58: (bare return)`
- **Return at source:** `L72: Array.isArray(saved) ? saved : []`
- **Return at source:** `L73: []`
- **Return at source:** `L79: undefined`
- **Return at source:** `L87: () => { active = false; }`
- **Return at source:** `L90: undefined`
- **Return at source:** `L95: () => clearTimeout(timer)`
- **Return at source:** `L114: existing ? current.map((item) => item.id === product.id ? { ...item, q: Math.min(99, item.q + 1) } : item) : [...current, { ...product, q: 1 }]`
- **Return at source:** `L122: existing ? current.map((item) => item.id === product.id ? { ...item, q: Math.min(99, item.q + quantity) } : item) : [...current, { ...product, q: quantity }]`
- **Return at source:** `L136: ( <AppShellContext.Provider value={context}> <Header user={user} catalog={catalog} cartCount={cart.reduce((sum, item) => sum + item.q, 0)} wishlistCount={wishlist.length} unreadCount={notifications.unread} /> <main><Outl`
- **Direct call identifiers in this body:** useCatalog, useCategories, useState, readSession, useNotifications, parse, getItem, isArray, useCallback, async, setWishlistLoading, apiFetch, setWishlist, setWishlistError, Error, json, map, setItem, stringify, useEffect, syncWishlistFromServer, removeItem, includes, filter, warn, setCartReady, then, setCart, mapServerCart, setTimeout
- **Effects visible in this body:** network request, browser storage, state update or dispatch, browser/console global
- **Error-flow markers visible in this body:** try (6), catch (8), throw (3), finally (1)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
