# PlaceOrderButton (exported)

**Source identity:** `frontend/src/components/checkout/PlaceOrderButton.jsx`, declaration at line 6  
**Declaration kind:** function declaration  
**Module report:** [PlaceOrderButton.md](../../../../../components/checkout/PlaceOrderButton.md)

## Signature and responsibility

- **Name:** `PlaceOrderButton` (exported).
- **Parameters:** `{
  placing,
  ready,
  payment,
  onlineUpiAvailable,
  grandTotal,
  onPlace
}`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `PlaceOrderButton` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.
  placing,
  ready,
  payment,
  onlineUpiAvailable,
  grandTotal,
  onPlace
}`. Hinglish: yeh UI render karta hai; exact source return fragments neeche diye gaye hain.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L21: ( <Button wide busy={placing} disabled={!allowed} onClick={onPlace} > {label} </Button> )`
- **Direct call identifiers in this body:** None identified by lexical scan.
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/customer/CheckoutPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
