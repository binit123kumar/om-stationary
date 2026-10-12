# WhatsAppEventList (exported)

**Source identity:** `frontend/src/components/whatsapp/WhatsAppEventList.jsx`, declaration at line 2  
**Declaration kind:** function declaration  
**Module report:** [WhatsAppEventList.md](../../../../../components/whatsapp/WhatsAppEventList.md)

## Signature and responsibility

- **Name:** `WhatsAppEventList` (exported).
- **Parameters:** `{ config }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `WhatsAppEventList` UI render karta hai; body has 2 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L3: null`
- **Return at source:** `L7: ( <div className="rowhead"> <h3>Notification log</h3> <span> {config.total ?? log.length} total {' '}&middot; {count('Sent')} sent {' '}&middot; {count('Failed')} failed {' '}&middot; {count('NotConfigured')} not configu`
- **Direct call identifiers in this body:** filter, count
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
