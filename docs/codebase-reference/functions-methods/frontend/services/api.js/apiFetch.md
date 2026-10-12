# apiFetch (exported)

**Source identity:** `frontend/src/services/api.js`, declaration at line 6  
**Declaration kind:** function declaration  
**Module report:** [api.md](../../../../services/api.md)

## Signature and responsibility

- **Name:** `apiFetch` (exported).
- **Parameters:** `path, options = {}, tokenOverride = null`
- **Simple Hinglish responsibility:** Common API client. Hinglish: session token padhta hai, Authorization header banata hai, request bhejta hai; 401 aur refresh token hone par session refresh karke retry karta hai.

## Source flow and effects

- **Flow / return:** 3 explicit return statement(s) identified.
- **Return at source:** ``L11: fetch(path.startsWith('http') ? path : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${path}`, { ...options, headers })``
- **Return at source:** `L14: response`
- **Return at source:** `L16: nextSession?.accessToken ? send(nextSession.accessToken) : response`
- **Direct call identifiers in this body:** readSession, Headers, set, fetch, startsWith, send, refreshSession
- **Effects visible in this body:** network request
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/layout/AppShell.jsx, hooks/useAdmin.js, hooks/useCart.js, hooks/useOrders.js, hooks/useWishlist.js, pages/customer/AccountPage.jsx, pages/customer/CheckoutPage.jsx, services/adminService.js, services/authService.js, services/cartService.js, services/deliveryService.js, services/invoiceService.js, services/notificationService.js, services/orderService.js, services/partnerService.js, services/paymentService.js, services/productService.js, services/whatsappService.js, services/wishlistService.js

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
