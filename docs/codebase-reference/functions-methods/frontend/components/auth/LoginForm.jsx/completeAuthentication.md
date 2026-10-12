# completeAuthentication

**Source identity:** `frontend/src/components/auth/LoginForm.jsx`, declaration at line 55  
**Signature:** `async completeAuthentication(authSession)`

Persists the API-returned session, converts any guest cart rows and sends them through `mergeGuestCart`, maps the accepted server cart, or fetches the current server cart after a rejected sync. It then calls `onAuth` with the authenticated user and cart and returns that cart. Hinglish: login/register ke baad session save karke guest cart ko server cart ke saath synchronize karta hai.

**Effects:** Session storage via `saveSession`, guest-cart localStorage read, HTTP requests, and parent auth callback.
**Contract:** Existing auth session and cart payloads, endpoints, and callback shape are unchanged.
**Validation:** Frontend production build passed; no frontend test suite is configured.

API and persistence behavior are not runtime-verified by this report.
