# NotificationList (exported)

**Source identity:** `frontend/src/components/notifications/NotificationList.jsx`, declaration at line 38  
**Declaration kind:** function declaration  
**Module report:** [NotificationList.md](../../../../../components/notifications/NotificationList.md)

## Signature and responsibility

- **Name:** `NotificationList` (exported).
- **Parameters:** `{ notifications = [], onMarkRead }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `NotificationList` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L39: ( <div className="notification-list"> {notifications.map((notification) => ( <NotificationItem key={notification.id} notification={notification} onMarkRead={onMarkRead} /> ))} </div> )`
- **Direct call identifiers in this body:** map
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/customer/NotificationsPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
