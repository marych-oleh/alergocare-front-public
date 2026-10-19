# =========================================
# Stage 1: Build the React.js Application
# =========================================
ARG NODE_VERSION=24.12.0-alpine
ARG NGINX_VERSION=alpine3.22

# Use a lightweight Node.js image for building (customizable via ARG)
FROM node:${NODE_VERSION} AS front-builder

# Get Env vars
ARG VITE_API_URL
ARG VITE_PORT
ARG VITE_HOST
ARG SERVER_HOST
ARG SERVER_PORT

ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_PORT=${VITE_PORT}
ENV VITE_HOST=${VITE_HOST}
ENV SERVER_HOST=${SERVER_HOST}
ENV SERVER_PORT=${SERVER_PORT}

# Set the working directory inside the container
WORKDIR /app

# Copy package-related files first to leverage Docker's caching mechanism
COPY package.json package-lock.json* ./

# Install project dependencies using npm ci (ensures a clean, reproducible install)
RUN --mount=type=cache,target=/root/.npm npm ci

# Copy the rest of the application source code into the container
COPY . .

# Build the React Router application (outputs to /app/build/client)
RUN npm run build

# =========================================
# Stage 2: Prepare Nginx to Serve Static Files
# =========================================
FROM nginxinc/nginx-unprivileged:${NGINX_VERSION} AS front-runner

# Copy custom Nginx template config
COPY nginx/nginx.conf.template /etc/nginx/templates/nginx.conf.template

# Copy the static build output from the build stage to Nginx's default HTML serving directory
COPY --chown=nginx:nginx --from=front-builder /app/build/client /usr/share/nginx/html

# Use a built-in non-root user for security best practices
USER nginx