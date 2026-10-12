# WhatsAppTestButton (exported)

**Source identity:** `frontend/src/components/whatsapp/WhatsAppTestButton.jsx`, declaration at line 3  
**Declaration kind:** function declaration  
**Module report:** [WhatsAppTestButton.md](../../../../../components/whatsapp/WhatsAppTestButton.md)

## Signature and responsibility

- **Name:** `WhatsAppTestButton` (exported).
- **Parameters:** `{ busy, configured, onSend }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `WhatsAppTestButton` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L4: ( <button className="btn" onClick={onSend} disabled={busy || !configured} title={configured ? 'Send a test message to the configured admin number' : 'Available once WhatsApp is configured'} > {busy ? 'Sending…' : 'Send t`
- **Direct call identifiers in this body:** None identified by lexical scan.
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/admin/AdminWhatsAppPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
