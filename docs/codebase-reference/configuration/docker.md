# Docker Build Configuration

- **Source:** [`Dockerfile`](../../../Dockerfile)
- **Purpose:** Multi-stage container build for the .NET API and React/Vite frontend.
- **API stages:** Restore/publish `backend/OMStationary.Api/OMStationary.Api.csproj` using the .NET 10 SDK; copy publish output into .NET 10 ASP.NET runtime image.
- **Frontend stages:** Install locked packages using `npm ci`, run Vite build, and copy `frontend/dist` into nginx static hosting image.
- **Configuration:** `VITE_API_URL` build argument defaults empty so same-origin `/api` reverse proxy can be used.
- **Maintenance:** Preserve separate target names `api-publish` and `frontend-publish` because Compose selects these. Keep lockfile copied before npm source to retain Docker layer cache.
- **Validation:** Source was inspected; container image build was not run for this documentation task.
