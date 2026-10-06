# Build and publish the ASP.NET Core API.
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS api-build
WORKDIR /src
COPY backend/OMStationary.Api/OMStationary.Api.csproj backend/OMStationary.Api/
RUN dotnet restore backend/OMStationary.Api/OMStationary.Api.csproj
COPY backend/OMStationary.Api/ backend/OMStationary.Api/
WORKDIR /src/backend/OMStationary.Api
RUN dotnet publish OMStationary.Api.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS api-publish
WORKDIR /app
COPY --from=api-build /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "OMStationary.Api.dll"]

# Empty VITE_API_URL makes the browser use the same-origin /api proxy.
FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
ARG VITE_API_URL=
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build

FROM nginx:alpine AS frontend-publish
COPY --from=frontend-build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
