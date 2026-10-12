# DeliveryQuote (exported)

**Source identity:** `frontend/src/components/checkout/DeliveryQuote.jsx`, declaration at line 3  
**Declaration kind:** function declaration  
**Module report:** [DeliveryQuote.md](../../../../../components/checkout/DeliveryQuote.md)

## Signature and responsibility

- **Name:** `DeliveryQuote` (exported).
- **Parameters:** `{ quote, error }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `DeliveryQuote` UI render karta hai; body has 3 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 3 explicit return statement(s) identified.
- **Return at source:** `L4: null`
- **Return at source:** `L6: <p className="quote-bad" role="status">{error}</p>`
- **Return at source:** `L8: ( <p className="quote-ok"> Delivery available &middot; charge quoted &middot; stock verified </p> )`
- **Direct call identifiers in this body:** None identified by lexical scan.
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
