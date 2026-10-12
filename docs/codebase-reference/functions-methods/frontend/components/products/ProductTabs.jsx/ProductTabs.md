# ProductTabs (exported)

**Source identity:** `frontend/src/components/products/ProductTabs.jsx`, declaration at line 5  
**Declaration kind:** function declaration  
**Module report:** [ProductTabs.md](../../../../../components/products/ProductTabs.md)

## Signature and responsibility

- **Name:** `ProductTabs` (exported).
- **Parameters:** `{ product }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `ProductTabs` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L9: ( <div className="product-tabs"> <Tabs tabs={[ { id: 'details', label: 'Details' }, { id: 'shipping', label: 'Shipping & returns' } ]} active={active} onChange={setActive} /> {active === 'details' && ( <div className="pr`
- **Direct call identifiers in this body:** useState
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/customer/ProductDetailPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
