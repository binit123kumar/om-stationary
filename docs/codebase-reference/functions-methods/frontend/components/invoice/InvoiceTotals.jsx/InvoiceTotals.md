# InvoiceTotals (exported)

**Source identity:** `frontend/src/components/invoice/InvoiceTotals.jsx`, declaration at line 4  
**Declaration kind:** function declaration  
**Module report:** [InvoiceTotals.md](../../../../../components/invoice/InvoiceTotals.md)

## Signature and responsibility

- **Name:** `InvoiceTotals` (exported).
- **Parameters:** `{ invoice }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `InvoiceTotals` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L5: ( <section className="invoice-totals"> <p><span>Subtotal</span><b>{rupees(invoice.subtotal)}</b></p> <p><span>Discount</span><b>&minus; {rupees(invoice.discount)}</b></p> <p><span>Taxable Value</span><b>{rupees(invoice.t`
- **Direct call identifiers in this body:** rupees, Number, toLocaleString
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/customer/InvoicePage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
