# OM Stationary — Local + Online Shopping Aggregator

A React + Capacitor-ready shopping experience with ASP.NET Core Web API and Microsoft SQL Server. The project is designed around a connector architecture: local partner shops can be fully controlled by OM after onboarding/authorization, while Amazon/Flipkart/Blinkit/JioMart/Zepto-style integrations are enabled only when the relevant official API/partner authorization is available.

## Stack
- React + Vite + React Router
- Capacitor-ready frontend
- ASP.NET Core Web API (.NET 10)
- Entity Framework Core
- Microsoft SQL Server
- Swagger

## Frontend
```powershell
cd frontend
npm install
npm start
# or npm run dev
```
Set the backend URL in `frontend/.env`:
```env
VITE_API_URL=https://localhost:7001
```
Use the actual HTTPS URL shown by `dotnet run` if the port differs.

## Backend
Requirements: .NET 10 SDK + SQL Server/SQL Server Express/LocalDB.

```powershell
cd backend\OMStationary.Api
dotnet restore
dotnet run
```
The API creates `OMStationaryDb` on first run using the configured SQL Server connection and seeds a few sample products.

Swagger: open the URL printed by `dotnet run` and append `/swagger`.

## Main routes
Customer:
- `/` Home
- `/search` Unified product search UI
- `/cart` Cart
- `/checkout` Address + delivery + payment selection
- `/orders` Orders
- `/track/:id` Tracking
- `/account` Account

Admin:
- `/admin` Connector + order dashboard

## API
- `GET /api/products?q=&category=`
- `GET /api/products/{id}`
- `GET /api/orders`
- `GET /api/orders/{orderNumber}`
- `POST /api/orders`
- `PATCH /api/orders/{id}/status`
- `GET /api/connectors`
- `POST /api/connectors/seed`

## Connector rule
Do not put Amazon/Flipkart/Blinkit/JioMart credentials in the frontend. Credentials must live server-side and only be used under an official partner/API agreement. A connector can support catalog-only, deep-link/affiliate, or full order/tracking depending on what the provider authorizes.

## Next production modules
1. JWT + mobile OTP authentication
2. Full SQL Server migrations and seed data
3. Partner-shop onboarding/KYC and shop portal
4. Product/stock/price management
5. Unified search aggregation service
6. Payment gateway + authorized marketplace settlement
7. Delivery-provider API + COD settlement
8. Webhooks and real-time tracking
9. Official external-platform connectors as approvals become available
10. Capacitor Android build/signing and Play Store release
