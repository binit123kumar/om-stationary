# Declaration index: components/checkout/UpiPaymentPanel.jsx

**Source:** `frontend/src/components/checkout/UpiPaymentPanel.jsx`  
**Named declarations identified:** 1  
**Linked module report:** [UpiPaymentPanel.md](../../../../../components/checkout/UpiPaymentPanel.md)

## Individually reported named declarations

- [`UpiPaymentPanel` (line 16)](UpiPaymentPanel.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 24; lexical line fragment `const loadIntent = useCallback(async () => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 46; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 48; lexical line fragment `return () => clearInterval(timerRef.current);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 52; lexical line fragment `const verify = useCallback(async () => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 87; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 91; lexical line fragment `return () => clearInterval(timerRef.current);` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
