# load

**Source identity:** `frontend/src/pages/admin/AdminWhatsAppPage.jsx`, declaration at line 10  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [AdminWhatsAppPage.md](../../../../../pages/admin/AdminWhatsAppPage.md)

## Signature and responsibility

- **Name:** `load` (not lexically marked exported).
- **Parameters:** `(none)`
- **Simple Hinglish responsibility:** Named helper/handler. Hinglish: `load` local action/helper hai; body calls getWhatsAppConfig, then, setError, useEffect, load, setBusy, saveWhatsAppSettings, async, sendWhatsAppTest, Error, json, retryWhatsAppNotification, patch and has state update or dispatch effect marker(s).

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** ` L10: <AdminLayout user={user} onLogout={onLogout}><div className="pagehead"><small>ADMIN PANEL</small><h1>WhatsApp</h1><p>Manage server-configured notifications and inspect delivery attempts.</p></div>{error&&<p role="alert"  `
- **Direct call identifiers in this body:** getWhatsAppConfig, then, setError, useEffect, load, setBusy, saveWhatsAppSettings, async, sendWhatsAppTest, Error, json, retryWhatsAppNotification, patch
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** try (3), catch (5), throw (2), finally (3)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
