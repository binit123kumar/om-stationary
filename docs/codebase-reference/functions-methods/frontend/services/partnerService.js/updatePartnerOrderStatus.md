# updatePartnerOrderStatus (exported)

**Source identity:** `frontend/src/services/partnerService.js`, declaration at line 34  
**Declaration kind:** function declaration  
**Module report:** [partnerService.md](../../../../services/partnerService.md)

## Signature and responsibility

- **Name:** `updatePartnerOrderStatus` (exported).
- **Parameters:** `id, status`
- **Simple Hinglish responsibility:** Named helper/handler. Hinglish: `updatePartnerOrderStatus` local action/helper hai; body calls apiFetch, stringify and has network request effect marker(s).

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** ``L35: apiFetch(`/api/partner/orders/${encodeURIComponent(id)}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })``
- **Direct call identifiers in this body:** apiFetch, stringify
- **Effects visible in this body:** network request
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** hooks/usePartner.js

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
