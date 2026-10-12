# InvoiceActions (exported)

**Source identity:** `frontend/src/components/invoice/InvoiceActions.jsx`, declaration at line 5  
**Declaration kind:** function declaration  
**Module report:** [InvoiceActions.md](../../../../../components/invoice/InvoiceActions.md)

## Signature and responsibility

- **Name:** `InvoiceActions` (exported).
- **Parameters:** `{ invoiceNumber, downloading, onDownload }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `InvoiceActions` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** ``L6: ( <div className="invoice-actions"> <div className="invoice-actions-left"> <Link className="outline" to="/orders"> <ArrowLeft size={16} /> Back to order </Link> <Link className="outline" to={`/track/${encodeURIComponent(``
- **Direct call identifiers in this body:** print
- **Effects visible in this body:** browser/console global
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/customer/InvoicePage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
