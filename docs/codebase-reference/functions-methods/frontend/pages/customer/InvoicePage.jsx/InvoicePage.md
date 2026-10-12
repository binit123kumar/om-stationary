# InvoicePage (exported)

**Source identity:** `frontend/src/pages/customer/InvoicePage.jsx`, declaration at line 21  
**Declaration kind:** function declaration  
**Module report:** [InvoicePage.md](../../../../../pages/customer/InvoicePage.md)

## Signature and responsibility

- **Name:** `InvoicePage` (exported).
- **Parameters:** `(none)`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `InvoicePage` UI render karta hai; body has 6 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 6 explicit return statement(s) identified.
- **Return at source:** `L42: response.json()`
- **Return at source:** `L47: () => { active = false; }`
- **Return at source:** `L83: <div className="catalog-state">Preparing your invoice…</div>`
- **Return at source:** `L86: ( <div className="empty"> <Receipt size={44} /> <h1>Invoice unavailable</h1> <p>{error}</p> <Link className="btn" to="/orders">Go to orders</Link> <Link className="outline" to="/search">Continue shopping</Link> </div> )`
- **Return at source:** `L98: ( <div className="empty"> <Receipt size={44} /> <h1>Invoice unavailable</h1> <Link className="btn" to="/orders">Go to orders</Link> </div> )`
- **Return at source:** `L112: ( <section className="invoice-page"> <InvoiceActions invoiceNumber={invoice.orderNumber || id} downloading={downloading} onDownload={downloadPdf} /> {downloadError && <p className="form-error" role="alert">{downloadError`
- **Direct call identifiers in this body:** useParams, useState, useEffect, setLoading, setError, getInvoice, readTrackingToken, then, async, Error, json, setInvoice, finally, useMemo, String, toLowerCase, setDownloading, setDownloadError, downloadInvoicePdf, blob, createObjectURL, createElement, appendChild, click, remove, revokeObjectURL, Date, toLocaleDateString, paymentLabel
- **Effects visible in this body:** state update or dispatch, browser/console global
- **Error-flow markers visible in this body:** try (1), catch (4), throw (3), finally (2)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
