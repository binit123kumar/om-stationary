# submitAuthForm

**Source identity:** `frontend/src/components/auth/LoginForm.jsx`, declaration at line 82  
**Signature:** `async submitAuthForm(event)`

Prevents native form submission, validates login or registration fields, calls the existing login/register service, interprets the response, completes authentication, and then displays registration success or navigates to the saved return path. Busy state is cleared in `finally`. Hinglish: login ya registration form ko validate karke account request complete karta hai.

**Effects:** Auth API calls, React state changes, session/cart completion, and navigation.
**Contract:** Existing endpoint, request payload, response handling, and redirect behavior are preserved.
**Validation:** Frontend production build passed; backend API was unavailable in the browser and no frontend unit suite is configured.
