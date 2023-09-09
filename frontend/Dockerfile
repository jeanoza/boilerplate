FROM node:16.3.0-alpine

RUN mkdir /app && chown node:node /app
WORKDIR /app

USER node
COPY --chown=node:node package.json package-lock.json* ./

RUN npm install

COPY --chown=node:node . .