# Declaration index: pages/customer/CheckoutPage.jsx

**Source:** `frontend/src/pages/customer/CheckoutPage.jsx`  
**Named declarations identified:** 6  
**Linked module report:** [CheckoutPage.md](../../../../../pages/customer/CheckoutPage.md)

## Individually reported named declarations

- [`CheckoutPage` (line 27)](CheckoutPage.md)
- [`requestLocation` (line 112)](requestLocation.md)
- [`updateCheckoutDetail` (line 146)](updateCheckoutDetail.md)
- [`validateCheckoutForm` (line 151)](validateCheckoutForm.md)
- [`requestDeliveryQuote` (line 160)](requestDeliveryQuote.md)
- [`placeOrder` (line 194)](placeOrder.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 58; lexical line fragment `() => cart.reduce((sum, item) => sum + Number(item.price || 0) * item.q, 0),` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 58; lexical line fragment `() => cart.reduce((sum, item) => sum + Number(item.price || 0) * item.q, 0),` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 62; lexical line fragment `() => cart.map((item) => ({ productId: item.id, quantity: item.q })),` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 62; lexical line fragment `() => cart.map((item) => ({ productId: item.id, quantity: item.q })),` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 66; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 68; lexical line fragment `setDetails((current) => ({` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 7: source line 78; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 8: source line 81; lexical line fragment `setDetails((current) => ({ ...current, city: current.city || deliveryOptions.cities[0] }));` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 9: source line 86; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 10: source line 90; lexical line fragment `setPickupSlot((current) => current || toLocalInputValue(fallback));` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 11: source line 93; lexical line fragment `useEffect(() => { setQuote(null); setQuoteError(''); }, [fulfillment, coordinates, details.pincode, details.city, itemsPayload]);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 12: source line 97; lexical line fragment `const pickupSlots = useMemo(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 13: source line 120; lexical line fragment `(position) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 14: source line 124; lexical line fragment `() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 15: source line 139; lexical line fragment `const readyForOrder = useMemo(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 16: source line 305; lexical line fragment `<select value={pickupSlot} onChange={(event) => setPickupSlot(event.target.value)}>` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 17: source line 307; lexical line fragment `{pickupSlots.map((slot) => (` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 18: source line 328; lexical line fragment `onField={(key, value) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 19: source line 342; lexical line fragment `onChange={(key, value) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 20: source line 353; lexical line fragment `onChange={(event) => setDetail('billingAddress')(event.target.value)}` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
