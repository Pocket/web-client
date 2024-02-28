FROM node:20.10.0-bullseye-slim@sha256:f959c0047e2cc2dc01459067d9e898b7780862e52f4e7e80bb674f6040298f32

WORKDIR /usr/src/app

ARG RELEASE_VERSION

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV=production
ENV PORT 80
ENV RELEASE_VERSION=${RELEASE_VERSION}

EXPOSE ${PORT}

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

CMD ["npm", "start"]
