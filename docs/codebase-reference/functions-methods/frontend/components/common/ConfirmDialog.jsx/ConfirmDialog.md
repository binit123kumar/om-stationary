# ConfirmDialog (exported)

**Source identity:** `frontend/src/components/common/ConfirmDialog.jsx`, declaration at line 4  
**Declaration kind:** function declaration  
**Module report:** [ConfirmDialog.md](../../../../../components/common/ConfirmDialog.md)

## Signature and responsibility

- **Name:** `ConfirmDialog` (exported).
- **Parameters:** `{ open, title = 'Please confirm', message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', danger = false, busy = false, onConfirm, onCancel }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `ConfirmDialog` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L5: ( <Modal open={open} onClose={onCancel} title={title}> <p>{message}</p> <div className="confirm-actions"> <button type="button" className="outline" onClick={onCancel} disabled={busy}> {cancelLabel} </button> <button type`
- **Direct call identifiers in this body:** None identified by lexical scan.
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/admin/AdminConfirmDialog.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
