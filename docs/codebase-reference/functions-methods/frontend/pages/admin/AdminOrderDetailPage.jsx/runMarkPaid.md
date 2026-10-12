# runMarkPaid

**Source identity:** `frontend/src/pages/admin/AdminOrderDetailPage.jsx`, declaration at line 88  
**Declaration kind:** named arrow/function-valued variable  
**Module report:** [AdminOrderDetailPage.md](../../../../../pages/admin/AdminOrderDetailPage.md)

## Signature and responsibility

- **Name:** `runMarkPaid` (not lexically marked exported).
- **Parameters:** `(none)`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `runMarkPaid` body ke direct calls setMessage, setError, confirmOrderPayment, json, Error, load hain; 0 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** No explicit return statement identified in the extracted body.
- **Direct call identifiers in this body:** setMessage, setError, confirmOrderPayment, json, Error, load
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** try (1), catch (1), throw (1)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
