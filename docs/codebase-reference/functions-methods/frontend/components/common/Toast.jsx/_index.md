# Declaration index: components/common/Toast.jsx

**Source:** `frontend/src/components/common/Toast.jsx`  
**Named declarations identified:** 2  
**Linked module report:** [Toast.md](../../../../../components/common/Toast.md)

## Individually reported named declarations

- [`Toast` (line 5)](Toast.md)
- [`ToastStack` (line 21)](ToastStack.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 6; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 8; lexical line fragment `const timer = setTimeout(() => onDismiss?.(toast.id), 4200);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 9; lexical line fragment `return () => clearTimeout(timer);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 16; lexical line fragment `<button type="button" aria-label="Dismiss" onClick={() => onDismiss?.(toast.id)}>&times;</button>` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 24; lexical line fragment `{toasts.map((toast) => <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />)}` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
