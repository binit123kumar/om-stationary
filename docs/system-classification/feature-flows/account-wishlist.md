# Account, addresses, and wishlist flow

## Flow chain

| Layer | Source-supported behavior |
|---|---|
| Route/page | `/account` → `AccountPage`; `/wishlist` → `WishlistPage`. Both are mapped as public React routes; pages conditionally render based on current customer session. |
| Handler/state | `AccountPage.reload` requests profile and addresses; profile form submits name/phone; address form adds and address list removes. `AppShell` caches wishlist IDs in localStorage for fast rendering, syncs signed-in customer wishlist from server, and rolls back optimistic toggle state on failure. Wishlist page gets authoritative rows and supports move-to-cart through wishlist service. |
| Service | Account currently calls `apiFetch` directly. `wishlistService` wraps list/add/remove/move-to-cart requests. |
| HTTP contract | Customer `GET/PUT /api/customers/me`; `GET/POST /api/customers/addresses`; `DELETE /api/customers/addresses/{addressId}` (backend also implements `PUT` there). Wishlist customer routes: `GET /api/wishlist`, `POST /api/wishlist/{productId}`, `DELETE /api/wishlist/{productId}`, `POST /api/wishlist/{productId}/move-to-cart`. |
| Backend | `CustomersController` scopes profile/address access to the claim user ID, checks duplicate phone, and maintains a single default-address behavior on creation/update. `WishlistController` scopes operations to current user, ignores inactive products, and moves one item into that user's cart before removing its saved row. |
| Data | `ApplicationUser`/`CustomerProfile`/`Address` → `Users`/`CustomerProfiles`/`Addresses`; `Wishlist`/`WishlistItem` → `Wishlists`/`WishlistItems`; move-to-cart uses `Cart`/`CartItem` and active `Product`. |

## Response and error path

The account page reports profile-load and save errors and success messages; duplicate phone produces 409 with `detail`. Address creation returns 201; update returns 200; deletion returns 204; foreign/missing address returns 404. Wishlist list returns 401 for unauthenticated requests (frontend treats that as an unsigned empty wishlist); product add returns 404 if inactive/missing; repeat add is idempotent and returns `alreadySaved:true`; removing a missing row returns 404; move-to-cart returns 404 for missing/inactive product. LocalStorage is only an optimistic/cache surface, not the server source of truth.

## Tests and status

- **Tests:** No account/address/wishlist controller integration test was found (**route-level coverage: NOT_MAPPED**).
- **Source status:** **Confirmed** from [AccountPage.jsx](../../../frontend/src/pages/customer/AccountPage.jsx), [AppShell.jsx](../../../frontend/src/components/layout/AppShell.jsx), [WishlistPage.jsx](../../../frontend/src/pages/customer/WishlistPage.jsx), [wishlistService.js](../../../frontend/src/services/wishlistService.js), [CustomersController.cs](../../../backend/OMStationary.Api/Controllers/CustomersController.cs), [WishlistController.cs](../../../backend/OMStationary.Api/Controllers/WishlistController.cs), and [OmDbContext.cs](../../../backend/OMStationary.Api/Data/OmDbContext.cs).
- **Runtime status:** **Unverified.** No profile edit/address persistence, wishlist synchronization, or cart move was exercised against a running API/database.
