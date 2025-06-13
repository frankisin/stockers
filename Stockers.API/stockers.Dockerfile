# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy and restore csproj
COPY Stockers.API/Stockers.API.csproj ./Stockers.API.csproj
RUN dotnet restore ./Stockers.API.csproj

# Copy the entire subdirectory and build
COPY Stockers.API/. ./ 
RUN dotnet publish -c Release -o out

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out ./
ENTRYPOINT ["dotnet", "Stockers.API.dll"]
