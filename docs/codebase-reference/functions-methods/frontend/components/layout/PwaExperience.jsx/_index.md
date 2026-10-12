# Declaration index: components/layout/PwaExperience.jsx

**Source:** `frontend/src/components/layout/PwaExperience.jsx`  
**Named declarations identified:** 7  
**Linked module report:** [PwaExperience.md](../../../../../components/layout/PwaExperience.md)

## Individually reported named declarations

- [`isIosSafari` (line 3)](isIosSafari.md)
- [`PwaExperience` (line 10)](PwaExperience.md)
- [`onKeyDown` (line 22)](onKeyDown.md)
- [`onBeforeInstall` (line 41)](onBeforeInstall.md)
- [`onInstalled` (line 45)](onInstalled.md)
- [`onControllerChange` (line 50)](onControllerChange.md)
- [`install` (line 78)](install.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 19; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 36; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 56; lexical line fragment `navigator.serviceWorker?.getRegistration().then((currentRegistration) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 60; lexical line fragment `currentRegistration.addEventListener('updatefound', () => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 62; lexical line fragment `installing?.addEventListener('statechange', () => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 70; lexical line fragment `return () => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 7: source line 97; lexical line fragment `onClick={() => registration?.waiting?.postMessage({ type: 'SKIP_WAITING' })}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 8: source line 101; lexical line fragment `<button type="button" className="pwa-dismiss" onClick={() => setUpdateReady(false)} aria-label="Dismiss update notice">` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 9: source line 110; lexical line fragment `<button type="button" className="pwa-dismiss" onClick={() => setDismissed(true)} aria-label="Dismiss install prompt">` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 10: source line 116; lexical line fragment `<div className="pwa-instructions-backdrop" role="presentation" onMouseDown={(event) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 11: source line 120; lexical line fragment `<button type="button" ref={closeButtonRef} className="pwa-close" onClick={() => setInstallInstructions(false)} aria-label="Close installation instructions">Ã—</button>` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
