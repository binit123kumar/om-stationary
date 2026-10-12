# useNotifications (exported)

**Source identity:** `frontend/src/hooks/useNotifications.js`, declaration at line 7  
**Declaration kind:** function declaration  
**Module report:** [useNotifications.md](../../../../hooks-context/hooks/useNotifications.md)

## Signature and responsibility

- **Name:** `useNotifications` (exported).
- **Parameters:** `user`
- **Simple Hinglish responsibility:** Hook-shaped function. Hinglish: `useNotifications` application values/hook state ko compose karta hai; direct body calls are useState, useCallback, async, setState, getNotifications, useEffect, load, setInterval, clearInterval.

## Source flow and effects

- **Flow / return:** 4 explicit return statement(s) identified.
- **Return at source:** `L11: (bare return)`
- **Return at source:** `L21: undefined`
- **Return at source:** `L23: () => clearInterval(timer)`
- **Return at source:** `L26: { ...state, refresh: load }`
- **Direct call identifiers in this body:** useState, useCallback, async, setState, getNotifications, useEffect, load, setInterval, clearInterval
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** try (1), catch (1)
- **Verified static import callers:** components/layout/AppShell.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
