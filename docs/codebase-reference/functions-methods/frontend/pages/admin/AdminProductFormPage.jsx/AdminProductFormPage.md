# AdminProductFormPage (exported)

**Source identity:** `frontend/src/pages/admin/AdminProductFormPage.jsx`, declaration at line 21  
**Declaration kind:** function declaration  
**Module report:** [AdminProductFormPage.md](../../../../../pages/admin/AdminProductFormPage.md)

## Signature and responsibility

- **Name:** `AdminProductFormPage` (exported).
- **Parameters:** `{ user, key, onLogout }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `AdminProductFormPage` UI render karta hai; body has 7 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 7 explicit return statement(s) identified.
- **Return at source:** `L39: (bare return)`
- **Return at source:** `L47: (bare return)`
- **Return at source:** `L50: (bare return)`
- **Return at source:** `L68: () => { active = false; }`
- **Return at source:** `L83: Object.keys(found).length === 0`
- **Return at source:** `L88: (bare return)`
- **Return at source:** ``L126: ( <AdminLayout user={user} onLogout={onLogout}> <div className="pagehead"> <small>ADMIN PANEL</small> <h1>{editMode ? 'Edit product' : 'Add product'}</h1> <p>{editMode ? `Product #${id}` : 'A new catalogue entry'}</p> <L``
- **Direct call identifiers in this body:** useNavigate, useParams, Boolean, adminHeaders, readSession, useState, useEffect, async, getProduct, setError, setForm, setErrors, String, trim, Number, keys, preventDefault, validate, setBusy, setMessage, updateProduct, createProduct, json, Error, navigate, setField
- **Effects visible in this body:** state update or dispatch, navigation
- **Error-flow markers visible in this body:** try (2), catch (3), throw (1), finally (1)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
