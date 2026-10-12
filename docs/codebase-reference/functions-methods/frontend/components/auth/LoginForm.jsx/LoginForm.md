# LoginForm (exported)

**Source identity:** `frontend/src/components/auth/LoginForm.jsx`, declaration at line 23  
**Declaration kind:** function declaration  
**Module report:** [LoginForm.md](../../../../../components/auth/LoginForm.md)

## Signature and responsibility

- **Name:** `LoginForm` (exported).
- **Parameters:** `{ onAuth, register: registerMode = false }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `LoginForm` UI render karta hai; body has 5 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 5 explicit return statement(s) identified.
- **Return at source:** `L29: requested && requested.startsWith('/') && !requested.startsWith('//') ? requested : '/'`
- **Return at source:** `L79: cart`
- **Return at source:** `L84: (bare return)`
- **Return at source:** `L87: (bare return)`
- **Return at source:** ` L143: ( <section className="auth-3d-page"> <div className="auth-3d-orb orb-a" /><div className="auth-3d-orb orb-b" /> <div className="auth-3d-float" aria-hidden="true"><i /><i /><i /></div> <div className="auth-3d-card"> <div  `
- **Direct call identifiers in this body:** useLocation, useNavigate, useMemo, URLSearchParams, get, startsWith, useState, useEffect, setErrors, setError, setForm, async, saveSession, parse, getItem, isArray, map, min, Number, mergeGuestCart, mapServerCart, json, fetch, preventDefault, validateRegister, validateLogin, keys, setBusy, register, trim
- **Effects visible in this body:** network request, browser storage, state update or dispatch, navigation
- **Error-flow markers visible in this body:** try (3), catch (4), throw (2), finally (1)
- **Verified static import callers:** components/auth/RegisterForm.jsx, pages/customer/LoginPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
