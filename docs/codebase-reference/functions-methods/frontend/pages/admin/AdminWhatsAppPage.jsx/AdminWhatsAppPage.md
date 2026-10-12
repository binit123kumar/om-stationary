# AdminWhatsAppPage (exported)

**Source identity:** `frontend/src/pages/admin/AdminWhatsAppPage.jsx`, declaration at line 10  
**Declaration kind:** function declaration  
**Module report:** [AdminWhatsAppPage.md](../../../../../pages/admin/AdminWhatsAppPage.md)

## Signature and responsibility

- **Name:** `AdminWhatsAppPage` (exported).
- **Parameters:** `{user,onLogout}`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `AdminWhatsAppPage` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** ` L10: <AdminLayout user={user} onLogout={onLogout}><div className="pagehead"><small>ADMIN PANEL</small><h1>WhatsApp</h1><p>Manage server-configured notifications and inspect delivery attempts.</p></div>{error&&<p role="alert"  `
- **Direct call identifiers in this body:** useState, adminHeaders, readSession, getWhatsAppConfig, then, setError, useEffect, load, setBusy, saveWhatsAppSettings, async, sendWhatsAppTest, Error, json, retryWhatsAppNotification, patch
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** try (3), catch (5), throw (2), finally (3)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
