# markNotificationRead (exported)

**Source identity:** `frontend/src/services/notificationService.js`, declaration at line 10  
**Declaration kind:** function declaration  
**Module report:** [notificationService.md](../../../../services/notificationService.md)

## Signature and responsibility

- **Name:** `markNotificationRead` (exported).
- **Parameters:** `id`
- **Simple Hinglish responsibility:** Named helper/handler. Hinglish: `markNotificationRead` local action/helper hai; body calls apiFetch and has network request effect marker(s).

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** ``L11: apiFetch(`/api/notifications/${encodeURIComponent(id)}/read`, { method: 'POST' })``
- **Direct call identifiers in this body:** apiFetch
- **Effects visible in this body:** network request
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/customer/NotificationsPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
