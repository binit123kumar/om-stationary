# WhatsAppSettingsForm (exported)

**Source identity:** `frontend/src/components/whatsapp/WhatsAppSettingsForm.jsx`, declaration at line 2  
**Declaration kind:** function declaration  
**Module report:** [WhatsAppSettingsForm.md](../../../../../components/whatsapp/WhatsAppSettingsForm.md)

## Signature and responsibility

- **Name:** `WhatsAppSettingsForm` (exported).
- **Parameters:** `{ config, busy, onToggleEnabled, onToggleEvent }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `WhatsAppSettingsForm` UI render karta hai; body has 2 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L3: null`
- **Return at source:** ` L12: ( <div className="wa-controls"> <label className="wa-toggle"> <input type="checkbox" checked={config.configuration?.enabled} disabled={busy} onChange={(event) => onToggleEnabled(event.target.checked)} /> Enable WhatsApp  `
- **Direct call identifiers in this body:** onToggleEnabled, map, onToggleEvent
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/admin/AdminWhatsAppPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
