# downloadPdf

**Source identity:** `frontend/src/pages/customer/InvoicePage.jsx`, declaration at line 58  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [InvoicePage.md](../../../../../pages/customer/InvoicePage.md)

## Signature and responsibility

- **Name:** `downloadPdf` (not lexically marked exported).
- **Parameters:** `(none)`
- **Simple Hinglish responsibility:** Named helper/handler. Hinglish: `downloadPdf` local action/helper hai; body calls setDownloading, setDownloadError, downloadInvoicePdf, readTrackingToken, json, Error, blob, createObjectURL, createElement, appendChild, click, remove, revokeObjectURL and has state update or dispatch, browser/console global effect marker(s).

## Source flow and effects

- **Flow / return:** No explicit return statement identified in the extracted body.
- **Direct call identifiers in this body:** setDownloading, setDownloadError, downloadInvoicePdf, readTrackingToken, json, Error, blob, createObjectURL, createElement, appendChild, click, remove, revokeObjectURL
- **Effects visible in this body:** state update or dispatch, browser/console global
- **Error-flow markers visible in this body:** try (1), catch (2), throw (1), finally (1)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
