# InvoiceItemsTable (exported)

**Source identity:** `frontend/src/components/invoice/InvoiceItemsTable.jsx`, declaration at line 5  
**Declaration kind:** function declaration  
**Module report:** [InvoiceItemsTable.md](../../../../../components/invoice/InvoiceItemsTable.md)

## Signature and responsibility

- **Name:** `InvoiceItemsTable` (exported).
- **Parameters:** `{ lines = [], taxRatePercent = 0 }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `InvoiceItemsTable` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L6: ( <table className="invoice-table"> <thead> <tr> <th className="c-sno">S.No.</th> <th className="c-item">Item Name</th> <th className="c-sku">HSN/SKU</th> <th className="c-num">Qty</th> <th className="c-num">Rate</th> <t`
- **Direct call identifiers in this body:** GST, Number, toLocaleString, map, rupees
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/customer/InvoicePage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
