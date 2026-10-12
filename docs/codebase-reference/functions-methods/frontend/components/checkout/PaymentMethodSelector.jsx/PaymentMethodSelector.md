# PaymentMethodSelector (exported)

**Source identity:** `frontend/src/components/checkout/PaymentMethodSelector.jsx`, declaration at line 5  
**Declaration kind:** function declaration  
**Module report:** [PaymentMethodSelector.md](../../../../../components/checkout/PaymentMethodSelector.md)

## Signature and responsibility

- **Name:** `PaymentMethodSelector` (exported).
- **Parameters:** `{ payment, onlineUpiAvailable, paymentOptions, onChange }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `PaymentMethodSelector` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** ``L6: ( <div className="payment-choice-grid"> <Radio name="payment" value="UPI" label="Online Payment (UPI)" hint={onlineUpiAvailable ? `Pay the exact amount by QR (${paymentOptions?.onlineProvider || 'UPI'})` : 'Not available``
- **Direct call identifiers in this body:** onChange
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/customer/CheckoutPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
