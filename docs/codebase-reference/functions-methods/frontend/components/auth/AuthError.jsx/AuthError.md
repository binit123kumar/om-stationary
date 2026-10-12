# AuthError (exported)

**Source identity:** `frontend/src/components/auth/AuthError.jsx`, declaration at line 2  
**Declaration kind:** function declaration  
**Module report:** [AuthError.md](../../../../../components/auth/AuthError.md)

## Signature and responsibility

- **Name:** `AuthError` (exported).
- **Parameters:** `{ message }`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `AuthError` body ke direct calls none identified hain; 2 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L3: null`
- **Return at source:** `L4: <p className="form-error" role="alert">{message}</p>`
- **Direct call identifiers in this body:** None identified by lexical scan.
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/auth/LoginForm.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
