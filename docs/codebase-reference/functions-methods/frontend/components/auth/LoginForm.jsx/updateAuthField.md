# updateAuthField

**Source identity:** `frontend/src/components/auth/LoginForm.jsx`, declaration at line 42  
**Signature:** `updateAuthField(key) => (event) => ...`

Returns an input change handler. It reads checkbox state or the input value, updates that key in the auth form state, and clears the corresponding field error. Hinglish: form ke selected field ko update karke uska purana validation error hataata hai.

**Effects:** React state updates only. No API, storage, route, or external contract changes.
**Call sites:** Auth inputs, password field, and terms checkbox in `LoginForm`.
**Validation:** Frontend production build passed after rename. No dedicated frontend unit test is configured.

Static source description; runtime API behavior is not asserted.
