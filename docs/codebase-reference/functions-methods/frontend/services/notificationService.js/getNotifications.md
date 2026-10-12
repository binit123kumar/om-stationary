# getNotifications (exported)

**Source identity:** `frontend/src/services/notificationService.js`, declaration at line 4  
**Declaration kind:** function declaration  
**Module report:** [notificationService.md](../../../../services/notificationService.md)

## Signature and responsibility

- **Name:** `getNotifications` (exported).
- **Parameters:** `take = 30`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `getNotifications` body ke direct calls apiFetch, json hain; 2 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L6: { unread: 0, items: [] }`
- **Return at source:** `L7: response.json()`
- **Direct call identifiers in this body:** apiFetch, json
- **Effects visible in this body:** network request
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** hooks/useNotifications.js, pages/customer/NotificationsPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
