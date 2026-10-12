# normaliseMobile (exported)

**Source identity:** `frontend/src/utils/validation.js`, declaration at line 11  
**Declaration kind:** function declaration  
**Module report:** [validation.md](../../../../hooks-context/utils/validation.md)

## Signature and responsibility

- **Name:** `normaliseMobile` (exported).
- **Parameters:** `raw`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `normaliseMobile` body ke direct calls String, replace, startsWith, slice hain; 3 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 3 explicit return statement(s) identified.
- **Return at source:** `L13: digits.slice(2)`
- **Return at source:** `L14: digits.slice(1)`
- **Return at source:** `L15: digits`
- **Direct call identifiers in this body:** String, replace, startsWith, slice
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/auth/LoginForm.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
