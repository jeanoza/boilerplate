FROM node:16.3.0-alpine

# Update the package repository indexes
# Install build dependencies for bcrypt
RUN apk update && apk --no-cache add make gcc g++ python3

WORKDIR /app

COPY package*.json ./

# Install Node.js dependencies
# Rebuild the bcrypt module
RUN npm install && npm rebuild bcrypt --build-from-source

# Optionally, remove build dependencies after installation
RUN apk del make gcc g++ python3

COPY . .