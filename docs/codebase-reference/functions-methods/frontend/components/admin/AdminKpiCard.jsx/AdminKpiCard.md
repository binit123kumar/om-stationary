# AdminKpiCard (exported)

**Source identity:** `frontend/src/components/admin/AdminKpiCard.jsx`, declaration at line 4  
**Declaration kind:** function declaration  
**Module report:** [AdminKpiCard.md](../../../../../components/admin/AdminKpiCard.md)

## Signature and responsibility

- **Name:** `AdminKpiCard` (exported).
- **Parameters:** `{ label, value, tone = 'default', money = false }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `AdminKpiCard` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** ``L5: ( <div className={`adminstat adminstat-${tone}`}> <b>{money ? rupeesShort(value) : value}</b> <span>{label}</span> </div> )``
- **Direct call identifiers in this body:** rupeesShort
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/admin/AdminDashboardPage.jsx, pages/admin/AdminProductsPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
