# PwaExperience (exported)

**Source identity:** `frontend/src/components/layout/PwaExperience.jsx`, declaration at line 10  
**Declaration kind:** function declaration  
**Module report:** [PwaExperience.md](../../../../../components/layout/PwaExperience.md)

## Signature and responsibility

- **Name:** `PwaExperience` (exported).
- **Parameters:** `(none)`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `PwaExperience` UI render karta hai; body has 8 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 8 explicit return statement(s) identified.
- **Return at source:** `L20: undefined`
- **Return at source:** `L30: () => { window.removeEventListener('keydown', onKeyDown); installButtonRef.current?.focus(); }`
- **Return at source:** `L39: undefined`
- **Return at source:** `L57: (bare return)`
- **Return at source:** `L70: () => { active = false; window.removeEventListener('beforeinstallprompt', onBeforeInstall); window.removeEventListener('appinstalled', onInstalled); navigator.serviceWorker?.removeEventListener('controllerchange', onCont`
- **Return at source:** `L81: (bare return)`
- **Return at source:** `L88: null`
- **Return at source:** `L90: ( <aside className="pwa-experience" aria-live="polite"> {updateReady && ( <div className="pwa-notice"> <span>A new version of OM Stationary is ready.</span> <button type="button" onClick={() => registration?.waiting?.pos`
- **Direct call identifiers in this body:** useState, useRef, useEffect, focus, setInstallInstructions, preventDefault, addEventListener, removeEventListener, matchMedia, setInstallPrompt, setDismissed, reload, getRegistration, then, setRegistration, setUpdateReady, async, prompt, postMessage, isIosSafari
- **Effects visible in this body:** state update or dispatch, navigation, browser/console global
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/layout/AppShell.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
