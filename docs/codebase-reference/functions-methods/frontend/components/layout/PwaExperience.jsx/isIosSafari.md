# isIosSafari

**Source identity:** `frontend/src/components/layout/PwaExperience.jsx`, declaration at line 3  
**Declaration kind:** function declaration  
**Module report:** [PwaExperience.md](../../../../../components/layout/PwaExperience.md)

## Signature and responsibility

- **Name:** `isIosSafari` (not lexically marked exported).
- **Parameters:** `(none)`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `isIosSafari` body ke direct calls test hain; 1 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L7: isAppleMobile && /Safari/.test(userAgent) && !/CriOS|FxiOS|EdgiOS/.test(userAgent)`
- **Direct call identifiers in this body:** test
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
