# Use a multi-stage build to handle both frontend and backend

# Stage 1: Install dependencies for the frontend
FROM oven/bun:alpine AS frontend-dependencies
WORKDIR /frontend
COPY ./apps/frontend/package.json ./apps/frontend/bun.lock ./
RUN bun install

# Stage 2: Build the frontend
FROM oven/bun:alpine AS frontend-build
WORKDIR /frontend
COPY ./apps/frontend ./
COPY --from=frontend-dependencies /frontend/node_modules ./node_modules
RUN bun run build

# Stage 3: Install dependencies for the backend
FROM oven/bun:slim AS backend-dependencies
WORKDIR /backend
COPY ./apps/backend/package.json ./apps/backend/bun.lock ./
RUN bun install

# Stage 4: Build the backend and integrate frontend static files
FROM oven/bun:slim AS backend-build
WORKDIR /backend
COPY ./apps/backend ./
COPY --from=backend-dependencies /backend/node_modules ./node_modules
COPY --from=frontend-build /frontend/build/client ./public

# Expose the port the backend runs on
EXPOSE 8000

# Command to run the backend application
CMD ["sh", "-c", "bunx drizzle-kit push && bun src/index.ts"]
