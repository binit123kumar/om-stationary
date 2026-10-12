# renderAuthField

**Source identity:** `frontend/src/components/auth/LoginForm.jsx`, declaration at line 129  
**Signature:** `renderAuthField(key, label, extra = {})`

Renders a labeled auth input bound to the matching form value and `updateAuthField` handler, including its invalid state and validation message. Hinglish: auth form ka ek label, input, aur uska error message render karta hai.

**Effects:** Returns JSX; no external side effect.
**Call sites:** Name, email/identifier, phone, and confirm-password fields.
**Validation:** Frontend production build passed.
