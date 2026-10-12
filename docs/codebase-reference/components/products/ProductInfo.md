# ProductInfo.jsx

**Source:** `frontend/src/components/products/ProductInfo.jsx`  
**Classification:** Reusable component source

## Source-grounded summary

**Purpose:** ProductInfo is the reusable UI module in its source folder. The report records JSX composition, parameters, state, event-related identifiers, styles, and direct consumers.

## Props, state, events, and styles

- First named function-like declaration parameters: {
  product: p,
  wishlist = [],
  toggleWishlist,
  onAdd,
  onAddQuantity,
  onBuyNow
}
- React hooks/state APIs referenced: useState
- DOM/component event props and named event handlers found: onAdd, onAddQuantity, onBuyNow, onChange, onClick
- Stylesheet imports: No direct stylesheet imports.
- JSX component tags: ProductPrice, ProductStock, ProductWishlistButton, ProductQuantity, Plus, ShieldCheck, Link

## Declarations and dependencies

- Exports: ProductInfo
- Named function-like declarations: ProductInfo
- Direct local imports: ProductImage -> components/products/ProductImage.jsx; ProductStock -> components/products/ProductStock.jsx; ProductWishlistButton -> components/products/ProductWishlistButton.jsx; ProductPrice -> components/products/ProductPrice.jsx; ProductQuantity -> components/products/ProductQuantity.jsx
- Direct static consumers (impact): pages/customer/ProductDetailPage.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: ProductInfo, useState, includes, Number, min, onAddQuantity
- Error/control-flow markers: No explicit try/throw/finally token found.
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/components/products/ProductInfo.jsx/_index.md) for one report per statically identified named declaration in this source file.
