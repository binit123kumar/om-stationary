# Forms and validation

## Shared validation source

- Module: [frontend/src/utils/validation.js](../../../frontend/src/utils/validation.js).
- Exported validator functions found: normaliseMobile, validateRegister, validateLogin, validateCheckoutDetails.
- Password/email/mobile/pincode validation constants and patterns are declared in that module.
- Checks and returned errors are defined by the source; they do not prove server-side acceptance.

## Files with form markup or validator calls

- [frontend/src/components/account/AddressForm.jsx](../../../frontend/src/components/account/AddressForm.jsx)
- [frontend/src/components/account/ProfileForm.jsx](../../../frontend/src/components/account/ProfileForm.jsx)
- [frontend/src/components/admin/AdminSignIn.jsx](../../../frontend/src/components/admin/AdminSignIn.jsx)
- [frontend/src/components/auth/LoginForm.jsx](../../../frontend/src/components/auth/LoginForm.jsx)
- [frontend/src/components/common/SearchBar.jsx](../../../frontend/src/components/common/SearchBar.jsx)
- [frontend/src/components/layout/Header.jsx](../../../frontend/src/components/layout/Header.jsx)
- [frontend/src/components/orders/OrderFilters.jsx](../../../frontend/src/components/orders/OrderFilters.jsx)
- [frontend/src/components/partner/PartnerInventoryForm.jsx](../../../frontend/src/components/partner/PartnerInventoryForm.jsx)
- [frontend/src/components/products/ProductSearch.jsx](../../../frontend/src/components/products/ProductSearch.jsx)
- [frontend/src/pages/admin/AdminCategoriesPage.jsx](../../../frontend/src/pages/admin/AdminCategoriesPage.jsx)
- [frontend/src/pages/admin/AdminCouponsPage.jsx](../../../frontend/src/pages/admin/AdminCouponsPage.jsx)
- [frontend/src/pages/admin/AdminDeliveryPage.jsx](../../../frontend/src/pages/admin/AdminDeliveryPage.jsx)
- [frontend/src/pages/admin/AdminOrderDetailPage.jsx](../../../frontend/src/pages/admin/AdminOrderDetailPage.jsx)
- [frontend/src/pages/admin/AdminProductFormPage.jsx](../../../frontend/src/pages/admin/AdminProductFormPage.jsx)
- [frontend/src/pages/admin/AdminSettingsPage.jsx](../../../frontend/src/pages/admin/AdminSettingsPage.jsx)
- [frontend/src/pages/customer/CheckoutPage.jsx](../../../frontend/src/pages/customer/CheckoutPage.jsx)
- [frontend/src/pages/partner/PartnerProfilePage.jsx](../../../frontend/src/pages/partner/PartnerProfilePage.jsx)
- [frontend/src/utils/validation.js](../../../frontend/src/utils/validation.js)

## Verification boundary

Client-side checks do not establish API acceptance, server-side validation, persistence, or successful browser submission. No live form submission was performed.
