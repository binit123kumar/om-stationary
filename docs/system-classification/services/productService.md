# productService service

## Source identity

- Source: [frontend/src/services/productService.js](../../../frontend/src/services/productService.js)
- Classification: frontend service module under frontend/src/services.
- Exported declarations detected: mapProduct, listProducts, searchProducts, getProduct, listCategories.
- Important function exports, signatures, and adjacent source comments:
- **mapProduct(p)** — Normalises a raw API product row into the shape the storefront uses.
- **listProducts()** — No directly preceding source comment.
- **searchProducts({ q, category, brand, minPrice, maxPrice, available, sort, page, pageSize = PAGE_SIZE })** — No directly preceding source comment.
- **getProduct(id)** — No directly preceding source comment.
- **listCategories()** — No directly preceding source comment.

## HTTP call expressions detected
- GET/DEFAULT via apiFetch; path expression: /api/products.
- GET/DEFAULT via apiFetch; path expression: dynamic first argument: '/api/products?' + params.toString().
- GET/DEFAULT via apiFetch; path expression: dynamic first argument: '/api/products/' + encodeURIComponent(id).
- GET/DEFAULT via apiFetch; path expression: /api/categories.

## Local dependencies

- apiFetch from frontend/src/services/api.js.
- PAGE_SIZE from frontend/src/utils/constants.js.

## Backend mapping and runtime status

The listed expressions are frontend source call sites; method labels use a static scan of the nearby options object and otherwise say GET/default. They are not observed network traffic. No backend route/action mapping is asserted in this report, and response behavior or availability is not runtime-verified.
