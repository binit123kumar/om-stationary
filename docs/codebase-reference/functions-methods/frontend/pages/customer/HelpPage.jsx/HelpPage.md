# HelpPage (exported)

**Source identity:** `frontend/src/pages/customer/HelpPage.jsx`, declaration at line 20  
**Declaration kind:** function declaration  
**Module report:** [HelpPage.md](../../../../../pages/customer/HelpPage.md)

## Signature and responsibility

- **Name:** `HelpPage` (exported).
- **Parameters:** `(none)`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `HelpPage` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L23: ( <> <div className="pagehead"> <small>HELP &amp; SUPPORT</small> <h1>Frequently asked questions</h1> <p>Answers to the questions we are asked most often.</p> </div> <div className="faq-list"> {FAQS.map(([question, answe`
- **Direct call identifiers in this body:** useState, map, setOpen
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
