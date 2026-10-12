# Component Inventory

## Purpose

This inventory records the substantial reusable components currently present in the frontend and where they sit in the module structure. It is intentionally limited to components that have meaningful reuse and responsibility boundaries rather than listing every trivial HTML wrapper.

## Shared and feature components

| Component | Exact file path | Purpose | Typical usage | Ownership | Notes |
| --- | --- | --- | --- | --- | --- |
| `AppShell` | `frontend/src/components/layout/AppShell.jsx` | Shared app shell with navigation, layout wrappers and page context | All customer pages and route layout | Layout | Central app shell for global layout |
| `Header` | `frontend/src/components/layout/Header.jsx` | Main storefront header and navigation | Customer storefront | Layout | Shared across customer pages |
| `Footer` | `frontend/src/components/layout/Footer.jsx` | Footer navigation and legal links | Customer storefront | Layout | Shared across customer pages |
| `MobileNav` | `frontend/src/components/layout/MobileNav.jsx` | Mobile navigation | Responsive storefront | Layout | Handles small-screen navigation |
| `ProtectedRoute` | `frontend/src/components/layout/ProtectedRoute.jsx` | Authentication gate | Authenticated routes | Auth/security | Guards customer/admin/partner/delivery entry |
| `RoleRoute` | `frontend/src/components/layout/RoleRoute.jsx` | Role-based route gate | Admin/partner/delivery access | Auth/security | Enforces role restrictions |
| `ProductCard` | `frontend/src/components/products/ProductCard.jsx` | Product summary card | Listings and home pages | Catalog | Reused in catalog and recommendation contexts |
| `ProductGrid` | `frontend/src/components/products/ProductGrid.jsx` | Product list layout | Search and listing pages | Catalog | Reusable catalog grid |
| `ProductFilters` | `frontend/src/components/products/ProductFilters.jsx` | Search/filter controls | Product list pages | Catalog | Encapsulates filter state interactions |
| `ProductGallery` | `frontend/src/components/products/ProductGallery.jsx` | Product image gallery | Product detail page | Product | Shared within product detail |
| `ProductWishlistButton` | `frontend/src/components/products/ProductWishlistButton.jsx` | Save/remove favorite state | Product cards and product detail | Wishlist | Reusable wishlist action |
| `CartList` | `frontend/src/components/cart/CartList.jsx` | Cart item list | Cart page | Cart | Shared cart rendering |
| `CartSummary` | `frontend/src/components/cart/CartSummary.jsx` | Totals and pricing breakdown | Cart and checkout | Cart | Supports item subtotal and delivery totals |
| `AddressForm` | `frontend/src/components/checkout/AddressForm.jsx` | Customer delivery address form | Checkout | Checkout | Shared form for shipping data |
| `DeliveryMethodSelector` | `frontend/src/components/checkout/DeliveryMethodSelector.jsx` | Delivery method selection | Checkout | Checkout | Reusable selection component |
| `PaymentMethodSelector` | `frontend/src/components/checkout/PaymentMethodSelector.jsx` | Payment mode selection | Checkout/payment | Checkout | Reusable payment choice UI |
| `UpiPaymentPanel` | `frontend/src/components/checkout/UpiPaymentPanel.jsx` | UPI flow panel | Payment page | Payment | Payment UI helper |
| `OrderSummary` | `frontend/src/components/checkout/OrderSummary.jsx` | Consolidated order totals | Checkout/payment | Orders | Shared summary card |
| `OrderCard` | `frontend/src/components/orders/OrderCard.jsx` | Customer order summary card | Orders page | Orders | Used in order history |
| `OrderStatusTimeline` | `frontend/src/components/orders/OrderStatusTimeline.jsx` | Order timeline | Order tracking and admin detail | Orders | Shared timeline rendering |
| `InvoiceHeader` | `frontend/src/components/invoice/InvoiceHeader.jsx` | Invoice header content | Invoice page | Invoice | Shared invoice layout |
| `InvoiceItemsTable` | `frontend/src/components/invoice/InvoiceItemsTable.jsx` | Invoice line items | Invoice page | Invoice | Shared invoice body |
| `InvoiceTotals` | `frontend/src/components/invoice/InvoiceTotals.jsx` | Invoice totals | Invoice page | Invoice | Shared totals block |
| `AdminHeader` | `frontend/src/components/admin/AdminHeader.jsx` | Admin masthead and actions | Admin pages | Admin | Shared header for admin layout |
| `AdminSidebar` | `frontend/src/components/admin/AdminSidebar.jsx` | Admin navigation | Admin pages | Admin | Shared admin navigation |
| `AdminDataTable` | `frontend/src/components/admin/AdminDataTable.jsx` | Data table | Admin management pages | Admin | Shared admin grid |
| `LowStockTable` | `frontend/src/components/admin/LowStockTable.jsx` | Stock exception table | Admin inventory page | Inventory | Shared inventory monitoring |
| `SalesChart` | `frontend/src/components/admin/SalesChart.jsx` | Analytics chart | Admin dashboard/reports | Admin | Shared charting wrapper |
| `PartnerInventoryForm` | `frontend/src/components/partner/PartnerInventoryForm.jsx` | Inventory form | Partner inventory page | Partner | Reusable partner management form |
| `DeliveryCard` | `frontend/src/components/delivery/DeliveryCard.jsx` | Delivery assignment card | Delivery pages | Delivery | Shared delivery entry card |
| `DeliveryStatusActions` | `frontend/src/components/delivery/DeliveryStatusActions.jsx` | Delivery status controls | Delivery detail pages | Delivery | Reusable status update toolbar |
| `WhatsAppSettingsForm` | `frontend/src/components/whatsapp/WhatsAppSettingsForm.jsx` | Notification configuration form | Admin WhatsApp page | WhatsApp | Shared integration settings form |
| `WhatsAppEventList` | `frontend/src/components/whatsapp/WhatsAppEventList.jsx` | Event log UI | Admin WhatsApp page | WhatsApp | Shared delivery log view |

## Component duplication and risk notes

- Shared UI pieces are generally separated into dedicated component folders rather than being embedded directly in page files.
- Some page files still contain larger inline implementations; the project is modular but not fully flattened to a single component-per-feature architecture.
- The repository already contains substantial reuse and does not appear to duplicate the system's core product cards or order tables in multiple incompatible forms.
