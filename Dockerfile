FROM node:20.16-alpine@sha256:eb8101caae9ac02229bd64c024919fe3d4504ff7f329da79ca60a04db08cef52 AS base


ARG SCOPE
ARG APP_PATH
ARG RELEASE_VERSION
ARG S3_BUCKET
ARG S3_PATH
ARG ASSET_PREFIX

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
ARG SCOPE
ARG APP_PATH
ARG RELEASE_VERSION
ARG S3_BUCKET
ARG S3_PATH
ARG ASSET_PREFIX

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
ARG SCOPE
ARG APP_PATH
ARG RELEASE_VERSION
ARG ASSET_PREFIX
ARG S3_BUCKET
ARG S3_PATH

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat aws-cli
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
ENV ASSET_PREFIX=${ASSET_PREFIX}
ENV RELEASE_VERSION=${RELEASE_VERSION}
ENV SHOWDEV=''
RUN pnpm run build --filter=${SCOPE}...


# If the s3 bucket was passed, upload the nextjs CDN files to s3
RUN --mount=type=secret,id=aws-access-key-id,target=/run/secrets/aws-access-key-id \
    --mount=type=secret,id=aws-secret-access-key,target=/run/secrets/aws-secret-key \
    --mount=type=secret,id=aws-session-token,target=/run/secrets/aws-session-token \
    --mount=type=secret,id=aws-region,target=/run/secrets/aws-region \
      if [ -n "$S3_BUCKET" ] ; then \
       AWS_ACCESS_KEY_ID=$(cat /run/secrets/aws-access-key-id) \
       AWS_SECRET_ACCESS_KEY=$(cat /run/secrets/aws-secret-key) \
       AWS_SESSION_TOKEN=$(cat /run/secrets/aws-session-token) \
       AWS_REGION=$(cat /run/secrets/aws-region) \
       aws s3 cp \
        --recursive \
        --acl public-read \
        --metadata-directive REPLACE \
        --cache-control max-age=31536000 \
        --include "*" \
        --exclude "BUILD_ID" \
        /app/clients/${APP_PATH}/.next/static s3://${S3_BUCKET}/${S3_PATH}/_next/static \
        ; fi

RUN --mount=type=secret,id=aws-access-key-id,target=/run/secrets/aws-access-key-id \
    --mount=type=secret,id=aws-secret-access-key,target=/run/secrets/aws-secret-key \
    --mount=type=secret,id=aws-session-token,target=/run/secrets/aws-session-token \
    --mount=type=secret,id=aws-region,target=/run/secrets/aws-region \
        if [ -n "$S3_BUCKET" ] ; then \
        AWS_ACCESS_KEY_ID=$(cat /run/secrets/aws-access-key-id) \
        AWS_SECRET_ACCESS_KEY=$(cat /run/secrets/aws-secret-key) \
        AWS_SESSION_TOKEN=$(cat /run/secrets/aws-session-token) \
        AWS_REGION=$(cat /run/secrets/aws-region) \
        aws s3 cp \
        --recursive \
        --acl public-read \
        --metadata-directive REPLACE \
        --cache-control max-age=31536000 \
        --include "*" \
        --exclude "BUILD_ID" \
        /app/clients/${APP_PATH}/public s3://${S3_BUCKET}/${S3_PATH}/public \
        ; fi

#----------------------------------------
# Docker build step that:
# 1. Sets up our actual runner
#----------------------------------------
FROM base AS runners
ARG RELEASE_VERSION
ARG SCOPE
ARG APP_PATH
ARG RELEASE_VERSION
ARG ASSET_PREFIX

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
RUN chown -R nodejs:nodejs /app
USER nodejs


# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nodejs:nodejs /app/clients/${APP_PATH}/.next/standalone /app

# These are only if we aren't uploading to S3
# COPY --from=builder --chown=nodejs:nodejs /app/clients/${APP_PATH}/.next/static ./_next/static

# We could serve this from the Assets CDN but it requires more updates https://nextjs.org/docs/pages/api-reference/next-config-js/assetPrefix
COPY --from=builder --chown=nodejs:nodejs /app/clients/${APP_PATH}/public /app/clients/${APP_PATH}/public

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV PORT=3000
ENV RELEASE_VERSION=${RELEASE_VERSION}
ENV ASSET_PREFIX=${ASSET_PREFIX}

# we cant use args or envs in CMD so we make a script for it
RUN echo "node clients/${APP_PATH}/server.js" > start.sh \ 
    && chmod u+x start.sh 

EXPOSE ${PORT}

ENV HOSTNAME=0.0.0.0

CMD ["sh", "-c", "./start.sh" ]
