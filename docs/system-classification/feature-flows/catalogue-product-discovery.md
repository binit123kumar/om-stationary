# Catalogue, categories, search, and product-detail flow

## Flow chain

| Layer | Source-supported behavior |
|---|---|
| Route/page | `/` resolves to `HomePage`; `/search` to `ProductListingPage`; `/product/:id` to `ProductDetailPage`, all through `RouteView` and `AppShell`. |
| Handler/state | `AppShell` loads catalogue via `useCatalog`. Listing reads `q` and `cat` from the URL, holds sort/page/brand/price/availability in React state, debounces query for 300 ms, and submits filters through `useProductSearch`. Product detail checks the loaded catalogue first, then fetches by ID if needed; missing/failed product lookup produces the not-found state. |
| Hook/service | `useCatalog` calls `listProducts`; `useProductSearch` calls `searchProducts`; `useSearchCategories` calls `listCategories` and falls back to distinct catalogue categories; `ProductDetailPage` calls `getProduct`. Product rows are normalized by `mapProduct`. |
| HTTP contract | `GET /api/products` (catalogue); `GET /api/products?paginated=true&page=…&pageSize=…&sort=…` with optional `q`, `category`, `brand`, `minPrice`, `maxPrice`, `available`; `GET /api/products/{id}`; `GET /api/categories`. |
| Backend | `ProductsController.Get` filters only active products, supports text/category/brand/SKU/price/availability filters and pagination, and returns either the legacy array for the unfiltered default request or `{items,total,page,pageSize}` for search. `ProductsController.Get(id)` includes sorted images. `CategoriesController.Get` returns distinct category strings present on active products. |
| Data | `Product` → `Products`; `ProductImage` → `ProductImages`; category labels derive from `Product.Category`; `Category` → `Categories` is used by administration, not by public `GET /api/categories`. |

## Response and error path

The API service maps API names (`imageUrl`, `category`, etc.) into storefront names (`img`, `cat`, etc.). Catalog load/search failures enter hook/page error state; `GET /api/products/{id}` maps 404 to `null`, and the page renders “Product not found.” Product lookup returns active rows only. Search requests with page < 1 or pageSize outside 1–100 return 400. Public category-load failure returns an empty array, after which the hook uses product-derived categories.

## Shared endpoint clarification

`GET /api/products` is deliberately shared by the home catalogue and search. The home hook makes the default unpaginated request and expects an array; search adds `paginated=true` and query parameters and expects an object. The controller explicitly preserves the default array shape. Public category browsing uses a distinct `GET /api/categories` endpoint over distinct product text; admin category CRUD uses `/api/admin/categories` and the separate `Category` entity.

## Tests and status

- **Tests:** No product/category API or UI test was found in the checked backend test files; route-level test coverage is **NOT_MAPPED**.
- **Source status:** **Confirmed** from [App.jsx](../../../frontend/src/App.jsx), [RouteView.jsx](../../../frontend/src/RouteView.jsx), [ProductListingPage.jsx](../../../frontend/src/pages/customer/ProductListingPage.jsx), [ProductDetailPage.jsx](../../../frontend/src/pages/customer/ProductDetailPage.jsx), [useProducts.js](../../../frontend/src/hooks/useProducts.js), [productService.js](../../../frontend/src/services/productService.js), [ProductsController.cs](../../../backend/OMStationary.Api/Controllers/ProductsController.cs), [CategoriesController.cs](../../../backend/OMStationary.Api/Controllers/CategoriesController.cs), and [OmDbContext.cs](../../../backend/OMStationary.Api/Data/OmDbContext.cs).
- **Runtime status:** **Unverified.** No API response, search rendering, or database state was exercised for this report.
