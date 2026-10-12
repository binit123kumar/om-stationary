# UpiPaymentPanel (exported)

**Source identity:** `frontend/src/components/checkout/UpiPaymentPanel.jsx`, declaration at line 16  
**Declaration kind:** function declaration  
**Module report:** [UpiPaymentPanel.md](../../../../../components/checkout/UpiPaymentPanel.md)

## Signature and responsibility

- **Name:** `UpiPaymentPanel` (exported).
- **Parameters:** `{ order, options, onVerified }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `UpiPaymentPanel` UI render karta hai; body has 14 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 14 explicit return statement(s) identified.
- **Return at source:** `L29: (bare return)`
- **Return at source:** `L30: (bare return)`
- **Return at source:** `L32: (bare return)`
- **Return at source:** `L36: (bare return)`
- **Return at source:** `L48: () => clearInterval(timerRef.current)`
- **Return at source:** `L53: (bare return)`
- **Return at source:** `L58: (bare return)`
- **Return at source:** `L65: (bare return)`
- **Return at source:** `L71: (bare return)`
- **Return at source:** `L77: (bare return)`
- **Return at source:** `L88: undefined`
- **Return at source:** `L91: () => clearInterval(timerRef.current)`
- **Return at source:** `L95: ( <div className="payment-glass payment-state-box"> <div className="success-check"><CheckCircle2 size={44} /></div> <h2>Payment verified</h2> <p>The OM Stationary service confirmed this payment. Your invoice is ready.</p`
- **Return at source:** `L106: ( <div className="payment-glass"> <div className="payment-head"> <span className="payment-icon"><QrCode size={24} /></span> <div> <small>OM STATIONARY</small> <h1>Pay {rupees(order.totalAmount)}</h1> </div> </div> <dl cl`
- **Direct call identifiers in this body:** useState, useRef, useCallback, async, setState, setMessage, createPaymentIntent, readFailure, json, setIntent, useEffect, loadIntent, clearInterval, setChecking, verifyPayment, setLastStatus, setInterval, rupees, Payment
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** try (2), catch (2), finally (1)
- **Verified static import callers:** pages/customer/PaymentPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
