FROM node:20.16-alpine@sha256:eb8101caae9ac02229bd64c024919fe3d4504ff7f329da79ca60a04db08cef52 AS base


ARG RELEASE_VERSION
ARG SCOPE
ARG APP_PATH

## Add curl for health checks
RUN apk add --no-cache curl

## Add turbo and pnpm to all followup builder images
# Dockerfile
RUN corepack enable && corepack prepare pnpm@9.9.0 --activate
# Enable `pnpm add --global` on Alpine Linux by setting
# home location environment variable to a location already in $PATH
# https://github.com/pnpm/pnpm/issues/784#issuecomment-1518582235
ENV PNPM_HOME=/usr/local/bin
RUN pnpm add -g turbo@2.1.0



#----------------------------------------
# Docker build step that prunes down to 
# the active project.
#----------------------------------------
FROM base AS setup
ARG RELEASE_VERSION
ARG SCOPE
ARG APP_PATH

RUN apk add --no-cache curl
RUN apk update
# Set working directory
WORKDIR /app
COPY . .

# Prune the structure to an optimized folder structure with just the `scopes` app dependencies. 
RUN turbo prune $SCOPE --docker


#----------------------------------------
# Docker build step that:
# 1. Installs all the dependencies
# 2. Builds the application
# 3. Exports it as a built application
#----------------------------------------
# Add lockfile and package.json's of isolated subworkspace
FROM base AS builder
ARG RELEASE_VERSION
ARG SCOPE
ARG APP_PATH

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY --from=setup /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=setup /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# First install dependencies (as they change less often)
COPY --from=setup /app/out/json/ ./
RUN pnpm install --filter=${SCOPE}... --frozen-lockfile

# Build the project and its dependencies
COPY --from=setup /app/out/full/ ./
RUN pnpm run build --filter=${SCOPE}...

#----------------------------------------
# Docker build step that:
# 1. Sets up our actual runner
#----------------------------------------
FROM base AS runners
ARG RELEASE_VERSION
ARG SCOPE
ARG APP_PATH

WORKDIR /app
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
RUN chown -R nodejs:nodejs /app
USER nodejs


# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nodejs:nodejs /app/clients/${APP_PATH}/.next/standalone ./
COPY --from=builder --chown=nodejs:nodejs /app/clients/${APP_PATH}/.next/static ./apps/clients/${APP_PATH}/.next/static
COPY --from=builder --chown=nodejs:nodejs /app/clients/${APP_PATH}/public ./apps/clients/${APP_PATH}/public

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV=production
ENV PORT 80
ENV RELEASE_VERSION=${RELEASE_VERSION}

EXPOSE ${PORT}

CMD [ "node", "apps/${APP_PATH}", "server.js" ]
