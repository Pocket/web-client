FROM node:14

WORKDIR /usr/src/app

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV=production
ENV PORT 80

EXPOSE ${PORT}

CMD ["npm", "start"]
