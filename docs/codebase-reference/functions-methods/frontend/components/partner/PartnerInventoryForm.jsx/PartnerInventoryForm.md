# PartnerInventoryForm (exported)

**Source identity:** `frontend/src/components/partner/PartnerInventoryForm.jsx`, declaration at line 6  
**Declaration kind:** function declaration  
**Module report:** [PartnerInventoryForm.md](../../../../../components/partner/PartnerInventoryForm.md)

## Signature and responsibility

- **Name:** `PartnerInventoryForm` (exported).
- **Parameters:** `{ entry, onSave }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `PartnerInventoryForm` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L27: ( <form className="partner-inventory" onSubmit={submit}> <b>{entry.name}</b> <label> Price <input name="price" type="number" min="0" step="0.01" value={price} onChange={(event) => setPrice(event.target.value)} /> </label`
- **Direct call identifiers in this body:** useState, String, async, preventDefault, setBusy, onSave, Number, setPrice, setStock, setAvailable
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** try (1), finally (1)
- **Verified static import callers:** pages/partner/PartnerInventoryPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
