FROM node:20.6.1-alpine

RUN apk update && apk add git
RUN corepack enable && corepack prepare pnpm@8.7.5 --activate
