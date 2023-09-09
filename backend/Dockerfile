FROM node:16.3.0-alpine

# Update the package repository indexes
# Install build dependencies for bcrypt
RUN apk update && apk --no-cache add make gcc g++ python3

RUN mkdir /app && chown node:node /app
WORKDIR /app

USER node
COPY --chown=node:node package.json package-lock.json* ./

# Install Node.js dependencies
# Rebuild the bcrypt module
RUN npm install && npm rebuild bcrypt --build-from-source

# Optionally, remove build dependencies after installation
# RUN apk del make gcc g++ python3

COPY --chown=node:node . .