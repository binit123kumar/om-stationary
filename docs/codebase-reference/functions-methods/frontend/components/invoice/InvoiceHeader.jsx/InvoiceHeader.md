# InvoiceHeader (exported)

**Source identity:** `frontend/src/components/invoice/InvoiceHeader.jsx`, declaration at line 2  
**Declaration kind:** function declaration  
**Module report:** [InvoiceHeader.md](../../../../../components/invoice/InvoiceHeader.md)

## Signature and responsibility

- **Name:** `InvoiceHeader` (exported).
- **Parameters:** `{ invoice, seller }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `InvoiceHeader` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** ` L3: ( <header className="invoice-header"> <div className="invoice-seller"> <div className="invoice-logo">OM<span>.</span></div> <b>{(seller.businessName || 'OM STATIONARY').toUpperCase()}</b> <small>Everything You Need, One  `
- **Direct call identifiers in this body:** toUpperCase, Date, toLocaleString
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/customer/InvoicePage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
