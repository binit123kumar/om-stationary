# LegalContent (exported)

**Source identity:** `frontend/src/pages/customer/LegalContent.jsx`, declaration at line 5  
**Declaration kind:** function declaration  
**Module report:** [LegalContent.md](../../../../../pages/customer/LegalContent.md)

## Signature and responsibility

- **Name:** `LegalContent` (exported).
- **Parameters:** `{ kind }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `LegalContent` UI render karta hai; body has 2 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L8: ( <div className="empty"> <h1>Page not found</h1> <Link className="btn" to="/">Back to home</Link> </div> )`
- **Return at source:** `L16: ( <> <div className="pagehead"> <small>OM STATIONARY</small> <h1>{doc.title}</h1> <p>{doc.intro}</p> </div> <section className="content-prose"> {doc.sections.map(([heading, paragraph]) => ( <div key={heading}> <h2>{headi`
- **Direct call identifiers in this body:** map
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/customer/PrivacyPage.jsx, pages/customer/RefundPolicyPage.jsx, pages/customer/TermsPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
