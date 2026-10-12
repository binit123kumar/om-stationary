# Admin catalogue, categories, and inventory

## Flow chain

| Layer | Source-supported behavior |
|---|---|
| Route/page | Admin-guarded routes: `/admin/products`, `/admin/products/new`, `/admin/products/:id/edit`, `/admin/categories`, `/admin/inventory`. They resolve to `AdminProductsPage`, `AdminProductFormPage`, `AdminCategoriesPage`, and `AdminInventoryPage` inside `AdminLayout`. |
| Handler/state | Pages hold query/filter, rows, loading/error and edit/form state. Product pages use admin catalogue handlers. `AdminCategoriesPage` loads rows on mount, opens add/edit modal, posts or puts category fields, then reloads; activate/deactivate is implemented as a category PUT toggling `isActive`. Inventory adjusts product stock with delta/reason; it is not an independent stock table in the UI contract. |
| Service | `adminService.listAdminProducts`, `createProduct`, `updateProduct`, `deactivateProduct`, `adjustStock`; categories use `listAdminCategories`, `createCategory`, `updateCategory`. Admin headers are built by `adminHeaders` from an Admin session or legacy key. |
| HTTP contract | Products: `GET/POST /api/admin/products`; `PUT/DELETE /api/admin/products/{id}`; `POST /api/admin/products/{id}/stock`. Categories: `GET/POST /api/admin/categories`; `PUT /api/admin/categories/{id}`. |
| Backend | `AdminController` requires Admin role and reads/writes product data, supports product filtering/paging and derived stock state, deactivates instead of hard-delete, and adjusts stock. `AdminCategoriesController` uses category records and reports linked product counts. |
| Data | `Product` → `Products`; `ProductImage` → `ProductImages`; `Category` → `Categories`. Stock belongs to `Product.Stock` and partner inventory belongs to `ShopProduct.Stock` (partner flow), not a standalone product-stock entity. `StockAlertService` can be invoked after stock changes. |

## AdminCategoriesPage (explicit flow)

`/admin/categories` → `App` Admin `ProtectedRoute` → `RouteView` key `admin-categories` → `AdminCategoriesPage`. Component state: rows/loading/error/busy/editing/name/active. `load()` → `listAdminCategories` → `GET /api/admin/categories`; submit chooses `createCategory` → `POST` or `updateCategory` → `PUT /api/admin/categories/{id}`. Toggling Active uses the same `PUT` update operation. Non-2xx response detail is shown as an alert; on success the page closes the modal and reloads. Controller is `AdminCategoriesController` in `AdminCatalogueController.cs`; persistence is `OmDbContext.Categories` (`Category`).

## Response and status

The product table/search endpoints return paged products and stock summary. Category list returns count/active-product count; create/update return the saved category or 400/404/409 validation result as implemented. Product and category service failures are converted to page error state. **Tests:** no admin catalogue endpoint/UI test was found (**NOT_MAPPED**). **Source status: Confirmed** from [AdminCategoriesPage.jsx](../../../frontend/src/pages/admin/AdminCategoriesPage.jsx), [adminService.js](../../../frontend/src/services/adminService.js), [AdminController.cs](../../../backend/OMStationary.Api/Controllers/AdminController.cs), [AdminCatalogueController.cs](../../../backend/OMStationary.Api/Controllers/AdminCatalogueController.cs), and [OmDbContext.cs](../../../backend/OMStationary.Api/Data/OmDbContext.cs). **Runtime: Unverified;** no admin mutation or database query was run.
